/* Projekte: Archiv mit Filter und erweiterter Suche.
   Format: Titel | Jahr | Nutzung | Status | Bauherrschaft | ausgezeichnet | Kachelbild
   Kachelbild = Kachelbild der Live-Seite; leer bei Projekten mit Detailseite (Bild aus projektseiten.js) */
(function () {
  'use strict';

  var RAW = `
Wohnbebauung Neu-Ulm|2024|wohnen|realisiert|gewerblich|0|
Kriegsspital Neu-Ulm|2024|erhalten|realisiert|privat|0|
BA3 Baubetriebshof der Stadt Ulm|2024|arbeiten|realisiert|oeffentlich|0|
Wohnbebauung Laichingen|2024|wohnen|realisiert|gewerblich|0|
Fassadenvarianten Wärmespeicher HKW der Fernwärme Ulm|2023|arbeiten|realisiert|oeffentlich|0|
Rechenzentrum SWU|2023|arbeiten|realisiert|oeffentlich|0|
Erweiterung WITec|2023|arbeiten|realisiert|gewerblich|0|
Friesenhofen – An der Sägemühle|2023|wohnen|realisiert|gewerblich|0|
WBW ehemaliges Kriegsspital|2023|wettbewerbe|wettbewerb|privat|0|
Haus MK|2023|erhalten|realisiert|privat|0|
WBW Betreuungs- und Verpflegungsgebäude|2023|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-betreuungs-und-verpflegungsgebaeude/144_landscape_Rueckbaubarkeit-scaled_500x500_acf_cropped.jpg
Strohballenatelier|2022|arbeiten|realisiert|privat|1|assets/img/strohballenatelier/864_square_aussen_500x500_acf_cropped.jpg
Hubschrauberdachlandeplatz BWK|2022|arbeiten|realisiert|oeffentlich|0|assets/img/hubschrauberdachlandeplatz-bwk/624_square_Plattform-1_500x500_acf_cropped.jpg
WBW Neubau Wohnbebauung Weißenhorn|2022|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-neubau-wohnbebauung-weissenhorn/142_square_Visu2_500x500_acf_cropped.jpg
Haus S4|2022|wohnen|realisiert|privat|0|assets/img/haus-s4/748_Treppe_zquare_500x500_acf_cropped.jpg
Parkhaus am Bahnhof und Fußgängerpassage|2022|parken|realisiert|oeffentlich|0|assets/img/parkhaus-am-bahnhof/502_square-Kunst-2_500x500_acf_cropped.jpg
WBW Bauliche Entwicklung Heigeleshof|2021|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-bauliche-entwicklung-heigeleshof/01_139_header_Lageplan_500x500_acf_cropped.jpg
WBW Schweinemarkt 6-8|2021|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-schweinemarkt-6-8/01_140_landscape_Ansicht-SO_500x500_acf_cropped.jpg
Z4 Science Park 3|2021|arbeiten|realisiert|gewerblich|0|assets/img/z4-science-park-3/736_square-Fassase-Ecke-1.jpg
Haus B3|2021|wohnen|realisiert|privat|0|assets/img/haus-b3/780_square_Terrasse_500x500_acf_cropped.jpg
Entwicklung „Am Weinberg“ Ulm|2020|beleben|wettbewerb|oeffentlich|0|assets/img/entwicklung-am-weinberg-ulm/845_1_square_500x500_acf_cropped.jpg
Unterführung Blaubeurer Straße|2020|beleben|realisiert|oeffentlich|0|assets/img/unterfuehrung-blaubeurer-strasse/01_squared_745_800x800_500x500_acf_cropped.jpg
Sanitätsversorgungszentrum Wilhelmsburgkaserne|2020|erhalten|realisiert|oeffentlich|0|assets/img/sanitaetsversorgungszentrum-wilhelmsburgkaserne/690_1_Square_Sanitaetsversorgungszentrum-Ulm-0237-scaled_500x500_acf_cropped.jpg
WBW Wohnbebauung Safranberg|2020|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-wohnbebauung-safranberg/01_squared_138_500x500_acf_cropped.jpg
WBW Jahnsportpark Friedrichsau|2019|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-jahnsportpark-friedrichsau/01_squared-2_500x500_acf_cropped.jpg
BA2 Baubetriebshof der Stadt Ulm|2019|arbeiten|realisiert|oeffentlich|0|assets/img/ba2-baubetriebshof-der-stadt-ulm/01_squared-1_500x500_acf_cropped-1.jpg
WBW Jörg-Syrlin-Grundschule und Astrid-Lindgren-Schule|2019|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-joerg-syrlin-grundschule-und-astrid-lindgren-schule/01_squared_500x500_acf_cropped-1.jpg
WBW Gemeindehaus Langenau|2019|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-gemeindehaus-langenau/01_squared-3_500x500_acf_cropped.jpg
WBW Wohngebäude mit Café Biberach|2019|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-wohngebaeude-mit-caf-biberach/01_squared-2_500x500_acf_cropped.jpg
WBW Wohnungsbau Balingen|2018|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-wohnungsbau-balingen/01_squared_500x500_acf_cropped.jpg
Produktionshalle Nagel|2018|arbeiten|realisiert|gewerblich|0|assets/img/produktionshalle-nagel/01_1_square_500x500_acf_cropped.jpg
WBW Neubau Kindertagesstätte Hauderboschen|2018|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-neubau-kindertagesstaette-hauderboschen/01_square-3_500x500_acf_cropped.jpg
Nordsee 2018|2018|essen|realisiert|gewerblich|0|assets/img/nordsee-2018/01_squared-3_500x500_acf_cropped.jpg
Möbel Haus S|2018|möblieren|realisiert|privat|0|assets/img/moebel-haus-s/Haus-S_0006_500x500_acf_cropped.jpg
Haus S3|2018|wohnen|realisiert|privat|0|assets/img/haus-s3/01_squared_500x500_acf_cropped-2.jpg
WBW Söflingen-Welz Areal|2017|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-soeflingen-welz-areal/01_1_square-1_500x500_acf_cropped.jpg
Stauferkaserne Pfullendorf|2017|erhalten|realisiert|oeffentlich|0|assets/img/stauferkaserne-pfullendorf/01_squared_500x500_acf_cropped-1.jpg
WBW Ludwig-Erhard-Brücke|2017|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-ludwig-erhard-bruecke/01_square-1_500x500_acf_cropped.jpg
WBW Z4 Science Park 3|2017|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-z4-science-park-3/01_square_500x500_acf_cropped.jpg
WBW Erweiterung WITec|2017|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-erweiterung-witec/01_squared-4_500x500_acf_cropped.jpg
Nordsee 2017|2017|essen|realisiert|gewerblich|0|assets/img/nordsee-2017/01_2_squared-1_500x500_acf_cropped-4.jpg
FLZ im „Neuen Bau“ Ulm|2017|umnutzen|realisiert|oeffentlich|0|
Lagerbürogebäude Setzingen|2016|arbeiten|realisiert|gewerblich|0|assets/img/lagerbuerogebaeude-setzingen/01_square_500x500_acf_cropped-3.jpg
Wetterschutzhütte New Golf Club Neu-Ulm|2016|beleben|realisiert|gewerblich|0|assets/img/wetterschutzhuette-new-golf-club-neu-ulm/01_square-27_500x500_acf_cropped.jpg
Neubau Kettenhäuser Lettenwald|2016|wohnen|realisiert|gewerblich|0|assets/img/neubau-kettenhaeuser-lettenwald/01_squared-6_500x500_acf_cropped.jpg
Haus Marner-Walk-Straße|2016|wohnen|realisiert|privat|0|assets/img/haus-marner-walk-strasse/01_squared_500x500_acf_cropped-6.jpg
Haus R|2016|wohnen|realisiert|privat|0|assets/img/haus-r/01_2_squared-1_500x500_acf_cropped.jpg
WBW Gummi-Welz-Areal Söflingen|2016|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-gummi-welz-areal-soeflingen/01_square_500x500_acf_cropped-2.jpg
New Golf Club Neu-Ulm|2016|essen|realisiert|gewerblich|0|assets/img/new-golf-club-neu-ulm/01_squared_500x500_acf_cropped-4.jpg
Umbau Neue Straße | Barfüßer und Riku Hotel|2015|umnutzen|realisiert|gewerblich|0|assets/img/umbau-neue-strasse-barfuesser-und-riku-hotel/01_squared_1_500x500_acf_cropped.jpg
Umbau Neue Straße | Wohnungsbau|2015|wohnen|realisiert|gewerblich|0|assets/img/umbau-neue-strasse-wohnungsbau/01_squared_1-1_500x500_acf_cropped-1.jpg
Wohnbebauung Senden|2015|wohnen|realisiert|gewerblich|0|assets/img/wohnbebauung-senden/01_header-1_500x500_acf_cropped.jpg
Nordsee 2016|2016|essen|realisiert|gewerblich|0|assets/img/nordsee-2016/01_2_squared-1_500x500_acf_cropped-3.jpg
K5|2016|beleben|realisiert|gewerblich|1|assets/img/k5/01_squared_500x500_acf_cropped-2.jpg
Haus E|2015|wohnen|realisiert|privat|0|assets/img/haus-e/01_2_squared-1_500x500_acf_cropped-2.jpg
WBW Erweiterung der Grundschule Eichenplatz|2015|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-erweiterung-der-grundschule-eichenplatz/01_squared_500x500_acf_cropped-5.jpg
WBW Untermarchtal|2014|wettbewerbe|wettbewerb|privat|0|assets/img/wbw-untermarchtal/01_squared_500x500_acf_cropped-4.jpg
Unterkunftsgebäude S|2014|arbeiten|realisiert|oeffentlich|0|assets/img/unterkunftsgebaeude-s/01_squared_500x500_acf_cropped-1.jpg
Fahrradverleih am Rathaus|2014|parken|realisiert|oeffentlich|0|assets/img/fahrradverleih-am-rathaus/01_squared-1_500x500_acf_cropped.jpg
WBW Reutlinger Straße 30-88|2014|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-reutlinger-strasse-30-88/01_squared_500x500_acf_cropped.jpg
Praxis M|2014|arbeiten|realisiert|privat|0|assets/img/praxis-m/01_4_squared-1_500x500_acf_cropped.jpg
Gartenstraße NU|2013|wohnen|realisiert|gewerblich|0|assets/img/gartenstrasse-nu/01_squared-1_500x500_acf_cropped-1.jpg
Wohnbau Pfaffenhofen|2013|wohnen|realisiert|gewerblich|0|assets/img/wohnbau-pfaffenhofen/01_squared_500x500_acf_cropped-2.jpg
Sonja Quandt Silbermanufaktur|2013|verkaufen|realisiert|gewerblich|0|assets/img/sonja-quandt-silbermanufaktur/01_squared_500x500_acf_cropped-3.jpg
Bootshaus Ulm|2013|beleben|realisiert|oeffentlich|0|assets/img/bootshaus-ulm/01_2_squared-2_500x500_acf_cropped.jpg
WBW Meininger Allee|2013|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-meininger-allee/01_squared_500x500_acf_cropped-2.jpg
Sanierung VH Ulm|2013|lernen|realisiert|oeffentlich|1|assets/img/sanierung-vh-ulm/01_2_squared.jpg
Baubetriebshof|2012|arbeiten|realisiert|oeffentlich|0|assets/img/baubetriebshof/01_2_squared-1_500x500_acf_cropped-1.jpg
Haus G2|2012|wohnen|realisiert|privat|0|assets/img/haus-g2/01_square_500x500_acf_cropped-1.jpg
Haus S|2012|wohnen|realisiert|privat|0|assets/img/haus-s/01_squared_500x500_acf_cropped-1.jpg
Haus M|2012|wohnen|realisiert|privat|0|assets/img/haus-m/01_squared-1_500x500_acf_cropped.jpg
Haus V|2011|wohnen|realisiert|privat|0|assets/img/haus-v/01_square_500x500_acf_cropped.jpg
Radstadel DH|2011|parken|realisiert|oeffentlich|0|assets/img/radstadel-dh/01_squared-1_500x500_acf_cropped.jpg
Haus B2|2011|wohnen|realisiert|privat|0|assets/img/haus-b2/01_2_squared-1_500x500_acf_cropped.jpg
Wilken GmbH|2011|arbeiten|realisiert|gewerblich|0|assets/img/wilken-gmbh/01_squared_500x500_acf_cropped.jpg
Zentrum für Gestaltung HFG Ulm|2011|lernen|realisiert|oeffentlich|0|assets/img/hfg-ulm/01_2_squared.jpg
Waldorf Kindergarten Blaustein|2010|lernen|realisiert|privat|0|assets/img/waldorf-kindergarten-blaustein/01_squared_500x500_acf_cropped.jpg
Haus S2|2010|wohnen|realisiert|privat|0|assets/img/haus-s2/01_1_squared.jpg
Wohnbebauung Lettenwald|2010|wohnen|realisiert|gewerblich|0|assets/img/wohnbebauung-lettenwald/01_squared.jpg
WBW Lönsstraße|2010|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-loensstrasse/01_squared_500x500_acf_cropped-16.jpg
EHS @ HFG|2010|lernen|realisiert|oeffentlich|0|assets/img/ehs-hfg/01_squared-8.jpg
WBW Konzertsaal|2009|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-konzertsaal/01_square-1.jpg
Kita Illerblick|2009|lernen|realisiert|oeffentlich|0|assets/img/kita-illerblick/01_2_squared.jpg
WBW Parkhaus Laupheim|2009|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-parkhaus-laupheim/01_squared_500x500_acf_cropped-15_500x500_acf_cropped.jpg
WBW Mehrfachbeauftragung Lettenwald|2009|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-mehrfachbeauftragung-lettenwald/01_squared_500x500_acf_cropped-14_500x500_acf_cropped.jpg
WBW Sedanstraße|2009|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-sedanstrasse/01_squared_500x500_acf_cropped-13.jpg
WBW U3 Ausbauoffensive|2009|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-u3-ausbauoffensive/01_squared-1_500x500_acf_cropped-1.jpg
Parkhaus am Rathaus|2009|parken|realisiert|oeffentlich|1|assets/img/parkhaus-am-rathaus/01_square_500x500_acf_cropped.jpg
Wohn- und Geschäftshaus Pranger|2008|beleben|realisiert|gewerblich|0|assets/img/wohn-und-geschaeftshaus-pranger/01_squared-9.jpg
WBW Finanzamt Biberach|2008|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-finanzamt-biberach/01_squared_500x500_acf_cropped-12.jpg
Ausstellung 200 Jahre NU|2008|ausstellen|realisiert|oeffentlich|0|assets/img/ausstellung-200-jahre-nu/01_squared_500x500_acf_cropped-11.jpg
WBW Karpfengasse|2008|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-karpfengasse/01_squared-4.jpg
Anbau Scholl-Gymnasium|2008|lernen|realisiert|oeffentlich|0|assets/img/anbau-scholl-gymnasium/01_squared.jpg
WBW Bürogebäude Wilken|2007|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-buerogebaeude-wilken/01_square_500x500_acf_cropped-7.jpg
Restaurantgebäude La Bagatta|2007|essen|realisiert|gewerblich|0|assets/img/restaurantgebaeude-la-bagatta/01_squared-3.jpg
Geschäftsstelle SSV Ulm|2007|arbeiten|realisiert|gewerblich|0|assets/img/geschaeftsstelle-ssv-ulm/01_square-19.jpg
Büro T|2007|arbeiten|realisiert|gewerblich|0|assets/img/buero-t/01_squared_500x500_acf_cropped-10.jpg
Radhaus Heilbronn|2007|parken|realisiert|oeffentlich|0|assets/img/radhaus-heilbronn/01_square_500x500_acf_cropped.jpg
FLZ der Saarländischen Vollzugspolizei|2006|arbeiten|realisiert|oeffentlich|0|assets/img/flz-der-saarlaendischen-vollzugspolizei/01_square_500x500_acf_cropped-1_500x500_acf_cropped.jpg
Nordsee am Viktualienmarkt|2006|essen|realisiert|gewerblich|0|assets/img/nordsee-am-viktualienmarkt/01_squared.jpg
WBW Kita Ost|2006|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-kita-ost/01_2_squared.jpg
WBW Stadtregal Ulm|2006|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-stadtregal-ulm/01_squared.jpg
Pavillon NU21|2006|ausstellen|realisiert|oeffentlich|0|assets/img/pavillon-nu21/01_squared_500x500_acf_cropped-9.jpg
Haus der Wirtschaft|2005|arbeiten|realisiert|gewerblich|0|assets/img/haus-der-wirtschaft/01_2_squared-2.jpg
Infopunkt Citybahnhof|2005|ausstellen|realisiert|oeffentlich|0|assets/img/infopunkt-citybahnhof/01_2_squared-3_500x500_acf_cropped.jpg
WBW HTW Saarbrücken|2005|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-htw-saarbruecken/01_square-25.jpg
Gründerzeithaus S|2005|erhalten|realisiert|privat|0|assets/img/gruenderzeithaus-s/01_squared-1_500x500_acf_cropped.jpg
Radhaus Ulm|2005|parken|realisiert|oeffentlich|0|assets/img/radhaus-ulm/01_2_squared-1_500x500_acf_cropped-7.jpg
WBW Finanzamt Hersbruck|2004|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-finanzamt-hersbruck/01_2_squared.jpg
Haus K|2004|wohnen|realisiert|privat|0|assets/img/haus-k/01_squared_500x500_acf_cropped-7.jpg
Puma Eventbox|2004|ausstellen|realisiert|gewerblich|0|assets/img/puma-eventbox/01_square.jpg
Haus N|2004|wohnen|realisiert|privat|0|assets/img/haus-n/01_squared_500x500_acf_cropped-6.jpg
Bischof-Sproll-Haus|2003|erhalten|realisiert|privat|0|assets/img/bischof-sproll-haus/01_square-6.jpg
WBW Ausstellungsgestaltung|2003|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-ausstellungsgestaltung/01_square-5.jpg
WBW Donaubastion|2003|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-donaubastion/01_square-3.jpg
WBW Judenhof|2003|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-judenhof/01_2-squared.jpg
WBW Obergericht Zürich|2003|wettbewerbe|wettbewerb|oeffentlich|0|assets/img/wbw-obergericht-zuerich/01_square-4.jpg
Kardiologische Klinik|2003|arbeiten|realisiert|privat|0|assets/img/kardiologische-klinik/01_squared_500x500_acf_cropped-5.jpg
Haus H|2003|wohnen|realisiert|privat|0|assets/img/haus-h/01_square_500x500_acf_cropped-5.jpg
WBW Entertainment Center|2002|wettbewerbe|wettbewerb|gewerblich|0|assets/img/wbw-entertainment-center/01_square-22.jpg
Gesundheitsbox|2002|ausstellen|realisiert|gewerblich|0|assets/img/gesundheitsbox/01_2_squared-1_500x500_acf_cropped-5.jpg
Haus B|2002|wohnen|realisiert|privat|0|assets/img/haus-b/01_square-1_500x500_acf_cropped.jpg
Haus G|2002|wohnen|realisiert|privat|0|assets/img/haus-g/01_square-2_500x500_acf_cropped.jpg
Hörsaalgebäude Uni Ulm|2002|lernen|realisiert|oeffentlich|0|assets/img/hoersaalgebaeude-uni-ulm/01-square_500x500_acf_cropped.jpg
Saftbar Smoothies|2002|essen|realisiert|gewerblich|0|assets/img/saftbar-smoothies/01_squared-4.jpg
Parkhaus Deutschhaus|2002|parken|realisiert|oeffentlich|1|assets/img/parkhaus-deutschhaus/01_squared-1_500x500_acf_cropped.jpg
Musikpavillon|2002|beleben|realisiert|oeffentlich|0|assets/img/musikpavillon/01_squared-2_500x500_acf_cropped.jpg
`;

  /* Der Titel „Umbau Neue Straße | …“ enthält selbst einen Strich,
     deshalb wird von hinten getrennt. */
  var P = RAW.trim().split('\n').map(function (row) {
    var f = row.split('|');
    var img = f.pop(), aw = +f.pop(), k = f.pop(), s = f.pop(), c = f.pop(), y = +f.pop();
    return { t: f.join('|').trim(), y: y, c: c, s: s, k: k, aw: aw, img: img };
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

/* Projekte — Bildfeld im Hero: jede Sekunde kehrt das älteste getauschte Feld
   zum Grundbild zurück, dafür erscheint ein anderer Ausschnitt in einem freien Feld */
(function () {
  var box = document.getElementById('mosaic');
  if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var DIR = 'assets/img/projekte-hero/';
  var PARTS = [
    ['teil-glas-treppenhaus', 'Treppenhaus mit Glasfassade'],
    ['teil-holz-galerie', 'Galerie mit Holzeinbauten'],
    ['teil-gold-gewoelbe', 'Goldene Wandpaneele unter Gewölbe'],
    ['teil-windsack-beton', 'Sichtbetonbau mit Windsack auf dem Dach'],
    ['teil-alu-fassade', 'Bürobau mit Aluminiumfassade und Funkturm'],
    ['teil-holzlamellen', 'Holzlamellen vor Himmel'],
    ['teil-rampe-ringe', 'Parkhausrampe mit Lichtringen']
  ];
  var CELLS = [];
  for (var r = 1; r <= 3; r++) for (var c = 1; c <= 3; c++) CELLS.push(r + ';' + c);
  var cellOf = function (img) { return img.style.getPropertyValue('--r') + ';' + img.style.getPropertyValue('--c'); };
  var queue = Array.prototype.slice.call(box.querySelectorAll('.pj-mosaic__in'));
  var gone = [];   /* zuletzt ausgeblendete Teile, kommen nicht gleich wieder */
  var lines = box.querySelector('i');

  /* alle Teile vorladen, damit der Wechsel nicht auf das Netz wartet */
  PARTS.forEach(function (p) { new Image().src = DIR + p[0] + '.jpg'; });

  function next() {
    var old = queue.shift();
    gone = [old.getAttribute('src')].concat(gone).slice(0, 2);
    var srcs = queue.map(function (i) { return i.getAttribute('src'); }).concat(gone);
    var cells = queue.concat(old).map(cellOf);
    var parts = PARTS.filter(function (p) { return srcs.indexOf(DIR + p[0] + '.jpg') < 0; });
    var free = CELLS.filter(function (k) { return cells.indexOf(k) < 0; });
    var pick = parts[Math.floor(Math.random() * parts.length)];
    var at = free[Math.floor(Math.random() * free.length)].split(';');

    old.classList.add('is-off');
    setTimeout(function () { old.remove(); }, 600);

    var img = new Image();
    img.className = 'pj-mosaic__in is-off';
    img.alt = pick[1];
    img.style.setProperty('--r', at[0]);
    img.style.setProperty('--c', at[1]);
    img.onload = function () {
      box.insertBefore(img, lines);
      requestAnimationFrame(function () { requestAnimationFrame(function () { img.classList.remove('is-off'); }); });
    };
    img.src = DIR + pick[0] + '.jpg';
    queue.push(img);
  }
  setInterval(function () { if (!document.hidden) next(); }, 1000);
})();
