#!/usr/bin/env python3
"""Erzeugt die Projekt-Detailseiten aus factory/projekte.json.

  python3 factory/projekte.py        -> factory/pages/projekt-*.html (Seitenquellen)
                                        prototyp/assets/js/projektseiten.js (Kachel-Zuordnung)
  danach wie gewohnt: python3 factory/build.py

Vorlage ist die von Hand gebaute FLZ-Seite (projekt-flz-neuer-bau-ulm, "generate": false):
Titelbild · Hero mit Kennwerten · Galerie · Kapitel · Stimme · Pläne · Projektdaten ·
Kontakt · Verwandt. Alle Projektseiten teilen pages/projekt.css.

Galerie im Raster (Spalten 3–12, links die mitlaufende Seitenspalte):
  F  ein Querformat über 10 Spalten, natürliches Seitenverhältnis
  LL zwei Querformate je 5 Spalten (16:9 oder 3:2)
  LP/PL Querformat 7 Spalten, füllt die Höhe des Hochformats mit 3 Spalten
  PP zwei Hochformate je 5 Spalten (3:4), P ein Hochformat
Die Folge ergibt sich aus Hoch-/Querformat (nach jedem F höchstens zwei Paarzeilen);
"layout" in der JSON überschreibt sie. Pläne ("plan": true) werden nie beschnitten.
Galerien mit mehr als 9 Zeilen werden geteilt: 6 Zeilen vor dem Text, der Rest
("Weitere Bilder") nach der Stimme – sonst steht der Text erst nach Tausenden Pixeln Bild.
"""
import html, json, struct
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMG = ROOT.parent / 'prototyp' / 'assets' / 'img'
FLZ = 'projekt-flz-neuer-bau-ulm.html'  # Ziel für Projekte ohne eigene Seite

NOFOCUS = ' focusable="false"'
PERSON = ('<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="{w}" stroke-linecap="round" aria-hidden="true"{f}>'
          '<circle cx="24" cy="18" r="7.6"/><path d="M9.5 40.5c0-7.7 6.5-13.2 14.5-13.2s14.5 5.5 14.5 13.2"/></svg>')


def t(s):
    return html.escape(s, quote=False)


def a(s):
    return html.escape(s, quote=True)


def jpeg_size(path):
    with open(path, 'rb') as f:
        f.read(2)
        while True:
            m, typ, n = struct.unpack('>BBH', f.read(4))
            if typ in (0xC0, 0xC1, 0xC2):
                h, w = struct.unpack('>xHH', f.read(5))
                return w, h
            f.read(n - 2)


class Pic:
    def __init__(self, p, item, n):
        item = {'f': item} if isinstance(item, str) else item
        self.src = f"assets/img/{p['dir']}/{item['f']}"
        self.w, self.h = jpeg_size(IMG / p['dir'] / item['f'])
        self.r = self.w / self.h
        self.o = 'P' if self.r < 1.2 else 'L'  # fast quadratisch zählt als Hochformat (3:4)
        self.plan = item.get('plan', False)
        self.cap = item.get('cap')
        self.alt = f"{p['title']}, {item['alt']}" if item.get('alt') else f"{p['title']}, Bild {n}"

    def img(self, lazy=True):
        return (f'<img src="{a(self.src)}" width="{self.w}" height="{self.h}" alt="{a(self.alt)}"'
                + (' loading="lazy"' if lazy else '') + '>')


def figure(pic, cls, media=''):
    cap = f'<figcaption class="caption t-small t-mute">{t(pic.cap)}</figcaption>' if pic.cap else ''
    return f'      <figure class="{cls}"><div class="media{media}">{pic.img()}</div>{cap}</figure>'


def auto_rows(pics):
    rows, i, since = [], 0, None
    while i < len(pics):
        x, y = pics[i], pics[i + 1] if i + 1 < len(pics) else None
        if x.o == 'P':
            kind = 'PL' if y and y.o == 'L' else 'PP' if y else 'P'
        elif y and y.o == 'P':
            kind = 'LP'
        elif since is None or since >= 2 or not y:
            kind = 'F'
        else:
            kind = 'LL'
        rows.append(kind)
        i += 1 if kind in ('F', 'P') else 2
        since = 0 if kind == 'F' else (since or 0) + 1
    return rows


