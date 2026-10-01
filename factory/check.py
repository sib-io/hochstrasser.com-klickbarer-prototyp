#!/usr/bin/env python3
"""Prüfungen für eine gebaute Seite.

  python3 factory/check.py text <ausgangsdatei> <slug>
      Vergleicht den Text von <main> wortweise mit dem Ausgangstext.
      Groß-/Kleinschreibung, Anführungszeichen, Striche und Leerraum
      werden ignoriert – alles andere muss 1:1 übereinstimmen.
  python3 factory/check.py lint [slug …]
      Prüft Seiten-CSS auf Verstöße gegen das Design-System.
  python3 factory/check.py links
      Prüft alle internen Links und Bildpfade im Prototyp.
"""
import difflib, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PROTO = ROOT.parent / 'prototyp'
SRC = ROOT.parent / 'ausgangstexte'


def words(path):
    t = subprocess.run(['node', str(ROOT / 'extract.js'), str(path)], capture_output=True, text=True, check=True).stdout
    t = t.lower()
    t = re.sub(r'[„“”"‚‘’\'«»]', ' ', t)
    t = re.sub(r'[–—‑-]', ' ', t)
    return re.findall(r'[0-9a-zäöüßéèáàíóúñç§€%+&/@.]+|[^\s\w]', t)


def text(src, slug):
    a = [w for w in words(SRC / src if not Path(src).exists() else Path(src)) if w not in '.,;:!?·()→←↗×…']
    b = [w for w in words(PROTO / f'{slug}.html') if w not in '.,;:!?·()→←↗×…']
    a = [w.strip('.') for w in a if w.strip('.')]
    b = [w.strip('.') for w in b if w.strip('.')]
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    issues = [op for op in sm.get_opcodes() if op[0] != 'equal']
    print(f'Wörter Ausgang {len(a)} · Prototyp {len(b)} · Übereinstimmung {sm.ratio():.3f} · Abweichungen {len(issues)}')
    # Spans ohne Leerraum im Ausgangstext erzeugen Schein-Abweichungen ("2023hugo").
    # Deshalb zusätzlich die reine Buchstaben-/Ziffernfolge vergleichen.
    ca = re.sub(r'[^0-9a-zäöüß]', '', ''.join(a))
    cb = re.sub(r'[^0-9a-zäöüß]', '', ''.join(b))
    if issues:
        print('Buchstabenfolge identisch:', 'JA – nur Leerraum-Artefakte' if ca == cb else 'NEIN – echte Abweichungen vorhanden')
        if ca == cb:
            return
    for tag, i1, i2, j1, j2 in issues[:80]:
        ctx = ' '.join(a[max(0, i1 - 4):i1])
        print(f'  {tag:7} …{ctx} | AUSGANG: {" ".join(a[i1:i2])[:160]!r} → PROTOTYP: {" ".join(b[j1:j2])[:160]!r}')
    if len(issues) > 80:
        print(f'  … {len(issues) - 80} weitere')


RULES = [
    (r'font-family\s*:\s*(?!var\(--font-(ui|text)\)|inherit)', 'font-family nur über var(--font-ui) / var(--font-text)'),
    (r'#[0-9a-fA-F]{3,8}\b(?![^{]*\{)', 'keine Hex-Farben – Tokens nutzen (--ink, --mute, --rule, --shade …)'),
    (r'\brgba?\((?!\s*(22,\s*22,\s*22|255,\s*255,\s*255))', 'rgba nur auf Basis von ink (22,22,22) oder weiß'),
    (r'max-width\s*:\s*(1[2-9]\d\d|[2-9]\d\d\d)px', 'keine eigenen Containerbreiten – .wrap nutzen'),
    (r'(Calibri|Inter|Helvetica|Arial)', 'keine Fremdschriften'),
    (r'font-weight\s*:\s*(500|600|800|900)', 'PX Grotesk hat nur 300/400/700'),
]


def lint(slugs):
    files = sorted((PROTO / 'assets/css/pages').glob('*.css'))
    if slugs:
        files = [f for f in files if f.stem in slugs]
    bad = 0
    for f in files:
        css = re.sub(r'/\*.*?\*/', '', f.read_text(encoding='utf-8'), flags=re.S)
        for n, line in enumerate(css.splitlines(), 1):
            for rx, msg in RULES:
                if re.search(rx, line):
                    if 'digitales' in f.stem and 'accent' in line:
                        continue
                    bad += 1
                    print(f'{f.name}:{n}: {msg}\n    {line.strip()[:140]}')
        lit = re.findall(r'(?:margin|padding|gap)[a-z-]*\s*:\s*[^;]*?\b\d*\.?\d+(?:px|rem|em)\b', css)
        if lit:
            print(f'{f.name}: Hinweis – {len(lit)} Abstände mit festen Werten statt --sp-*/--band-Tokens')
    print('Lint:', 'ok' if not bad else f'{bad} Verstöße')


def links():
    bad = 0
    for f in sorted(PROTO.glob('*.html')):
        h = f.read_text(encoding='utf-8')
        for ref in re.findall(r'(?:href|src)="([^"#?]+)(?:#([^"]*))?"', h):
            if ':' in ref[0]:
                continue
            target = PROTO / ref[0]
            if not target.exists():
                bad += 1
                print(f'{f.name}: fehlt → {ref[0]}')
            elif ref[1] and target.suffix == '.html' and f'id="{ref[1]}"' not in target.read_text(encoding='utf-8'):
                bad += 1
                print(f'{f.name}: Anker fehlt → {ref[0]}#{ref[1]}')
        for u in re.findall(r'(?:src|href)="(https?://hochstrasser\.com/[^"]+)"', h):
            bad += 1
            print(f'{f.name}: Hotlink → {u}')
    print('Links:', 'ok' if not bad else f'{bad} Probleme')


if __name__ == '__main__':
    cmd, *rest = sys.argv[1:] or ['help']
    if cmd == 'text':
        text(*rest)
    elif cmd == 'lint':
        lint(rest)
    elif cmd == 'links':
        links()
    else:
        print(__doc__)
