/* Auszeichnungen: Auszeichnungs- und Wettbewerbsliste (Daten: referenzen.js) */
(function () {
  'use strict';
  var R = window.REFERENZEN;
  var awards = R.auszeichnungen;
  var wettbewerbe = R.wettbewerbe;

  /* Jahr nur in der ersten Zeile eines Jahrgangs (wie Publikationen) */
  var last;
  function jahr(y) { var t = y === last ? '' : y; last = y; return t; }

  document.getElementById('awards').innerHTML = awards.map(function (a) {
    return '<li><div class="az-award">' +
      '<span class="az-award__year">' + jahr(a.y) + '</span>' +
      '<span class="az-award__name">' + a.n + '</span>' +
      '<span class="az-award__proj"><a href="' + a.u + '">' + a.p + '</a></span>' +
      '</div></li>';
  }).join('');

  /* Wettbewerbe */
  var comps = document.getElementById('comps');
  var note = document.getElementById('compNote');
  function rang(r) { return r === null ? 'Teilnahme' : (r === 'ankauf' ? 'Ankauf' : r + '. Platz'); }

  last = null;
  comps.innerHTML = wettbewerbe.map(function (w) {
    var inner = w.t + (w.w ? ' <span class="az-comp__with">' + w.w + '</span>' : '');
    var titel = w.u
      ? '<a class="az-comp__title" href="' + w.u + '">' + inner + '</a>'
      : '<span class="az-comp__title">' + inner + '</span>';
    return '<li' + (w.r === 1 ? ' class="win"' : '') + '><div class="az-comp">' +
      '<span class="az-comp__year">' + jahr(w.y) + '</span>' + titel +
      '<span class="az-comp__rank">' + rang(w.r) + '</span></div></li>';
  }).join('');
  note.textContent = wettbewerbe.length + ' Wettbewerbe';
})();
