/* Auszeichnungen, Wettbewerbe und Publikationen – Daten der Listen auf buero.html
   (die eigenen Seiten Auszeichnungen und Publikationen entfallen, der Footer verlinkt auf die Büro-Anker) */
window.REFERENZEN = (function () {
  'use strict';
  /* Ziele laut Factory-Vertrag: Projekte -> FLZ-Detailseite, Einzel-Auszeichnungen -> # */
  var P = 'projekt-flz-neuer-bau-ulm.html';
  var N = '#';

  /* Auszeichnungen, chronologisch: y = Jahr, n = Name (HTML), p = Projekt, u = Ziel */
  var auszeichnungen = [
    { y: 2026, n: 'KlimaKulturKompetenz-Auszeichnung „Barrierefreiheit“, Bayerische Architektenkammer', p: 'Kornhaus, Kempten', u: N },
    { y: 2026, n: 'Beispielhaftes Bauen Alb-Donau-Kreis und Ulm <span class="nobr">2019–2026</span>', p: 'Parkhaus am Bahnhof, Ulm', u: N },
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

  /* Wettbewerbe: t = Titel, r = Platz (null = Teilnahme, 'ankauf' = Ankauf), w = Partner, u = Ziel */
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

  /* Projekte der Publikationsliste: Name, Ziel */
  var PROJ = {
    stroh: { n: 'Strohballenatelier', u: P },
    hfg: { n: 'HfG Ulm', u: P },
    k5: { n: 'K5', u: P },
    rathaus: { n: 'Parkhaus am Rathaus', u: P },
    hausb: { n: 'Haus B', u: P },
    golf: { n: 'New Golf Club Neu-Ulm', u: P },
    gbox: { n: 'Gesundheitsbox', u: P },
    flz: { n: 'FLZ der Saarl. Vollzugspolizei', u: P },
    leit: { n: 'Leitstelle der Saarländischen Vollzugspolizei', u: P },
    hausg: { n: 'Haus G', u: P },
    hoersaal: { n: 'Hörsaalgebäude Universität Ulm', u: P },
    deutschhaus: { n: 'Parkhaus Deutschhaus', u: P }
  };

  /* Inhalte der Bestandsseite (hochstrasser.com/publikationen), Schreibweise korrigiert.
     m = Medium, i = Ausgabe, p = Projekt, y = Jahr (null = ohne Jahresangabe) */
  var pubs = [
    { y: 2026, m: 'Stroh – Detail', i: '2026', p: 'stroh' },
    { y: 2019, m: 'Bauhandwerk BHW', i: '09/2019', p: 'k5' },
    { y: 2019, m: 'Patrick Filipaj | Architektonisches Potenzial von Dämmbeton', i: 'Ausgabe 2019', p: 'k5' },
    { y: 2019, m: 'Baukultur', i: '01/2019', p: 'golf' },
    { y: 2018, m: 'DBZ Deutsche Bauzeitschrift', i: '02/2018', p: 'k5' },
    { y: 2017, m: 'Architekturpreis Beton 2017', i: 'Projekte der engeren Wahl', p: 'k5' },
    { y: 2017, m: 'Architektur, Hugo-Häring-Auszeichnung 2017', i: '', p: 'k5' },
    { y: 2017, m: 'Green Code Magazin', i: 'Ausgabe 2017', p: 'golf' },
    { y: 2017, m: 'xia Intelligente Architektur', i: '10–12/2017', p: 'k5' },
    { y: 2017, m: 'Deutsches Ingenieurblatt', i: '05/2017', p: 'k5' },
    { y: 2017, m: 'Green Building', i: '02/2017', p: 'k5' },
    { y: 2017, m: 'betonBaukultur', i: '01/2017', p: 'k5' },
    { y: 2017, m: 'Green Tec', i: '2017', p: 'k5' },
    { y: 2016, m: 'Fassade – Technik und Architektur', i: '6/2016', p: 'k5' },
    { y: 2016, m: 'db Deutsche Bauzeitung', i: '09/2016', p: 'k5' },
    { y: 2015, m: 'Besser bauen, besser wohnen. Das 100-Ideen-Buch', i: 'Achim Linhardt, DVA 2015', p: null },
    { y: 2015, m: 'db Deutsche Bauzeitung', i: '01/2015', p: 'hfg' },
    { y: 2012, m: 'Fire, Crime & Accident', i: '2012', p: 'flz' },
    { y: 2011, m: 'Baumeister', i: '12/2011', p: 'hfg' },
    { y: 2011, m: 'Süddeutsche Zeitung', i: '22.11.2011', p: 'hfg' },
    { y: 2011, m: 'archithese', i: '5/2011', p: 'hfg' },
    { y: 2011, m: 'Bauwelt', i: '42/2011', p: 'hfg' },
    { y: 2011, m: 'Bauwelt', i: '11/2011', p: 'hfg' },
    { y: 2011, m: 'db Deutsche Bauzeitung', i: '03/2011', p: 'hfg' },
    { y: 2011, m: 'form', i: '239/2011', p: 'hfg' },
    { y: 2011, m: 'Südwestpresse', i: '02.08.2011', p: 'hfg' },
    { y: 2011, m: 'Stuttgarter Zeitung', i: '12.07.2011', p: 'hfg' },
    { y: 2011, m: 'art', i: '5/2011', p: 'hfg' },
    { y: 2011, m: 'Süddeutsche Zeitung', i: '15.04.2011', p: 'hfg' },
    { y: 2011, m: 'Baukultur', i: '4/2011', p: 'hfg' },
    { y: 2011, m: 'Denkmalpflege in Baden-Württemberg', i: '23.03.2011', p: 'hfg' },
    { y: 2011, m: 'Die Zeit', i: '10.03.2011', p: 'hfg' },
    { y: 2011, m: 'Augsburger Allgemeine', i: '10.03.2011', p: 'hfg' },
    { y: 2011, m: 'Schwäbische Zeitung', i: '07.03.2011', p: 'hfg' },
    { y: 2011, m: 'Stuttgarter Zeitung', i: '02.03.2011', p: 'hfg' },
    { y: 2011, m: 'Bauhaus – Die Zeitschrift der Stiftung Bauhaus Dessau', i: '03/2011', p: 'hfg' },
    { y: 2011, m: 'Südwestpresse', i: '21.02.2011', p: 'hfg' },
    { y: 2011, m: 'Schwäbische Zeitung', i: '18.02.2011', p: 'hfg' },
    { y: 2011, m: 'Bauhaus online', i: '20.01.2011', p: 'hfg' },
    { y: 2009, m: 'Südwestpresse', i: '23.07.2009', p: 'rathaus' },
    { y: 2007, m: 'Frankfurter Allgemeine Zeitung', i: '26.11.2007', p: 'rathaus' },
    { y: 2006, m: 'Süddeutsche Zeitung', i: '14.12.2006', p: 'rathaus' },
    { y: 2006, m: 'AW Architektur + Wettbewerbe', i: '03/2006', p: 'leit' },
    { y: 2005, m: 'Natürlich Holz', i: '2005', p: 'hausb' },
    { y: 2005, m: 'A&W Architektur & Wohnen Special', i: '05/2005', p: 'hausb' },
    { y: 2005, m: 'Schöner Wohnen', i: '05/2005', p: 'hausg' },
    { y: 2005, m: 'Event Partner', i: '03/2005', p: 'gbox' },
    { y: 2004, m: 'Schöner Wohnen', i: '11/2004', p: 'hausb' },
    { y: 2004, m: 'Large Format', i: '08/2004', p: 'gbox' },
    { y: 2003, m: 'Wettbewerbe aktuell', i: '12/2003', p: 'leit' },
    { y: 2002, m: 'Glasforum', i: '02/2002', p: 'deutschhaus' },
    { y: null, m: 'Betonfassaden im Thermowand-System', i: 'ohne Jahr', p: 'hoersaal' }
  ];

  return { auszeichnungen: auszeichnungen, wettbewerbe: wettbewerbe, publikationen: pubs, projekte: PROJ };
})();
