#!/usr/bin/env python3
"""Baut den Prototyp: factory/pages/<slug>.html -> prototyp/<slug>.html

Jede Seitenquelle beginnt mit einem Meta-Kommentar und enthält danach
nur den Inhalt von <main>:

  <!--meta {"title": "Brandschutz", "description": "…", "nav": "expertise",
             "css": ["pages/expertise.css"], "js": ["pages/brandschutz.js"],
             "body": "data-accent=\\"blau\\"", "proto": "Prototyp Expertiseseite · Brandschutz"} -->
  <section …>…</section>

Header, Menü, Footer, Kopf und Skripte kommen ausschließlich aus
factory/partials – dadurch ist die Navigation auf allen Seiten identisch.
Aufruf: python3 factory/build.py [slug …]
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / 'prototyp'
NAV = [  # Reihenfolge wie auf der Startseite
    ('projekte', 'projekte.html', 'Projekte'),
    ('auszeichnungen', 'auszeichnungen.html', 'Auszeichnungen'),
    ('expertise', 'expertise.html', 'Expertise'),
    ('profil', 'profil.html', 'Profil'),
    ('buero', 'buero.html', 'Büro'),
]
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link href="https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap" rel="stylesheet">')


def esc(s):
    return s.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;')


def nav(current, indent):
    return '\n'.join(
        f'{indent}<a href="{href}"' + (' aria-current="page"' if key == current else '') + f'>{label}</a>'
        for key, href, label in NAV)


def build(src):
    raw = src.read_text(encoding='utf-8')
    m = re.match(r'\s*<!--meta\s+(\{.*?\})\s*-->\s*', raw, re.S)
    if not m:
        sys.exit(f'{src.name}: Meta-Kommentar fehlt')
    meta = json.loads(m.group(1))
    body = raw[m.end():].rstrip()
    slug = src.stem
    title = meta['title'] if slug == 'index' else f"{meta['title']} — hochstrasser."
    cur = meta.get('nav')
    header = (ROOT / 'partials/header.html').read_text(encoding='utf-8')
    header = header.replace('{{NAV}}', nav(cur, '      '), 1).replace('{{NAV}}', nav(cur, '  '), 1)
    footer = (ROOT / 'partials/footer.html').read_text(encoding='utf-8')
    css = ''.join(f'\n<link rel="stylesheet" href="assets/css/{c}">' for c in meta.get('css', []))
    js = ''.join(f'\n<script src="assets/js/{j}"></script>' for j in meta.get('js', []))
    proto = ''
    if meta.get('proto'):
        proto = ('<div class="proto">\n  <div class="wrap proto__in">\n'
                 f'    <span class="t-label">{meta["proto"]}</span>\n'
                 '    <button id="notesToggle" aria-pressed="false">Offene Punkte einblenden</button>\n'
                 '  </div>\n</div>\n')
    body_attr = (' ' + meta['body']) if meta.get('body') else ''
    html = f'''<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(meta.get('description', ''))}">
{FONTS}
<link rel="stylesheet" href="assets/css/site.css">{css}
</head>
<body{body_attr}>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
{proto}{header}
<main id="inhalt">
{body}
</main>

{footer}
<script src="assets/js/site.js"></script>{js}
</body>
</html>
'''
    (OUT / f'{slug}.html').write_text(html, encoding='utf-8')
    print('gebaut:', f'prototyp/{slug}.html')


if __name__ == '__main__':
    names = sys.argv[1:]
    files = [ROOT / 'pages' / f'{n}.html' for n in names] if names else sorted((ROOT / 'pages').glob('*.html'))
    for f in files:
        build(f)
