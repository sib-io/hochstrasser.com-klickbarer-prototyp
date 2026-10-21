/* Publikationen: chronologische Liste (Jahr | Medium | Ausgabe | Projekt) */
(function () {
  'use strict';
  /* Projekte ohne eigene Detailseite -> Beispielseite (Factory-Vertrag) */
  var P = 'projekt-flz-neuer-bau-ulm.html';

  /* Projekte: Name, Ziel */
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

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  /* Liste */
  var last;
  document.getElementById('list').innerHTML = pubs.map(function (x, n) {
    var yr = x.y === last ? '' : (x.y || 'o. J.');
    last = x.y;
    var pr = x.p ? '<a href="' + PROJ[x.p].u + '">' + esc(PROJ[x.p].n) + '</a>' : '';
    return '<li data-p="' + (x.p || '') + '" data-y="' + (x.y || '') + '"><div class="pb-row" id="pub-' + n + '">' +
      '<span class="pb-row__year">' + yr + '</span>' +
      '<span class="pb-row__medium">' + esc(x.m) + '</span>' +
      '<span class="pb-row__issue">' + esc(x.i) + '</span>' +
      '<span class="pb-row__proj">' + pr + '</span></div></li>';
  }).join('');
})();
