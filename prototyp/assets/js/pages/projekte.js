/* Projekte: Archiv mit Filter und erweiterter Suche.
   Format: Titel | Jahr | Nutzung | Status | Bauherrschaft | ausgezeichnet */
(function () {
  'use strict';

  var IMG = {
    a: 'assets/img/wp/842_landscape-01-scaled.jpg',
    b: 'assets/img/wp/NU-Schwabenstr_0025-scaled.jpg',
    c: 'assets/img/wp/799_lanscape-02-scaled.jpg',
    d: 'assets/img/wp/744_landscape_Treppenhaus-3-scaled.jpg',
    e: 'assets/img/wp/14_landscape-1.jpg',
    f: 'assets/img/wp/jobs-e1530280090729.jpg'
  };
  /* bewusst unregelmäßige Reihenfolge (11er-Muster) */
  var PATTERN = ['a', 'c', 'e', 'b', 'f', 'd', 'c', 'a', 'd', 'e', 'b'];
  var pic = function (i) { return IMG[PATTERN[i % PATTERN.length]]; };

  var RAW = `
Wohnbebauung Neu-Ulm|2024|wohnen|realisiert|gewerblich|0
Kriegsspital Neu-Ulm|2024|erhalten|realisiert|privat|0
BA3 Baubetriebshof der Stadt Ulm|2024|arbeiten|realisiert|oeffentlich|0
Wohnbebauung Laichingen|2024|wohnen|realisiert|gewerblich|0
Fassadenvarianten Wärmespeicher HKW der Fernwärme Ulm|2023|arbeiten|realisiert|oeffentlich|0
Rechenzentrum SWU|2023|arbeiten|realisiert|oeffentlich|0
Erweiterung WITec|2023|arbeiten|realisiert|gewerblich|0
Friesenhofen – An der Sägemühle|2023|wohnen|realisiert|gewerblich|0
WBW ehemaliges Kriegsspital|2023|wettbewerbe|wettbewerb|privat|0
Haus MK|2023|erhalten|realisiert|privat|0
WBW Betreuungs- und Verpflegungsgebäude|2023|wettbewerbe|wettbewerb|oeffentlich|0
Strohballenatelier|2022|arbeiten|realisiert|privat|1
Hubschrauberdachlandeplatz BWK|2022|arbeiten|realisiert|oeffentlich|0
WBW Neubau Wohnbebauung Weißenhorn|2022|wettbewerbe|wettbewerb|gewerblich|0
Haus S4|2022|wohnen|realisiert|privat|0
Parkhaus am Bahnhof und Fußgängerpassage|2022|parken|realisiert|oeffentlich|0
WBW Bauliche Entwicklung Heigeleshof|2021|wettbewerbe|wettbewerb|gewerblich|0
WBW Schweinemarkt 6-8|2021|wettbewerbe|wettbewerb|gewerblich|0
Z4 Science Park 3|2021|arbeiten|realisiert|gewerblich|0
Haus B3|2021|wohnen|realisiert|privat|0
Entwicklung „Am Weinberg“ Ulm|2020|beleben|wettbewerb|oeffentlich|0
Unterführung Blaubeurer Straße|2020|beleben|realisiert|oeffentlich|0
Sanitätsversorgungszentrum Wilhelmsburgkaserne|2020|erhalten|realisiert|oeffentlich|0
WBW Wohnbebauung Safranberg|2020|wettbewerbe|wettbewerb|gewerblich|0
WBW Jahnsportpark Friedrichsau|2019|wettbewerbe|wettbewerb|oeffentlich|0
BA2 Baubetriebshof der Stadt Ulm|2019|arbeiten|realisiert|oeffentlich|0
WBW Jörg-Syrlin-Grundschule und Astrid-Lindgren-Schule|2019|wettbewerbe|wettbewerb|oeffentlich|0
WBW Gemeindehaus Langenau|2019|wettbewerbe|wettbewerb|oeffentlich|0
WBW Wohngebäude mit Café Biberach|2019|wettbewerbe|wettbewerb|gewerblich|0
WBW Wohnungsbau Balingen|2018|wettbewerbe|wettbewerb|gewerblich|0
Produktionshalle Nagel|2018|arbeiten|realisiert|gewerblich|0
WBW Neubau Kindertagesstätte Hauderboschen|2018|wettbewerbe|wettbewerb|oeffentlich|0
Nordsee 2018|2018|essen|realisiert|gewerblich|0
Möbel Haus S|2018|möblieren|realisiert|privat|0
Haus S3|2018|wohnen|realisiert|privat|0
WBW Söflingen-Welz Areal|2017|wettbewerbe|wettbewerb|gewerblich|0
Stauferkaserne Pfullendorf|2017|erhalten|realisiert|oeffentlich|0
WBW Ludwig-Erhard-Brücke|2017|wettbewerbe|wettbewerb|oeffentlich|0
WBW Z4 Science Park 3|2017|wettbewerbe|wettbewerb|gewerblich|0
WBW Erweiterung WITec|2017|wettbewerbe|wettbewerb|gewerblich|0
Nordsee 2017|2017|essen|realisiert|gewerblich|0
FLZ im „Neuen Bau“ Ulm|2017|umnutzen|realisiert|oeffentlich|0
Lagerbürogebäude Setzingen|2016|arbeiten|realisiert|gewerblich|0
Wetterschutzhütte New Golf Club Neu-Ulm|2016|beleben|realisiert|gewerblich|0
Neubau Kettenhäuser Lettenwald|2016|wohnen|realisiert|gewerblich|0
Haus Marner-Walk-Straße|2016|wohnen|realisiert|privat|0
Haus R|2016|wohnen|realisiert|privat|0
WBW Gummi-Welz-Areal Söflingen|2016|wettbewerbe|wettbewerb|gewerblich|0
New Golf Club Neu-Ulm|2016|essen|realisiert|gewerblich|0
Umbau Neue Straße | Barfüßer und Riku Hotel|2015|umnutzen|realisiert|gewerblich|0
Umbau Neue Straße | Wohnungsbau|2015|wohnen|realisiert|gewerblich|0
Wohnbebauung Senden|2015|wohnen|realisiert|gewerblich|0
Nordsee 2016|2016|essen|realisiert|gewerblich|0
K5|2016|beleben|realisiert|gewerblich|1
Haus E|2015|wohnen|realisiert|privat|0
WBW Erweiterung der Grundschule Eichenplatz|2015|wettbewerbe|wettbewerb|oeffentlich|0
WBW Untermarchtal|2014|wettbewerbe|wettbewerb|privat|0
Unterkunftsgebäude S|2014|arbeiten|realisiert|oeffentlich|0
Fahrradverleih am Rathaus|2014|parken|realisiert|oeffentlich|0
WBW Reutlinger Straße 30-88|2014|wettbewerbe|wettbewerb|gewerblich|0
Praxis M|2014|arbeiten|realisiert|privat|0
Gartenstraße NU|2013|wohnen|realisiert|gewerblich|0
Wohnbau Pfaffenhofen|2013|wohnen|realisiert|gewerblich|0
Sonja Quandt Silbermanufaktur|2013|verkaufen|realisiert|gewerblich|0
Bootshaus Ulm|2013|beleben|realisiert|oeffentlich|0
WBW Meininger Allee|2013|wettbewerbe|wettbewerb|gewerblich|0
Sanierung VH Ulm|2013|lernen|realisiert|oeffentlich|1
Baubetriebshof|2012|arbeiten|realisiert|oeffentlich|0
Haus G2|2012|wohnen|realisiert|privat|0
Haus S|2012|wohnen|realisiert|privat|0
Haus M|2012|wohnen|realisiert|privat|0
Haus V|2011|wohnen|realisiert|privat|0
Radstadel DH|2011|parken|realisiert|oeffentlich|0
Haus B2|2011|wohnen|realisiert|privat|0
Wilken GmbH|2011|arbeiten|realisiert|gewerblich|0
Zentrum für Gestaltung HFG Ulm|2011|lernen|realisiert|oeffentlich|0
Waldorf Kindergarten Blaustein|2010|lernen|realisiert|privat|0
Haus S2|2010|wohnen|realisiert|privat|0
Wohnbebauung Lettenwald|2010|wohnen|realisiert|gewerblich|0
WBW Lönsstraße|2010|wettbewerbe|wettbewerb|gewerblich|0
EHS @ HFG|2010|lernen|realisiert|oeffentlich|0
WBW Konzertsaal|2009|wettbewerbe|wettbewerb|oeffentlich|0
Kita Illerblick|2009|lernen|realisiert|oeffentlich|0
WBW Parkhaus Laupheim|2009|wettbewerbe|wettbewerb|oeffentlich|0
WBW Mehrfachbeauftragung Lettenwald|2009|wettbewerbe|wettbewerb|gewerblich|0
WBW Sedanstraße|2009|wettbewerbe|wettbewerb|gewerblich|0
WBW U3 Ausbauoffensive|2009|wettbewerbe|wettbewerb|oeffentlich|0
Parkhaus am Rathaus|2009|parken|realisiert|oeffentlich|1
Wohn- und Geschäftshaus Pranger|2008|beleben|realisiert|gewerblich|0
WBW Finanzamt Biberach|2008|wettbewerbe|wettbewerb|oeffentlich|0
Ausstellung 200 Jahre NU|2008|ausstellen|realisiert|oeffentlich|0
WBW Karpfengasse|2008|wettbewerbe|wettbewerb|gewerblich|0
Anbau Scholl-Gymnasium|2008|lernen|realisiert|oeffentlich|0
WBW Bürogebäude Wilken|2007|wettbewerbe|wettbewerb|gewerblich|0
Restaurantgebäude La Bagatta|2007|essen|realisiert|gewerblich|0
Geschäftsstelle SSV Ulm|2007|arbeiten|realisiert|gewerblich|0
Büro T|2007|arbeiten|realisiert|gewerblich|0
Radhaus Heilbronn|2007|parken|realisiert|oeffentlich|0
FLZ der Saarländischen Vollzugspolizei|2006|arbeiten|realisiert|oeffentlich|0
Nordsee am Viktualienmarkt|2006|essen|realisiert|gewerblich|0
WBW Kita Ost|2006|wettbewerbe|wettbewerb|oeffentlich|0
WBW Stadtregal Ulm|2006|wettbewerbe|wettbewerb|gewerblich|0
Pavillon NU21|2006|ausstellen|realisiert|oeffentlich|0
Haus der Wirtschaft|2005|arbeiten|realisiert|gewerblich|0
Infopunkt Citybahnhof|2005|ausstellen|realisiert|oeffentlich|0
WBW HTW Saarbrücken|2005|wettbewerbe|wettbewerb|oeffentlich|0
Gründerzeithaus S|2005|erhalten|realisiert|privat|0
Radhaus Ulm|2005|parken|realisiert|oeffentlich|0
WBW Finanzamt Hersbruck|2004|wettbewerbe|wettbewerb|oeffentlich|0
Haus K|2004|wohnen|realisiert|privat|0
Puma Eventbox|2004|ausstellen|realisiert|gewerblich|0
Haus N|2004|wohnen|realisiert|privat|0
Bischof-Sproll-Haus|2003|erhalten|realisiert|privat|0
WBW Ausstellungsgestaltung|2003|wettbewerbe|wettbewerb|oeffentlich|0
WBW Donaubastion|2003|wettbewerbe|wettbewerb|oeffentlich|0
WBW Judenhof|2003|wettbewerbe|wettbewerb|oeffentlich|0
WBW Obergericht Zürich|2003|wettbewerbe|wettbewerb|oeffentlich|0
Kardiologische Klinik|2003|arbeiten|realisiert|privat|0
Haus H|2003|wohnen|realisiert|privat|0
WBW Entertainment Center|2002|wettbewerbe|wettbewerb|gewerblich|0
Gesundheitsbox|2002|ausstellen|realisiert|gewerblich|0
Haus B|2002|wohnen|realisiert|privat|0
Haus G|2002|wohnen|realisiert|privat|0
Hörsaalgebäude Uni Ulm|2002|lernen|realisiert|oeffentlich|0
Saftbar Smoothies|2002|essen|realisiert|gewerblich|0
Parkhaus Deutschhaus|2002|parken|realisiert|oeffentlich|1
Musikpavillon|2002|beleben|realisiert|oeffentlich|0
`;

  /* Der Titel „Umbau Neue Straße | …“ enthält selbst einen Strich,
     deshalb wird von hinten getrennt. */
  var P = RAW.trim().split('\n').map(function (row, i) {
    var f = row.split('|');
    var aw = +f.pop(), k = f.pop(), s = f.pop(), c = f.pop(), y = +f.pop();
    return { t: f.join('|').trim(), y: y, c: c, s: s, k: k, aw: aw, img: pic(i) };
  });

  /* Projekte mit eigener Detailseite (projektseiten.js) bekommen Link und Kachelbild,
     alle übrigen führen auf die Beispielseite FLZ */
  var PS = window.PROJEKTSEITEN || {};
  var tiles = document.getElementById('tiles');
  tiles.innerHTML = P.map(function (p) {
    var s = PS[p.t];
    return '<a class="tile" href="' + (s ? s.href : 'projekt-flz-neuer-bau-ulm.html') + '" data-cat="' + p.c + '" data-year="' + p.y +
      '" data-status="' + p.s + '" data-client="' + p.k + '" data-award="' + p.aw + '">' +
      '<img src="' + (s ? s.img : p.img) + '" alt="' + p.t + '" loading="lazy">' +
      '<div class="tile__cap"><span class="tile__title">' + p.t +
      (p.aw ? '<span class="tile__star" title="Ausgezeichnet"></span>' : '') + '</span> ' +
      '<span class="tile__year">' + p.y + '</span></div></a>';
  }).join('\n');

  var chips = [].slice.call(document.querySelectorAll('.pj-fchip'));
  var advBtn = document.getElementById('advBtn');
  var advPanel = document.getElementById('advanced');
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');
  var onlyAward = document.getElementById('onlyAward');
  var cat = 'alle';

  advBtn.addEventListener('click', function () {
    var open = advPanel.hasAttribute('data-open');
    if (open) { advPanel.removeAttribute('data-open'); } else { advPanel.setAttribute('data-open', ''); }
    advBtn.setAttribute('aria-expanded', String(!open));
    document.getElementById('advGlyph').textContent = open ? '+' : '\u2212';
  });
  chips.forEach(function (ch) { ch.addEventListener('click', function () { setCat(ch.dataset.cat); }); });

  function setCat(c) {
    cat = c;
    chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.cat === c)); });
    /* Eine Nutzung aus der Leiste und eine aus „Weitere Nutzungen“
       schließen sich aus, sonst bleibt die Liste leer. */
    if (c !== 'alle') document.querySelectorAll('.pj-adv input[data-f="use"]').forEach(function (i) { i.checked = false; });
    apply();
  }
  document.querySelectorAll('.pj-adv input').forEach(function (i) {
    i.addEventListener('change', function (e) {
      if (e.target.dataset.f === 'use' && e.target.checked && cat !== 'alle') {
        cat = 'alle';
        chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.cat === 'alle')); });
      }
      apply();
    });
  });
  document.getElementById('resetBtn').addEventListener('click', function () {
    cat = 'alle';
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.cat === 'alle')); });
    document.querySelectorAll('.pj-adv input').forEach(function (i) { i.checked = false; });
    apply();
  });

  function picked(name) {
    return [].slice.call(document.querySelectorAll('.pj-adv input[data-f="' + name + '"]:checked')).map(function (i) { return i.value; });
  }
  function apply() {
    var eras = picked('era'), st = picked('status'), cl = picked('client'), use = picked('use');
    var n = 0;
    document.querySelectorAll('.tile').forEach(function (t) {
      var y = +t.dataset.year;
      var era = y >= 2020 ? '2020' : (y >= 2010 ? '2010' : '2000');
      var ok = true;
      if (use.length) { if (use.indexOf(t.dataset.cat) < 0) ok = false; }
      else if (cat !== 'alle' && t.dataset.cat !== cat) ok = false;
      if (eras.length && eras.indexOf(era) < 0) ok = false;
      if (st.length && st.indexOf(t.dataset.status) < 0) ok = false;
      if (cl.length && cl.indexOf(t.dataset.client) < 0) ok = false;
      if (onlyAward.checked && t.dataset.award !== '1') ok = false;
      t.hidden = !ok;
      if (ok) n++;
    });
    var none = (cat === 'alle' && !eras.length && !st.length && !cl.length && !use.length && !onlyAward.checked);
    countEl.textContent = none
      ? P.length + ' Projekte'
      : (n === 1 ? '1 Projekt für diese Auswahl' : n + ' Projekte für diese Auswahl');
    emptyEl.hidden = n > 0;
  }
  apply();
})();
