#!/usr/bin/env python3
"""Erzeugt die Projekt-Detailseiten aus factory/projekte.json.

  python3 factory/projekte.py        -> factory/pages/projekt-*.html (Seitenquellen)
                                        prototyp/assets/js/projektseiten.js (Kachel-Zuordnung)
  danach wie gewohnt: python3 factory/build.py

Vorlage ist die von Hand gebaute FLZ-Seite (projekt-flz-neuer-bau-ulm, "generate": false):
Titelbild (ohne Beschnitt) · Einstieg mit Titel, Untertitel, erstem Kapitel und Kennwerten · Galerie ·
weitere Kapitel · Pläne und Projektdaten · Weitere Projekte (vier Kacheln). Alle Projektseiten teilen pages/projekt.css.
Keine Sektionsköpfe (nur die Rubrik „Weitere Projekte“ und Zwischenüberschriften der Live-Seite), kein Zitat, kein Kontakt.

Galerie im Raster über die volle Breite (12 Spalten):
  F  ein Querformat über 12 Spalten, natürliches Seitenverhältnis
  LL zwei Querformate je 6 Spalten (16:9 oder 3:2)
  LP/PL Querformat 8 Spalten, füllt die Höhe des Hochformats mit 4 Spalten
  PP zwei Hochformate je 6 Spalten (3:4), P ein Hochformat
Die Folge ergibt sich aus Hoch-/Querformat (nach jedem F höchstens zwei Paarzeilen);
"layout" in der JSON überschreibt sie. Pläne ("plan": true) werden nie beschnitten; bei ungerader Zahl
steht der letzte Plan neben den Projektdaten, die übrigen paarweise davor.
"""
import html, json, struct
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMG = ROOT.parent / 'prototyp' / 'assets' / 'img'
FLZ = 'projekt-flz-neuer-bau-ulm.html'  # Ziel für Projekte ohne eigene Seite


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
            out.append(figure(x, 's-12'))
        elif kind == 'LL':
            r = ' media--16x9' if min(x.r, y.r) >= 1.7 else ' media--3x2'
            out += [figure(x, 'sm-s-6 s-6', r), figure(y, 'sm-s-6 s-6', r)]
        elif kind == 'LP':
            out += [figure(x, 'sm-s-8 s-8', ' prj-fill'), figure(y, 'sm-s-4 s-4', port(y))]
        elif kind == 'PL':
            out += [figure(x, 'sm-s-4 s-4', port(x)), figure(y, 'sm-s-8 s-8', ' prj-fill')]
        elif kind == 'PP':
            out += [figure(x, 'sm-s-6 s-6', ' media--3x4'), figure(y, 'sm-s-6 s-6', ' media--3x4')]
        else:
            out.append(figure(x, 'sm-s-6 s-6', ' media--3x4'))
        rows.append(out)
        i += 1 if y is None else 2
    assert i == len(pics), f'Layout passt nicht zur Bildzahl ({i} von {len(pics)})'
    return rows


def plans(pics):
    out = []
    for i in range(0, len(pics), 2):
        x, y = pics[i], pics[i + 1] if i + 1 < len(pics) else None
        if y is None:
            out.append(figure(x, 'sm-s-6 s-6' if x.o == 'L' else 'sm-s-6 s-4'))
        elif x.o == y.o:
            out += [figure(x, 'sm-s-6 s-6'), figure(y, 'sm-s-6 s-6')]
        elif x.o == 'P':
            out += [figure(x, 'sm-s-4 s-4'), figure(y, 'sm-s-8 s-8')]
        else:
            out += [figure(x, 'sm-s-8 s-8'), figure(y, 'sm-s-4 s-4')]
    return out


def media_section(name, label, figs, extra='', plan=False):
    cls = 'grid prj-gal' + (' prj-gal--plans' if plan else '') + ' rv'
    return (f'  <!-- {name} -->\n  <section class="wrap band band--s{" prj-plans" if plan else ""}">\n    <h2 class="sr-only">{label}</h2>\n'
            f'    <div class="{cls}">\n' + '\n'.join(figs) + extra + '\n    </div>\n  </section>')


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
            out.append('        <ul class="prj-points">\n' + '\n'.join(
                f'          <li><h3>{t(h)}</h3><p>{t(s)}</p></li>' for h, s in b['points']) + '\n        </ul>')
    flush()
    return '\n'.join(out)


def chapter(ch, head='h2'):
    """Kapitel als Rubrik (Zwischenüberschrift der Live-Seite) und Text; „Projekt“ bleibt ohne Rubrik"""
    h = ch.get('h') or (ch['label'] if ch['label'] != 'Projekt' else '')
    rubric = f'        <{head} class="t-rubric">{t(h)}</{head}>\n' if h else ''
    return f'      <div class="stack s-7">\n{rubric}{blocks_html(ch["blocks"])}\n      </div>'


