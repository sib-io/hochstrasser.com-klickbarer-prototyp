/* Publikationen: chronologische Liste (Jahr | Medium | Ausgabe | Projekt), Daten: referenzen.js */
(function () {
  'use strict';
  var R = window.REFERENZEN;
  var PROJ = R.projekte;
  var pubs = R.publikationen;

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
