(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Wortmarke exakt auf die Satzbreite bringen */
  var word = document.getElementById('xpWord');
  function fitWord() {
    var inner = word && word.firstElementChild;
    if (!inner) return;
    var avail = word.clientWidth;
    if (!avail) return;
    word.style.fontSize = '100px';
    var w = inner.getBoundingClientRect().width;
    if (!w) return;
    word.style.fontSize = (100 * avail / w).toFixed(2) + 'px';
  }

  /* Gitterschrift so groß setzen, dass die längste Zeile bis in die letzte Spalte läuft */
  var rows = document.getElementById('xpRows');
  function fitGrid() {
    if (!rows) return;
    var avail = rows.clientWidth;
    if (!avail) return;
    for (var pass = 0; pass < 3; pass++) {
      var base = parseFloat(getComputedStyle(rows).fontSize);
      var left = rows.getBoundingClientRect().left;
      var max = 0;
      rows.querySelectorAll('.xp-row').forEach(function (r) {
        var last = r.lastElementChild;
        if (last) max = Math.max(max, last.getBoundingClientRect().right - left);
      });
      if (!max) return;
      var next = Math.min(base * (avail * 0.985) / max, avail * 0.115);
      rows.style.fontSize = next.toFixed(2) + 'px';
    }
  }

  function fitAll() { fitWord(); fitGrid(); }
  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
  var raf;
  window.addEventListener('resize', function () {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(fitAll);
  });

  /* wechselndes Quadratbild */
  var MOTIVE = [
    { src: 'assets/img/wp/842_landscape-01-scaled.jpg', alt: 'Ehemaliges Kriegsspital Neu-Ulm' },
    { src: 'assets/img/wp/NU-Schwabenstr_0025-scaled.jpg', alt: 'Wohnbebauung Neu-Ulm' },
    { src: 'assets/img/wp/799_lanscape-02-scaled.jpg', alt: 'Baubetriebshof der Stadt Ulm' },
    { src: 'assets/img/wp/744_landscape_Treppenhaus-3-scaled.jpg', alt: 'Treppenhaus Haus MK' },
    { src: 'assets/img/wp/14_landscape-1.jpg', alt: 'Erweiterung WITec' },
    { src: 'assets/img/wp/jobs-e1530280090729.jpg', alt: 'Rechenzentrum SWU' }
  ];
  var fig = document.getElementById('markFig');
  if (fig) {
    fig.innerHTML = MOTIVE.map(function (m, i) {
      return '<img src="' + m.src + '" alt="' + (i === 0 ? m.alt : '') + '"' +
        (i === 0 ? ' class="is-on"' : '') + (i > 0 ? ' loading="lazy"' : '') + '>';
    }).join('');
    var shots = Array.prototype.slice.call(fig.querySelectorAll('img'));
    var k = 0;
    if (!reduce && shots.length > 1) {
      setInterval(function () {
        shots[k].classList.remove('is-on'); shots[k].alt = '';
        k = (k + 1) % shots.length;
        shots[k].classList.add('is-on'); shots[k].alt = MOTIVE[k].alt;
      }, 3400);
    }
  }
})();
