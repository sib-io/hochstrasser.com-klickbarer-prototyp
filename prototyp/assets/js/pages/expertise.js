/* ============================================================
   Expertise-Unterseiten – gemeinsame Interaktion
   ------------------------------------------------------------
   Expertise.drawPanel({ root, data, initial })

   Zeichnung mit auswählbaren Knoten + Chips (mobil) + Panel.
   Markup-Vertrag (siehe assets/css/pages/expertise.css, Modul 7):
     root            Element oder Selektor der Sektion
     .x-draw         enthält .x-node[data-k]  (role=button, tabindex=0)
     .x-chips        enthält button.chip[data-k]
     .x-panel        enthält Felder mit [data-f="<feld>"]
   data:    { <k>: { <feld>: 'Text', … }, … }
   initial: Schlüssel der zu Beginn gewählten Variante
   Script erst nach dem Markup einbinden (am Seitenende).
   ============================================================ */
(function () {
  'use strict';
  window.Expertise = window.Expertise || {};

  Expertise.drawPanel = function (opts) {
    var root = typeof opts.root === 'string' ? document.querySelector(opts.root) : opts.root;
    if (!root) return;
    var data = opts.data;
    var draw = root.querySelector('.x-draw');
    var nodes = Array.prototype.slice.call(root.querySelectorAll('.x-node'));
    var chips = Array.prototype.slice.call(root.querySelectorAll('.x-chips .chip'));
    var panel = root.querySelector('.x-panel');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = null;

    function paint(key) {
      var d = data[key];
      panel.querySelectorAll('[data-f]').forEach(function (el) {
        var f = el.getAttribute('data-f');
        if (d[f] !== undefined) el.textContent = d[f];
      });
    }
    function mark(key) {
      nodes.forEach(function (n) {
        var on = n.getAttribute('data-k') === key;
        n.classList.toggle('is-on', on);
        n.setAttribute('aria-pressed', String(on));
      });
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c.getAttribute('data-k') === key));
      });
    }
    function select(key) {
      if (key === current) return;
      current = key;
      mark(key);
      if (reduce) { paint(key); return; }
      panel.classList.add('is-fading');
      setTimeout(function () { paint(key); panel.classList.remove('is-fading'); }, 220);
    }

    nodes.concat(chips).forEach(function (el) {
      el.addEventListener('click', function () { select(el.getAttribute('data-k')); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(el.getAttribute('data-k')); }
      });
    });

    if (draw) draw.classList.add('has-on');
    current = opts.initial;
    mark(current);
    paint(current);
  };
})();
