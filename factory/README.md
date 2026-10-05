# Factory – klickbarer Prototyp hochstrasser.

Quellen: `ausgangstexte/*.html` (Inhalt + bisherige Gestaltung).
Ziel: `prototyp/*.html` – statisch, per `file://` lauffähig, wird **gebaut**, nie direkt bearbeitet.

```
factory/
  pages/<slug>.html      ← Seitenquelle: Meta-Kommentar + Inhalt von <main>   (Builder schreiben hier)
  partials/              ← Header, Menü, Footer (nur Orchestrator)
  build.py               ← python3 factory/build.py <slug>
  check.py               ← text | lint | links
  projekte.json          ← Daten der Projekt-Detailseiten (Live-Texte 1:1, Kennwerte, Bilder)
  projekte.py            ← python3 factory/projekte.py → pages/projekt-*.html + assets/js/projektseiten.js
  shot.js                ← node factory/shot.js <slug> [--grid] [--w=1440,390]
prototyp/
  assets/css/site.css    ← Design-System (nur Orchestrator ändert es)
  assets/css/pages/*.css ← seitenspezifisches CSS (Builder)
  assets/js/site.js      ← Menü, .rv-Einblenden, Hinweis-Schalter (nur Orchestrator)
  assets/js/pages/*.js   ← seitenspezifisches JS (Builder)
  assets/img/…           ← alle Bilder lokal (keine Hotlinks, kein base64)
  assets/fonts/          ← PX Grotesk woff2
```

## Seitenquelle

```html
<!--meta {"title": "Brandschutz", "description": "…", "nav": "expertise",
           "css": ["pages/expertise.css"], "js": ["pages/expertise-brandschutz.js"],
           "proto": "Prototyp Expertiseseite · Brandschutz"} -->
<section class="wrap hero">…</section>
…
```
- `nav`: `projekte` | `auszeichnungen` | `expertise` | `profil` | `buero` | `null` → setzt den aktiven Menüpunkt.
- `proto`: nur setzen, wenn der Ausgangstext eine Prototyp-Leiste mit „offene Punkte einblenden“ hat. Die `.note`-Hinweise bleiben 1:1 erhalten (Markup `<div class="note"><b>Titel</b> Text</div>`), der Schalter kommt aus dem Build. Die Leiste ist im Prototyp verborgen und erscheint mit Alt+Shift+P (gilt für die Sitzung im Tab, `site.js`).
- `body`: zusätzliche Attribute für `<body>` (nur Digitales Bauen: Akzentfarbe).
- **Kein** `<header>`, `<footer>`, Menü, `<html>`/`<head>` in der Seitenquelle. Keine Inline-`<style>`. Seitenskript entweder als Datei (`js`) oder als `<script>` am Ende der Seitenquelle.
- `site.js` läuft nach dem Seiteninhalt und blendet alle `.rv` ein, die beim Laden im DOM sind. Per JS erzeugte Elemente bekommen **kein** `.rv` (oder das Skript steht inline in der Seitenquelle, dann läuft es vorher).

## Dateinamen und Links (flach, relativ)

| Seite | Ausgangstext | Slug |
|---|---|---|
| Startseite | 00 | `index` |
| Projekte | 01 | `projekte` |
| Expertise | 02 | `expertise` |
| Auszeichnungen | 03 | `auszeichnungen` |
| Profil | 04 | `profil` |
| Büro | 05a | `buero` |
| Projekt FLZ | 06 + Live-Seite | `projekt-flz-neuer-bau-ulm` |
| Zehn neueste Projekte | Live-Seiten hochstrasser.com | `projekt-<name>` (erzeugt, siehe unten) |
| Brandschutz | 07 | `expertise-brandschutz` |
| Nachhaltigkeit | 08 | `expertise-nachhaltigkeit` |
| Bauphysik | 09 | `expertise-bauphysik` |
| Generalplanung | 10 | `expertise-generalplanung` |
| DGNB / Zertifizierung | 11 | `expertise-dgnb-zertifizierung` |
| Digitales Bauen | 13b | `expertise-digitales-bauen` |
| Architektur | 14 | `expertise-architektur` |
| Kontakt | 24 | `kontakt` |
| Jobs | 25 | `jobs` |

- Links auf diese Seiten immer als `slug.html` (ggf. mit Anker). Profil-Anker: `profil.html#n-integral`, `#n-wirtschaft`, `#n-nachhaltigkeit`, `#n-bestand`, `#n-verantwortung`.
- „Zurück zu unseren Expertisen“ → `expertise.html`. Projektkacheln/-links → eigene Detailseite, falls vorhanden (Zuordnung Titel → Seite/Kachelbild in `assets/js/projektseiten.js`, erzeugt aus `projekte.json`), sonst → `projekt-flz-neuer-bau-ulm.html` (Beispielseite). „Alle Projekte“ → `projekte.html`. Kontakt/„Nachricht schreiben“ intern → `kontakt.html` (bzw. `mailto:` wo im Ausgangstext).
- Ziele ohne Seite (Barrierefreiheit, FAQs, Impressum, Datenschutz, BDA-Berufung, Leistungsphasen, Integralplanung, Bauen im Bestand, Film, Einzel-Auszeichnungen …) → `href="#"`.
- Externe Links bleiben, wie sie sind (`target="_blank" rel="noopener"`).