def projektdaten(p, plan):
    foto = t(p['fotografie']) if p.get('fotografie') else '<i>Fotograf:in ergänzen</i>'
    pub = '<span class="prj-line"><i>Publikation, Medium, Jahr — ergänzen</i></span>'
    team = '<span class="prj-line"><i>Name ergänzen</i></span>' * 3
    fig = ''
    if plan:
        img = plan.img().replace('<img ', '<img class="prj-plan" ', 1)
        fig = f'      <figure class="{"s-6" if plan.o == "L" else "sm-s-6 s-4"}">{img}</figure>\n'
    head = 'Plan und Projektdaten' if plan else 'Projektdaten'
    return ('  <!-- PROJEKTDATEN' + (' mit Plan (6 | 1 frei | 5)' if plan else '') + ' -->\n'
            f'  <section class="wrap band{" prj-data--plan" if plan else ""}">\n    <h2 class="sr-only">{head}</h2>\n    <div class="grid rv">\n{fig}'
            '      <dl class="prj-facts s-5 o-8">\n'
            '        <div><dt>Nutzung</dt><dd><i>Nutzung ergänzen</i></dd></div>\n'
            '        <div><dt>Erbrachte Leistungen</dt><dd><i>Objektplanung, Integralplanung — ergänzen</i></dd></div>\n'
            '        <div><dt>Zertifikate</dt><dd><i>Zertifizierung ergänzen</i></dd></div>\n'
            f'        <div><dt>Fotografie</dt><dd>{foto}</dd></div>\n'
            f'        <div><dt>Veröffentlichungen</dt><dd>{pub}{pub}</dd></div>\n'
            f'        <div><dt>Team</dt><dd>{team}</dd></div>\n'
            '      </dl>\n    </div>\n  </section>')


def tile(q):
    return (f'        <a class="tile" href="{q["slug"]}.html"><img src="assets/img/{q["dir"]}/{a(q["square"])}" alt="{a(q["title"])}" loading="lazy">'
            f'<div class="tile__cap"><span class="tile__title">{t(q["title"])}</span> <span class="tile__year">{q["year"]}</span></div></a>')


def verwandt(p, by):
    return ('  <!-- VERWANDT -->\n  <section class="wrap band band--flush-top">\n    <div class="rv">\n'
            '      <div class="sec-head"><h2 class="t-rubric sec-head__title">Weitere Projekte</h2></div>\n'
            '      <div class="tiles prj-tiles">\n'
            + '\n'.join(tile(by[s]) for s in p['related']) +
            '\n      </div>\n      <p class="prj-rel__more"><a class="link-arrow" href="projekte.html">Alle Projekte <span aria-hidden="true">→</span></a></p>\n'
            '    </div>\n  </section>')


def page(p, by):
    facts = dict(p['facts'])
    pics = [Pic(p, it, n) for n, it in enumerate(p['images'], 2)]
    photos, drawings = [x for x in pics if not x.plan], [x for x in pics if x.plan]
    cover = Pic(p, {'f': p['cover']}, 1)
    desc = (p['sub'] if p.get('sub') else f"{p['title']}, {facts.get('Standort', '')}") + '. Ein Projekt von hochstrasser., Architekturbüro in Ulm.'
    meta = {'title': p['title'], 'description': desc, 'nav': 'projekte', 'css': ['pages/projekt.css']}
    sub = f'\n        <p class="prj-sub">{t(p["sub"])}</p>' if p.get('sub') else ''
    dl = '\n'.join(f'        <div><dt>{t(k)}</dt><dd>{t(v)}</dd></div>' for k, v in p['facts'])
    chs = p['chapters']
    # Einstieg: erstes Kapitel neben den Kennwerten; ohne Text stehen die Kennwerte neben dem Titel
    first = chapter(chs[0]) + '\n' if chs else ''
    parts = [f'<!--meta {json.dumps(meta, ensure_ascii=False)} -->',
             '  <!-- TITELBILD im vollen Format ohne Beschnitt -->\n  <section class="wrap prj-cover">\n'
             f'    <figure class="rv">{cover.img(lazy=False)}</figure>\n  </section>',
             '  <!-- EINSTIEG: Titel, Text und Kennwerte -->\n  <section class="wrap prj-intro">\n    <div class="grid">\n'
             f'      <div class="{"s-8" if chs else "s-7"}">\n        <h1 class="t-h1">{t(p["title"])}</h1>{sub}\n      </div>\n'
             f'{first}      <dl class="prj-facts s-4 o-9">\n{dl}\n      </dl>\n    </div>\n  </section>']
    if photos:
        figs = sum(gallery(photos, p.get('layout') or auto_rows(photos)), [])
        credit = f'\n      <p class="t-small t-mute s-12">{t(p["credit"])}</p>' if p.get('credit') else ''
        parts.append(media_section('GALERIE', 'Galerie', figs, credit))
    if len(chs) > 1:
        parts.append('  <!-- WEITERE KAPITEL -->\n  <section class="wrap">\n    <div class="grid prj-chapters rv">\n'
                     + '\n'.join(chapter(ch) for ch in chs[1:]) + '\n    </div>\n  </section>')
    # ungerade Zahl von Plänen: der letzte steht neben den Projektdaten, die übrigen paarweise davor
    plan = drawings.pop() if len(drawings) % 2 else None
    if drawings:
        parts.append(media_section('PLÄNE', 'Pläne', plans(drawings), plan=True))
    parts += [projektdaten(p, plan), verwandt(p, by)]
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
