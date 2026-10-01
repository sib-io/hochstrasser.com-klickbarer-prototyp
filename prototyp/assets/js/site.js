/* hochstrasser. — gemeinsames Verhalten aller Seiten:
   Menü-Overlay, Einblenden beim Scrollen, Prototyp-Hinweise. */
(function () {
  'use strict';

  /* Menü-Overlay (mobil) */
  var btn = document.getElementById('menuBtn');
  var sheet = document.getElementById('sheet');
  var closeBtn = document.getElementById('menuClose');
  if (btn && sheet && closeBtn) {
    var open = function () {
      sheet.hidden = false;
      requestAnimationFrame(function () { sheet.setAttribute('data-open', ''); });
      btn.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    };
    var shut = function () {
      sheet.removeAttribute('data-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
      setTimeout(function () { sheet.hidden = true; }, 480);
    };
    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', shut);
    sheet.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', shut); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) shut(); });
  }

  /* Prototyp-Leiste: offene Punkte ein- und ausblenden */
  var tgl = document.getElementById('notesToggle');
  if (tgl) {
    tgl.addEventListener('click', function () {
      var on = document.body.classList.toggle('show-notes');
      tgl.setAttribute('aria-pressed', String(on));
      tgl.textContent = on ? 'Offene Punkte ausblenden' : 'Offene Punkte einblenden';
    });
  }

  /* Einblenden beim Scrollen */
  var items = document.querySelectorAll('.rv');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