def gallery(pics, layout):
    """liefert die Figuren je Bildzeile"""
    rows, i = [], 0
    for kind in layout:
        out = []
        x = pics[i]
        y = pics[i + 1] if len(kind) == 2 else None
        port = lambda p: ' media--2x3' if p.r < .8 else ' media--3x4'
        if kind == 'F':
            out.append(figure(x, 's-10 o-3'))
        elif kind == 'LL':
            r = ' media--16x9' if min(x.r, y.r) >= 1.7 else ' media--3x2'
            out += [figure(x, 'sm-s-6 s-5 o-3', r), figure(y, 'sm-s-6 s-5', r)]
        elif kind == 'LP':
            out += [figure(x, 'sm-s-8 s-7 o-3', ' prj-fill'), figure(y, 'sm-s-4 s-3', port(y))]
        elif kind == 'PL':
            out += [figure(x, 'sm-s-4 s-3 o-3', port(x)), figure(y, 'sm-s-8 s-7', ' prj-fill')]
        elif kind == 'PP':
            out += [figure(x, 'sm-s-6 s-5 o-3', ' media--3x4'), figure(y, 'sm-s-6 s-5', ' media--3x4')]
        else:
            out.append(figure(x, 'sm-s-6 s-5 o-3', ' media--3x4'))
        rows.append(out)
        i += 1 if y is None else 2
    assert i == len(pics), f'Layout passt nicht zur Bildzahl ({i} von {len(pics)})'
    return rows


def plans(pics):
    out, rows = [], 0
    for i in range(0, len(pics), 2):
        x, y = pics[i], pics[i + 1] if i + 1 < len(pics) else None
        rows += 1
        if y is None:
            cls = 's-7 o-3' if len(pics) == 1 and x.o == 'L' else 'sm-s-6 s-5 o-3' if x.o == 'L' else 'sm-s-6 s-4 o-3'
            out.append(figure(x, cls))
        elif x.o == y.o:
            out += [figure(x, 'sm-s-6 s-5 o-3'), figure(y, 'sm-s-6 s-5')]
        elif x.o == 'P':
            out += [figure(x, 'sm-s-4 s-3 o-3'), figure(y, 'sm-s-8 s-7')]
        else:
            out += [figure(x, 'sm-s-8 s-7 o-3'), figure(y, 'sm-s-4 s-3')]
    return out, rows


def media_section(name, label, figs, rows, extra='', rule=True, plan=False):
    cls = 'grid prj-gal' + (' prj-gal--plans' if plan else '') + ' rv'
    return (f'  <!-- {name} -->\n  <section class="wrap band band--s{" rule-top" if rule else ""}">\n'
            f'    <div class="{cls}" style="--rows:{rows}">\n'
            f'      <h2 class="t-label prj-rail s-2">{label}</h2>\n' + '\n'.join(figs) + extra +
            '\n    </div>\n  </section>')


def blocks_html(blocks):
    prose, out = [], []

    def flush():
        if prose:
            out.append('        <div class="prose">\n' + '\n'.join(prose) + '\n        </div>')
            prose.clear()
    for b in blocks:
        if 'p' in b:
            prose.append(f'        <p>{t(b["p"])}</p>')
        elif 'ul' in b:
            prose.append('        <ul>\n' + '\n'.join(f'          <li>{t(li)}</li>' for li in b['ul']) + '\n        </ul>')
        elif 'links' in b:
            prose.append('        <p>' + '<br>'.join(f'<a href="{a(h)}">{t(s)}</a>' for s, h in b['links']) + '</p>')
        elif 'points' in b:
            flush()
            out.append('        <ul class="rows prj-points">\n' + '\n'.join(
                f'          <li><h3 class="t-h4">{t(h)}</h3><p>{t(s)}</p></li>' for h, s in b['points']) + '\n        </ul>')
    flush()
    return '\n'.join(out)


def chapter(label, ch, rule):
    stmt = f'        <h2 class="t-h2">{t(ch["h"])}</h2>\n' if ch.get('h') else ''
    tag = 'p' if ch.get('h') else 'h2'
    return (f'  <!-- KAPITEL {label.upper()} -->\n  <section class="wrap band{" rule-top" if rule else ""}">\n'
            f'    <div class="grid rv">\n      <{tag} class="t-label prj-rail s-2">{t(label)}</{tag}>\n'
            f'      <div class="stack s-8 o-3">\n{stmt}{blocks_html(ch["blocks"])}\n      </div>\n    </div>\n  </section>')


def stimme(org):
    src = (t(org) + '. ' if org and org != 'Privat' else '') + '<i>Kurze Einordnung des Zitats ergänzen.</i>'
    return ('  <!-- STIMME -->\n  <section class="band band--dark">\n    <div class="wrap grid rv">\n'
            '      <p class="t-label prj-rail s-2">Stimme</p>\n'
            f'      <div class="s-2 o-3"><div class="ph">{PERSON.format(w="1.2", f=NOFOCUS)}<span>Porträt folgt</span></div></div>\n'
            '      <figure class="s-7 o-6">\n'
            '        <blockquote class="quote"><i>„Platzhalter — ein bis zwei Sätze des Bauherrn oder der Projektleitung.“</i></blockquote>\n'
            f'        <figcaption class="quote__src"><span class="quote__who"><i>Name, Funktion ergänzen</i></span><span>{src}</span></figcaption>\n'
            '      </figure>\n    </div>\n  </section>')


