/* Büro: Lebenslauf Adrian Hochstrasser als Pop-up (Klick aufs Porträt);
   Auszeichnungen, Wettbewerbe und Publikationen als kompakte Listen (Daten: referenzen.js) */
(function () {
  var dlg = document.getElementById('cvAdrian');
  var open = document.querySelector('.buero-person__open');
  if (!dlg || !open || typeof dlg.showModal !== 'function') return;
  open.addEventListener('click', function () { dlg.showModal(); });
  dlg.querySelector('.buero-cv__close').addEventListener('click', function () { dlg.close(); });
  /* Klick auf den abgedunkelten Hintergrund schließt ebenfalls */
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () { open.focus(); });
})();

(function () {
  var R = window.REFERENZEN;
  if (!R) return;
  var esc = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  /* eine Zeile je Eintrag: Jahr | Text (Publikationen wie live ohne Jahr), Zusatzangaben nach dem Gedankenstrich */
  function zeile(y, text) {
    return '<li><span class="buero-list__year">' + (y || 'o. J.') + '</span><span>' + text + '</span></li>';
  }
  function zeileOhneJahr(text) { return '<li><span>' + text + '</span></li>'; }
  function meta(t) { return ' <span class="buero-list__meta">– ' + t + '</span>'; }
  function link(u, t) { return '<a href="' + u + '">' + t + '</a>'; }
  function fuellen(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  fuellen('bueroAuszeichnungen', R.auszeichnungen.map(function (a) {
    return zeile(a.y, a.n + meta(link(a.u, a.p)));
  }).join(''));

  /* Teilnahmen ohne Platzierung wie live ohne Zusatz */
  fuellen('bueroWettbewerbe', R.wettbewerbe.map(function (w) {
    var rang = w.r === null ? '' : (w.r === 'ankauf' ? 'Ankauf' : w.r + '.&nbsp;Platz');
    var zusatz = [rang, w.w].filter(Boolean).join(' ');
    return zeile(w.y, (w.u ? link(w.u, w.t) : w.t) + (zusatz ? meta(zusatz) : ''));
  }).join(''));

  fuellen('bueroPublikationen', R.publikationen.map(function (x) {
    var titel = esc(x.m) + (x.i ? ', ' + esc(x.i) : '');
    var pr = x.p ? meta(link(R.projekte[x.p].u, esc(R.projekte[x.p].n))) : '';
    return zeileOhneJahr(titel + pr);
  }).join(''));
})();
