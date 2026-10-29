#!/usr/bin/env python3
"""Baut den Prototyp: factory/pages/<slug>.html -> prototyp/<slug>.html

Jede Seitenquelle beginnt mit einem Meta-Kommentar und enthält danach
nur den Inhalt von <main>:

  <!--meta {"title": "Brandschutz", "description": "…", "nav": "expertise",
             "css": ["pages/expertise.css"], "js": ["pages/brandschutz.js"],
             "body": "data-accent=\\"blau\\"", "proto": "Prototyp Expertiseseite · Brandschutz"} -->
  <section …>…</section>

Optional für Suchmaschinen und KI-Suche:
  "url": "faq/"          Pfad der Live-Seite unter SITE → Canonical, Open Graph, sitemap.xml
  "modified": "JJJJ-MM-TT"  letzte inhaltliche Änderung → dateModified, <lastmod>
  "schema": "faq"        FAQPage als JSON-LD, erzeugt aus den <details id> der Seite
                         (Frage = <summary>, Antwort = .faq__answer) – nie von Hand pflegen
  Ergänzungen zum Schema (nur mit "schema"):
  "breadcrumb": [["Expertise", "expertise/"]]  Zwischenstufen der BreadcrumbList
  "reviewed": "JJJJ-MM-TT"  fachlich geprüft → lastReviewed, reviewedBy
  "service": {"name": …, "alternateName": […], "serviceType": …, "areaServed": […]}
                         Leistung als Service; Katalog aus den .x-lph-Zeilen der Seite
  Steht ein .sources-Block auf der Seite, werden seine Einträge zu citation.

Header, Menü, Footer, Kopf und Skripte kommen ausschließlich aus
factory/partials – dadurch ist die Navigation auf allen Seiten identisch.
Aufruf: python3 factory/build.py [slug …]
"""
import html as htmllib, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / 'prototyp'
SITE = 'https://hochstrasser.com/'  # Live-Domain: Canonical, JSON-LD, sitemap.xml
ORG = {
    '@type': 'Organization', '@id': SITE + '#organization',
    'name': 'hochstrasser. Gesellschaft für Architektur mbH', 'alternateName': 'hochstrasser.',
    'url': SITE, 'telephone': '+49 731 935110', 'email': 'info@hochstrasser.com',
    'address': {'@type': 'PostalAddress', 'streetAddress': 'Karpfengasse 5',
                'postalCode': '89073', 'addressLocality': 'Ulm', 'addressCountry': 'DE'},
    'sameAs': ['https://www.instagram.com/hochstrasser.architekten'],
}
NAV = [  # Reihenfolge der Hauptnavigation
    ('expertise', 'expertise.html', 'Expertise'),
    ('projekte', 'projekte.html', 'Projekte'),
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


def read(src):
    raw = src.read_text(encoding='utf-8')
    m = re.match(r'\s*<!--meta\s+(\{.*?\})\s*-->\s*', raw, re.S)
    if not m:
        sys.exit(f'{src.name}: Meta-Kommentar fehlt')
    return json.loads(m.group(1)), raw[m.end():].rstrip()


def plain(fragment):
    return re.sub(r'\s+', ' ', htmllib.unescape(re.sub(r'<[^>]+>', '', fragment))).strip()


def citations(body):
    """Einträge des .sources-Blocks als CreativeWork – verlinkte einzeln, unverlinkte mit Namen."""
    m = re.search(r'<div class="sources">(.*?)</ul>', body, re.S)
    out = []
    for li in re.findall(r'<li>(.*?)</li>', m.group(1), re.S) if m else []:
        links = re.findall(r'<a [^>]*href="([^"]+)"[^>]*>(.*?)</a>', li, re.S)
        out += ([{'@type': 'CreativeWork', 'name': plain(t), 'url': htmllib.unescape(h)} for h, t in links]
                or [{'@type': 'CreativeWork', 'name': plain(li)}])
    return out


def service(meta, body, url):
    """Leistung der Fachseite; der Katalog kommt aus den sichtbaren .x-lph-Zeilen (Name + Beschreibung)."""
    s = meta['service']
    node = {'@type': 'Service', '@id': url + '#leistung', 'name': s['name'], 'url': url,
            'description': meta.get('description', ''), 'provider': {'@id': ORG['@id']}}
    for k in ('alternateName', 'serviceType'):
        if s.get(k):
            node[k] = s[k]
    if s.get('areaServed'):
        node['areaServed'] = [{'@type': 'Country' if a == 'Deutschland' else 'AdministrativeArea', 'name': a}
                              for a in s['areaServed']]
    rows = re.findall(r'<span class="t-h4 x-lph__name">(.*?)</span>\s*'
                      r'<span class="x-lph__what t-mute">(.*?)</span>', body, re.S)
    if rows:
        node['hasOfferCatalog'] = {'@type': 'OfferCatalog', 'name': f"{s['name']}: Leistungen", 'itemListElement': [
            {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': plain(n), 'description': plain(d)}}
            for n, d in rows]}
    return node


def faq_schema(src, meta, body, title):
    """FAQPage aus den sichtbaren Fragen – Schema und Seite bleiben deckungsgleich."""
    url = SITE + meta['url']
    pairs = re.findall(r'<details id="([^"]+)"><summary>(.*?)</summary>'
                       r'<div class="faq__answer[^"]*">(.*?)</div></details>', body, re.S)
    if not pairs or len(pairs) != body.count('<details'):
        sys.exit(f'{src.name}: FAQ-Schema – jede Frage als <details id="…"><summary>…</summary>'
                 '<div class="faq__answer">…</div></details> in einer Zeile')
    page = {
        '@type': 'FAQPage', '@id': url + '#webpage', 'url': url, 'name': title,
        'description': meta.get('description', ''), 'inLanguage': 'de-DE',
        'isPartOf': {'@id': SITE + '#website'}, 'about': {'@id': ORG['@id']},
        'publisher': {'@id': ORG['@id']}, 'breadcrumb': {'@id': url + '#breadcrumb'},
        'mainEntity': [{'@type': 'Question', '@id': f'{url}#{i}', 'url': f'{url}#{i}', 'name': plain(q),
                        'acceptedAnswer': {'@type': 'Answer', 'text': plain(a)}} for i, q, a in pairs],
    }
    if meta.get('modified'):
        page['dateModified'] = meta['modified']
    if meta.get('reviewed'):
        page['lastReviewed'] = meta['reviewed']
        page['reviewedBy'] = {'@id': ORG['@id']}
    cites = citations(body)
    if cites:
        page['citation'] = cites
    crumbs = [('Startseite', SITE)] + [(n, SITE + u) for n, u in meta.get('breadcrumb', [])] + [(meta['title'], url)]
    graph = [ORG,
             {'@type': 'WebSite', '@id': SITE + '#website', 'url': SITE, 'name': 'hochstrasser.',
              'inLanguage': 'de-DE', 'publisher': {'@id': ORG['@id']}},
             page,
             {'@type': 'BreadcrumbList', '@id': url + '#breadcrumb', 'itemListElement': [
                 {'@type': 'ListItem', 'position': i, 'name': n, 'item': u} for i, (n, u) in enumerate(crumbs, 1)]}]
    if meta.get('service'):
        graph.append(service(meta, body, url))
        page['about'] = {'@id': url + '#leistung'}
    ld = json.dumps({'@context': 'https://schema.org', '@graph': graph}, ensure_ascii=False, indent=1)
    return '\n<script type="application/ld+json">\n' + ld.replace('</', '<\\/') + '\n</script>'


def build(src):
    meta, body = read(src)
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
    seo = ''
    if meta.get('url'):
        url = SITE + meta['url']
        seo = (f'\n<link rel="canonical" href="{url}">'
               f'\n<meta property="og:type" content="website">'
               f'\n<meta property="og:locale" content="de_DE">'
               f'\n<meta property="og:site_name" content="hochstrasser.">'
               f'\n<meta property="og:title" content="{esc(title)}">'
               f'\n<meta property="og:description" content="{esc(meta.get("description", ""))}">'
               f'\n<meta property="og:url" content="{url}">')
    if meta.get('schema') == 'faq':
        seo += faq_schema(src, meta, body, title)
    html = f'''<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(meta.get('description', ''))}">{seo}
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


def sitemap():
    """prototyp/sitemap.xml – alle Seiten mit "url" in der Meta (Varianten und _system haben keine)."""
    rows = []
    for f in sorted((ROOT / 'pages').glob('*.html')):
        meta, _ = read(f)
        if 'url' not in meta:
            continue
        lastmod = f'<lastmod>{meta["modified"]}</lastmod>' if meta.get('modified') else ''
        rows.append(f'  <url><loc>{SITE}{meta["url"]}</loc>{lastmod}</url>')
    (OUT / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + '\n'.join(rows) + '\n</urlset>\n',
        encoding='utf-8')
    print('gebaut: prototyp/sitemap.xml', f'({len(rows)} Seiten)')


if __name__ == '__main__':
    names = sys.argv[1:]
    files = [ROOT / 'pages' / f'{n}.html' for n in names] if names else sorted((ROOT / 'pages').glob('*.html'))
    for f in files:
        build(f)
    sitemap()