def projektdaten(p, rule):
    foto = t(p['fotografie']) if p.get('fotografie') else '<i>Fotograf:in ergänzen</i>'
    pub = '<span class="prj-line"><i>Publikation, Medium, Jahr — ergänzen</i></span>'
    return (f'  <!-- PROJEKTDATEN -->\n  <section class="wrap band{" rule-top" if rule else ""}">\n    <div class="grid rv">\n'
            '      <h2 class="t-label prj-rail s-2">Projektdaten</h2>\n      <div class="s-5 o-3">\n'
            '        <h3 class="t-label prj-sub-h">Projekt</h3>\n        <dl class="facts">\n'
            '          <div><dt>Nutzung</dt><dd><i>Nutzung ergänzen</i></dd></div>\n'
            '          <div><dt>Erbrachte Leistungen</dt><dd><i>Objektplanung, Generalplanung — ergänzen</i></dd></div>\n'
            '          <div><dt>Zertifikate</dt><dd><i>Zertifizierung ergänzen</i></dd></div>\n'
            f'          <div><dt>Fotografie</dt><dd>{foto}</dd></div>\n'
            f'          <div><dt>Veröffentlichungen</dt><dd>{pub}{pub}</dd></div>\n'
            '        </dl>\n      </div>\n      <div class="prj-team s-4 o-9">\n'
            '        <h3 class="t-label prj-sub-h">Team</h3>\n        <ul class="rows rows--compact">\n'
            + '          <li><i>Name ergänzen</i></li>\n' * 3 +
            '        </ul>\n      </div>\n    </div>\n  </section>')


KONTAKT = '''  <!-- KONTAKT -->
  <section class="wrap band rule-top">
    <div class="grid">
      <p class="t-label prj-rail s-2">Kontakt</p>
      <div class="contact-card prj-contact s-10 o-3">
        <div class="ph">''' + PERSON.format(w='1.4', f='') + '''<span>Foto folgt</span></div>
        <div class="contact-card__body">
          <h2 class="t-h2">Fragen zum Projekt</h2>
          <p class="t-mute">Wir sprechen gern über die Herausforderungen und die Konzepte unserer Projekte. Kommen Sie gern auf uns zu, wir freuen uns auf den Austausch.</p>
          <div class="btn-row"><a class="btn" href="tel:+49731935110">07 31 . 9 35 11-0</a><a class="link-arrow" href="kontakt.html">Nachricht schreiben <span aria-hidden="true">→</span></a></div>
        </div>
      </div>
    </div>
  </section>'''


def tile(q):
    return (f'          <a class="tile" href="{q["slug"]}.html"><img src="assets/img/{q["dir"]}/{a(q["square"])}" alt="{a(q["title"])}" loading="lazy">'
            f'<div class="tile__cap"><span class="tile__title">{t(q["title"])}</span> <span class="tile__year">{q["year"]}</span></div></a>')


def verwandt(p, by):
    best = p.get('group') == 'bestand'
    head, more = ('Weitere Projekte im Bestand', 'Alle Projekte im Bestand') if best else ('Weitere Projekte', 'Alle Projekte')
    return ('  <!-- VERWANDT -->\n  <section class="wrap band rule-top">\n    <div class="grid rv">\n'
            '      <p class="t-label prj-rail s-2">Verwandt</p>\n      <div class="prj-rel s-10 o-3">\n'
            f'        <h2 class="t-h2 prj-rel__title">{head}</h2>\n        <div class="tiles">\n'
            + '\n'.join(tile(by[s]) for s in p['related']) +
            f'\n        </div>\n        <p class="prj-rel__more"><a class="btn" href="projekte.html">{more} <span aria-hidden="true">→</span></a></p>\n'
            '      </div>\n    </div>\n  </section>')