## Bilder
- Alle Bilder lokal unter `assets/img/`. Mapping für Hotlinks `https://hochstrasser.com/wp-content/uploads/JJJJ/MM/<datei>` → `assets/img/wp/<datei>`; Ausnahme `02_header-23.jpg` → `assets/img/flz/02_header-23.jpg`.
- Bisherige base64-Bilder: `leistungen-zeichnung.png` (Startseite, Leistungsband), `buero-haus-k5.jpg`.
- Team-Porträts (Büro): `assets/img/team/<vorname-nachname>.jpg`, 600 × 600, von der Live-Büroseite (dort nach Namen zugeordnet). Ohne Porträt: Dagmar Schmidt, Michael Doll, Leyla Ali, Volker Knopp (live nur Platzhalter), Johanna Pittermann (live nicht vorhanden).
- FLZ-Projektbilder: `assets/img/flz/02_header-23.jpg … 14_landscape-1.jpg` (05 ist Hochformat), Kachelbild `01_3_square_500x500_acf_cropped.jpg`.
- Weitere Projektbilder: `assets/img/<name>/` (Original-Dateinamen der Live-Seite, längste Kante ≤ 2000 px, Kachelbild `*_500x500_acf_cropped.jpg`).
- Immer `alt` (aus dem Ausgangstext, korrekt geschrieben), `loading="lazy"` außer beim ersten Bild.

## Text: 1:1, aber korrektes Deutsch
- Wortlaut **exakt** übernehmen. Nichts umformulieren, kürzen, ergänzen, umsortieren. Auch Platzhalter wie „porträt folgt“ oder „ansprechperson ergänzen“ bleiben.
- Nur die Schreibweise korrigieren: deutsche Groß-/Kleinschreibung (Satzanfänge, Substantive, Eigennamen, Abkürzungen wie BIM, DGNB, HOAI, LPH, GEG, FLZ, SWU, BDA, KfW, QNG). Überschriften, Menüpunkte, Buttons, Labels: wie normale deutsche Sätze/Begriffe schreiben (kein Versal-Satz, keine durchgehende Kleinschreibung).
- **Ausnahme Marke:** die Wortmarke `hochstrasser.` bleibt klein mit Punkt – auch im Fließtext.
- Offensichtliche Tippfehler nicht stillschweigend ändern – im Abschlussbericht melden.
- Prüfen mit `python3 factory/check.py text <ausgangsdatei> <slug>` → Ziel: 0 Abweichungen (Ausnahmen begründen: z. B. bewusst entfernte Prototyp-Leistentexte, ersetzter Header/Footer zählt nicht, weil nur `<main>` verglichen wird).

## Gestaltung – verbindlich
**Raster.** Jede Sektion: `.wrap` (1280 px Inhalt am Desktop) + `.grid` (12 Spalten, Gutter 30 px). Spaltenklassen `.s-N` (Spannweite) und `.o-N` (Startspalte) greifen ab 900 px; darunter stapelt alles, ab 600 px gibt es `.sm-s-N`. Eigene Layouts im Seiten-CSS **nur** über `grid-template-columns:repeat(12,minmax(0,1fr))` + `column-gap:var(--gutter)` und `grid-column`. Keine freien Breiten in px/%/ch für Layoutspalten, keine negativen Margins zum „Ausbrechen“, keine eigenen max-width-Container.
Bevorzugte Aufteilungen: **6 | 1 frei | 5** (`s-6` + `s-5 o-8`), **4 | 1 frei | 7** (`s-4` + `s-7 o-6`), ab 1200 px mit Seitenspalte 10–12: **8 | 1 frei | 3** und **6 | 2 | 1 frei | 3** (Startseite: Aktuelles, Leistungen), große Aussage `s-8`, Fließtext `s-6`/`s-7`, Karten `s-4`×3 bzw. `s-3`×4. Vollflächige Bilder/Bänder: Band ist vollflächig, Inhalt bleibt in `.wrap`.

**Weißraum.** Sektionen `.band` (80→144 px) bzw. `.band--s`; Sektionskopf → Inhalt `.sec-head` (40→64 px). Abstände nur über Tokens `--sp-1…--sp-8` (8/16/24/32/48/64/96/128), `--band`, `--band-s`, `--head-gap`, `--stack`, `--gutter`. Lieber mehr Luft als weniger; nie enger als im Ausgangstext.

**Schrift.** Alles, was Überschrift, Menüpunkt, Button, Rubrik, Label, Kennwert-Bezeichnung, Zahl/Ziffer-Marke, Diagrammbeschriftung ist → PX Grotesk über die Rollen. **Ausnahme Hero:** die Überschrift im Hero (`.hero .t-display`/`.hero .t-h1`) steht in Calibri Light (`--font-hero`, lokal installiert, Fallback Calibri → Carlito) – wie die Startseite der Ausgangsdateien; das setzt `site.css` automatisch. Fließtext → Carlito (Body-Default). Nie `font-family` direkt außer `var(--font-ui)`/`var(--font-text)`/`var(--font-hero)`. PX Grotesk hat nur 300/400/700.

