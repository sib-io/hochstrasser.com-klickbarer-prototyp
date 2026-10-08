/* Büro: Lebenslauf Adrian Hochstrasser als Pop-up (Klick aufs Porträt) */
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