def page(p, by):
    facts = dict(p['facts'])
    org = facts.get('Bauherr') or facts.get('Auslober')
    pics = [Pic(p, it, n) for n, it in enumerate(p['images'], 2)]
    photos, drawings = [x for x in pics if not x.plan], [x for x in pics if x.plan]
    cover = Pic(p, {'f': p['cover']}, 1)
    desc = (p['sub'] if p.get('sub') else f"{p['title']}, {facts.get('Standort', '')}") + '. Ein Projekt von hochstrasser., Architekturbüro in Ulm.'
    meta = {'title': p['title'], 'description': desc, 'nav': 'projekte', 'css': ['pages/projekt.css']}
    sub = f'\n        <p class="t-lead hero__sub">{t(p["sub"])}</p>' if p.get('sub') else ''
    dl = '\n'.join(f'        <div><dt>{t(k)}</dt><dd>{t(v)}</dd></div>' for k, v in p['facts'])
    parts = [f'<!--meta {json.dumps(meta, ensure_ascii=False)} -->',
             '  <!-- HERO -->\n  <section class="wrap prj-cover">\n'
             f'    <figure class="media prj-cover__img rv">{cover.img(lazy=False)}</figure>\n  </section>\n\n'
             '  <section class="wrap hero">\n    <div class="grid">\n      <div class="s-7">\n'
             f'        <h1 class="t-h1">{t(p["title"])}</h1>{sub}\n      </div>\n'
             f'      <dl class="facts s-4 o-9">\n{dl}\n      </dl>\n    </div>\n  </section>']
    sections = []  # (html, dunkel?)
    rest = []
    if photos:
        rows = gallery(photos, p.get('layout') or auto_rows(photos))
        if len(rows) > 9:
            rows, rest = rows[:6], rows[6:]
        credit = f'\n      <p class="t-small t-mute s-10 o-3">{t(p["credit"])}</p>' if p.get('credit') else ''
        last = rest or rows
        parts_gal = [('gal', 'Galerie', rows)] + ([('gal', 'Weitere Bilder', rest)] if rest else [])
        gal = [(k, label, sum(r, []), len(r) + (1 if credit and r is last else 0), credit if r is last else '')
               for k, label, r in parts_gal]
        sections.append(gal[0])
    elif drawings:
        sections.append(('plans', *plans(drawings), ''))
        drawings = []
    chs = p['chapters']
    many = len(chs) > 1
    for i, ch in enumerate(chs, 1):
        sections.append(('ch', f'{i:02d} — {ch["label"]}' if many else ch['label'], ch))
        if i == 2 and len(chs) >= 3:
            sections.append(('stimme',))
    if not any(s[0] == 'stimme' for s in sections):
        sections.append(('stimme',))
    if rest:
        sections.append(gal[1])
    if drawings:
        sections.append(('plans', *plans(drawings), ''))
    sections += [('daten',), ('kontakt',), ('verwandt',)]

    prev = 'hero'
    for s in sections:
        rule = prev not in ('hero', 'stimme')
        if s[0] == 'gal':
            parts.append(media_section(s[1].upper(), s[1], s[2], s[3], s[4], rule=rule))
        elif s[0] == 'plans':
            parts.append(media_section('PLÄNE', 'Pläne', s[1], s[2], s[3], rule=rule, plan=True))
        elif s[0] == 'ch':
            parts.append(chapter(s[1], s[2], rule))
        elif s[0] == 'stimme':
            parts.append(stimme(org))
        elif s[0] == 'daten':
            parts.append(projektdaten(p, rule))
        elif s[0] == 'kontakt':
            parts.append(KONTAKT)
        else:
            parts.append(verwandt(p, by))
        prev = s[0]
    return '\n\n'.join(parts) + '\n'


def main():
    data = json.loads((ROOT / 'projekte.json').read_text(encoding='utf-8'))['projekte']
    by = {p['slug']: p for p in data}
    for p in data:
        if p.get('generate', True):
            (ROOT / 'pages' / f'{p["slug"]}.html').write_text(page(p, by), encoding='utf-8')
            print('erzeugt:', f'factory/pages/{p["slug"]}.html')
    pages = {}
    for p in data:
        for title in [p['title']] + p.get('titles', []):
            pages[title] = {'href': p['slug'] + '.html', 'img': f'assets/img/{p["dir"]}/{p["square"]}'}
    js = ('/* Projekte mit eigener Detailseite: Kacheltitel -> Seite und Kachelbild.\n'
          '   Erzeugt von factory/projekte.py aus factory/projekte.json – nicht von Hand bearbeiten.\n'
          f'   Alle übrigen Projektkacheln führen auf die Beispielseite {FLZ}. */\n'
          'window.PROJEKTSEITEN = ' + json.dumps(pages, ensure_ascii=False, indent=2) + ';\n')
    (ROOT.parent / 'prototyp' / 'assets' / 'js' / 'projektseiten.js').write_text(js, encoding='utf-8')
    print('erzeugt: prototyp/assets/js/projektseiten.js')


if __name__ == '__main__':
    main()