| Rolle | Klasse | Einsatz |
|---|---|---|
| Display | `.t-display` | Startseiten-Claim |
| H1 | `.t-h1` | Seitenclaim im Hero, große Zitate |
| H2 | `.t-h2` | Sektionsaussagen, Statements |
| H3 | `.t-h3` | Unterüberschriften, Kartenköpfe |
| H4 | `.t-h4` | kleine Köpfe, Listentitel |
| Rubrik | `.t-rubric` | kurzer Sektionstitel („Projekte“, „Was wir übernehmen“) |
| Label | `.t-label` | Kategorie, Jahr, dt, Eyebrow, Nummern |
| Lead | `.t-lead` | Einleitungsabsatz (im Hero automatisch Fließtextgröße und `--mute`) |
| Prose | `.prose` | Fließtextblock |

Semantik (h1/h2/h3) und Optik (Klasse) sind getrennt: genau ein `<h1>` pro Seite.

**Farbe.** Nur Tokens: `--ink`, `--ink-2`, `--mute`, `--rule`, `--rule-tint`, `--shade`, `--paper`, `--on-dark*`, auf Digitales Bauen zusätzlich `--accent`/`--wash`. Keine neuen Grauwerte.

**Komponenten aus `site.css` (wiederverwenden statt nachbauen):**
`.hero` (+ `__eyebrow`, `__title`, `__sub`, `__foot`), `.sec-head` (+ `__title`, `__aside`), `.band`, `.band--s`, `.band--tint`, `.band--dark`, `.rule-top`, `.btn`, `.btn--back`, `.btn-row`, `.link-arrow`, `a.ext`, `.rows` (+ `--compact`, `--marked`, `.rows__row`), `.facts` (dl), `.tags`/`.tag`, `.chip`, `.quote` (+ `__src`, `__who`), `.ph` (Bild-/Porträtplatzhalter), `.media` (+ `--16x9` …), `.tiles`/`.tile` (+ `__cap`, `__title`, `__year`, `__star`), `.contact-card` (+ `__body`), `.faq` (details/summary + `.faq__answer`), `.sources`, `.note`, `.rv`, `.stack`, `.sr-only`.
Pfeile in Buttons/Links: `<span aria-hidden="true">→</span>`.
Referenzbeispiele: `factory/pages/_system.html` (gebaut: `prototyp/_system.html`).

**Seiten-CSS** (`assets/css/pages/<slug>.css`, Expertise-Unterseiten teilen `pages/expertise.css`, alle Projektseiten `pages/projekt.css`): nur Dinge, die es in `site.css` nicht gibt (interaktive Zeichnungen, besondere Module). Klassen mit Seitenpräfix oder Modulnamen. `python3 factory/check.py lint` muss sauber sein.

**Interaktionen** des Ausgangstexts (Filter, Zeichnungen mit Auswahl, Slider, Akkordeons, Hover-Namen …) bleiben funktional erhalten.

## Ablauf je Seite
1. Ausgangstext lesen (base64-Blöcke beim Lesen ausblenden, z. B. `sed -E 's/base64,[A-Za-z0-9+/=]{100,}/base64,…/g'`).
2. `factory/pages/<slug>.html` (+ ggf. CSS/JS) schreiben.
3. `python3 factory/build.py <slug>`
4. `python3 factory/check.py text <ausgangsdatei> <slug>` → Abweichungen beheben.
5. `python3 factory/check.py lint <css-name>` und `python3 factory/check.py links`.
6. `node factory/shot.js <slug> --grid --w=1440` und `node factory/shot.js <slug> --w=390`, Screenshots ansehen, Raster/Abstände/Umbrüche korrigieren.
Keine umfangreichen Tests darüber hinaus.

## Projekt-Detailseiten
Vorlage ist die von Hand gebaute FLZ-Seite. Alle weiteren Projektseiten entstehen aus `factory/projekte.json` über `python3 factory/projekte.py` (danach `build.py`) – **nicht** die erzeugten `pages/projekt-*.html` bearbeiten, sondern JSON bzw. Generator.
- Aufbau: Titelbild · Hero (Titel, Untertitel, Kennwerte) · Galerie · Kapitel · Stimme (Platzhalter) · Pläne · Projektdaten (Platzhalter) · Kontakt · Verwandt.
- Text 1:1 von der Live-Seite, nur Schreibweise korrigiert. Keine erfundenen Kapitelüberschriften: Kapitel heißen „Projekt“ oder tragen die Zwischenüberschriften der Live-Seite.
- Bilder in Live-Reihenfolge; `"plan": true` → Abschnitt „Pläne“, nie beschnitten. Galerie-Raster automatisch aus Hoch-/Querformat (Doku in `projekte.py`), `"layout"` überschreibt. Galerien über 9 Zeilen werden geteilt („Weitere Bilder“ nach der Stimme).
- Kategorie: Live-Kategorien der Projektseite, sonst Nutzung aus dem Projektarchiv (Ausgangstext 01).
