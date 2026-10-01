(function () {
  'use strict';
  /* Ziele laut Factory-Vertrag: Projekte -> FLZ-Detailseite, Einzel-Auszeichnungen -> # */
  var P = 'projekt-flz-neuer-bau-ulm.html';
  var N = '#';

  /* eine Liste, chronologisch */
  var awards = [
    { y: 2023, n: 'Hugo-Häring-Auszeichnung', p: 'Strohballenatelier, Diepoldshofen', u: P },
    { y: 2020, n: 'Anerkennung Staatspreis Baukultur Baden-Württemberg „Städtebau und Freiraum“', p: 'K5, Ulm', u: P },
    { y: 2020, n: 'Auszeichnung Otto-Borst-Preis „Stadterneuerung“', p: 'K5, Ulm', u: P },
    { y: 2019, n: 'Beispielhaftes Bauen Alb-Donau-Kreis und Ulm 2013–2019', p: 'FLZ der Polizei Ulm', u: P },
    { y: 2019, n: 'Beispielhaftes Bauen Alb-Donau-Kreis und Ulm 2013–2019', p: 'K5, Ulm', u: P },
    { y: 2019, n: 'Beispielhaftes Bauen Alb-Donau-Kreis und Ulm 2013–2019', p: 'Zentrum für Gestaltung HfG Ulm', u: P },
    { y: 2017, n: 'Hugo-Häring-Auszeichnung', p: 'K5, Ulm', u: P },
    { y: 2017, n: 'Architekturpreis Beton, engere Wahl', p: 'K5, Ulm', u: P },
    { y: 2017, n: 'Hugo-Häring-Auszeichnung', p: 'Rathaus Hochdorf', u: N },
    { y: 2015, n: 'Beispielhaftes Bauen Landkreis Biberach 2009–2015', p: 'Rathaus Hochdorf', u: N },
    { y: 2013, n: 'Beispielhaftes Bauen Alb-Donau-Kreis und Ulm 2007–2013', p: 'Volkshochschule Ulm, Sanierung', u: P },
    { y: 2009, n: 'Hugo-Häring-Preis', p: 'Parkhaus am Rathaus, Ulm', u: P },
    { y: 2009, n: 'Anerkennung Holzbaupreis Baden-Württemberg', p: 'Infopunkt Citybahnhof, Ulm', u: P },
    { y: 2008, n: 'Auszeichnung guter Bauten', p: 'Parkhaus am Rathaus, Ulm', u: P },
    { y: 2007, n: 'Stiftungspreis „Sensibles Parken in der Stadt“', p: 'Parkhaus am Rathaus, Ulm', u: P },
    { y: 2006, n: 'Auszeichnung Deutscher Städtebaupreis', p: 'Parkhaus am Rathaus, Ulm', u: P },
    { y: 2006, n: 'The Global Award — World’s Best Work in Healthcare Communications', p: 'Gesundheitsbox', u: P },
    { y: 2006, n: 'Felix Burda Award, Shortlist', p: 'Gesundheitsbox', u: P },
    { y: 2004, n: 'Schöner Wohnen „Haus des Jahres“', p: 'Haus B', u: P },
    { y: 2002, n: 'Auszeichnung guter Bauten', p: 'Parkhaus „Deutschhaus“, Ulm', u: P },
    { y: 1990, n: 'Auszeichnung guter Bauten', p: 'Pressehaus Ulm', u: N },
    { y: 1987, n: 'Auszeichnung guter Bauten', p: 'Druckhaus Ulm-Donautal', u: N },
    { y: 1980, n: 'BDA-Auszeichnung', p: 'Haus der Stadtwerke Ulm, Verwaltung und Werkhof', u: N },
    { y: 1977, n: 'BDA-Auszeichnung', p: 'Großdruckerei Ebner, Ulm-Böfingen', u: N },
    { y: 1977, n: 'BDA-Auszeichnung', p: 'B10 Universitätsanschluss, Ulm', u: N }
  ];

  document.getElementById('awards').innerHTML = awards.map(function (a) {
    return '<li><a class="az-award" href="' + a.u + '">' +
      '<span class="az-award__year">' + a.y + '</span>' +
      '<span class="az-award__name">' + a.n + '</span>' +
      '<span class="az-award__proj">' + a.p + '</span>' +
      '</a></li>';
  }).join('');

  /* Wettbewerbe */
  var wettbewerbe = [
    { y: 2023, t: 'Entwicklung Areal ehemaliges Kriegsspital, Neu-Ulm', r: null },
    { y: 2023, t: 'Neubau Wirtschafts- und Betreuungsbereich Rommelkaserne, Dornstadt', r: null },
    { y: 2022, t: 'Neubau Wohnbebauung, Weißenhorn', r: null },
    { y: 2021, t: 'Bauliche Weiterentwicklung der Grundstücke Schweinemarkt 6-8, Ulm', r: null },
    { y: 2020, t: 'Nutzungskonzept eines neuen Stadtquartiers Entwicklung „Am Weinberg“, Ulm', r: null },
    { y: 2020, t: 'Mehrfachbeauftragung Wohnbebauung am Safranberg, Ulm', r: 2 },
    { y: 2020, t: 'Jahnsportpark Friedrichsau, Ulm', r: null },
    { y: 2019, t: 'Jörg-Syrlin-Grundschule und Astrid-Lindgren-Schule mit Kindergarten, Ulm', r: null },
    { y: 2019, t: 'Neubau Gemeindehaus Mater Dolorosa, Langenau', r: null },
    { y: 2019, t: 'Wohngebäude mit Café, Biberach', r: 3 },
    { y: 2019, t: 'Wohnungsbau, Balingen', r: null },
    { y: 2018, t: 'Neubau Kindertageseinrichtung Hauderboschen, Biberach', r: 5 },
    { y: 2018, t: 'Weiterentwicklung städtebauliches Gebiet in Ulm – Söflingen, Neubau mehrgeschossiges Wohngebäude', r: 2 },
    { y: 2018, t: 'Planungskonkurrenz zur Neugestaltung der Brüstung der Ludwig-Erhard-Brücke in Ulm', r: 2 },
    { y: 2018, t: 'Bürohaus mit Einzelhandel und Parken in der Konrad-Zuse-Straße 4+6, Ulm', r: 1 },
    { y: 2018, t: 'Städtebauliche Neuordnung des Areals „Söflinger-Straße – Magirusstraße – Griesgasse“, Ulm', r: null },
    { y: 2016, t: 'Erweiterung der Eichenplatz-Grundschule, Ulm', r: 1 },
    { y: 2016, t: 'Planungsgutachten „Mutterhaus St. Maria – St. Notburga“ in Untermarchtal', r: null },
    { y: 2015, t: 'Wohnen beim Wengenholz Ulm-Lehr', r: null },
    { y: 2015, t: 'Mehrfachbeauftragung Fassadengestaltung in der Reutlinger Straße 30-88, Ulm Wiblingen', r: null },
    { y: 2014, t: 'Mehrfachbeauftragung zur Neugestaltung der Grundstücke 246/17 und 246/49 südlich der Meininger Allee mit einer Wohn- und Gewerbebebauung, Neu-Ulm', r: null },
    { y: 2013, t: 'Wohnregal, Lönsstraße Neu-Ulm', r: null },
    { y: 2012, t: 'Mehrfachbeauftragung Wohnquartier am Lettenwald, Ulm', r: 1 },
    { y: 2012, t: 'Wohn- und Geschäftshaus auf dem Konzertsaal-Areal, Neu-Ulm', r: 2 },
    { y: 2012, t: 'Wohngebäude Sedanstraße, Ulm', r: 2 },
    { y: 2012, t: 'Neunutzung des Parkhauses an der Bronner Straße, Laupheim', r: null },
    { y: 2011, t: 'Büro-, Wohn- und Geschäftshaus Karpfengasse, Ulm', r: 1 },
    { y: 2010, t: '200 Jahre Neu-Ulm, Ausstellungsarchitektur der Jubiläumsausstellung', r: 1 },
    { y: 2010, t: 'Bürogebäude und Casino der Wilken GmbH, Ulm', r: 1 },
    { y: 2008, t: 'Infopunkt Citybahnhof, Ulm', r: 1, u: P },
    { y: 2007, t: 'Stegreif WITec Science Park, Ulm', r: 3 },
    { y: 2006, t: 'Nachverdichtung Donaubastion, Ulm', r: 3 },
    { y: 2005, t: 'Freiflächengestaltung Judenhof, Ulm', r: 'ankauf' },
    { y: 2005, t: 'Adel im Wandel – Ausstellungsgestaltung, Sigmaringen', r: 2, w: '(mit Braun-Engels Gestaltung)' },
    { y: 2003, t: 'Leitstelle der Saarländischen Vollzugspolizei, Saarbrücken', r: 1, w: '(mit Andreas Neureuther)' },
    { y: 2002, t: 'Gutachterverfahren Kindergarten Wiley – Süd, Neu-Ulm', r: 2 },
    { y: 2000, t: 'Neubau Pressehaus MOZ, Frankfurt/Oder', r: 1, w: '(mit hochstrasser, Bleiker GmbH)' },
    { y: 1999, t: 'Musikpavillon am Marktplatz, Ulm', r: 1 },
    { y: 1999, t: 'Gutachterverfahren Parkhaus Deutschhaus, Ulm', r: 1, w: '(mit hochstrasser, Bleiker GmbH)', u: P }
  ];

  var comps = document.getElementById('comps');
  var note = document.getElementById('compNote');
  function rang(r) { return r === null ? 'Teilnahme' : (r === 'ankauf' ? 'Ankauf' : r + '. Platz'); }

  comps.innerHTML = wettbewerbe.map(function (w) {
    var inner = w.t + (w.w ? ' <span class="az-comp__with">' + w.w + '</span>' : '');
    var titel = w.u
      ? '<a class="az-comp__title" href="' + w.u + '">' + inner + '</a>'
      : '<span class="az-comp__title">' + inner + '</span>';
    return '<li' + (w.r === 1 ? ' class="win"' : '') + '><div class="az-comp">' +
      '<span class="az-comp__year">' + w.y + '</span>' + titel +
      '<span class="az-comp__rank">' + rang(w.r) + '</span></div></li>';
  }).join('');
  note.textContent = wettbewerbe.length + ' Wettbewerbe';
})();
