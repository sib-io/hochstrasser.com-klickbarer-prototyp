/* Projektseiten: langer Kapiteltext (.prj-more) endet nach einigen Zeilen und läuft aus;
   „Mehr lesen“ klappt ihn auf, „Weniger lesen“ wieder zu. Kurze Texte bleiben ganz stehen.
   Ohne Skript ist der volle Text sichtbar. */
(function () {
  var LINES = 8;   // sichtbare Zeilen im zugeklappten Zustand
  var SPARE = 3;   // erst kürzen, wenn mindestens so viele Zeilen verborgen würden
  var boxes = Array.prototype.slice.call(document.querySelectorAll('.prj-more'));
  if (!boxes.length) return;

  function limit(box) {
    return Math.round(parseFloat(getComputedStyle(box).lineHeight) * LINES);
  }

  function label(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.firstChild.nodeValue = open ? 'Weniger lesen ' : 'Mehr lesen ';
    btn.lastChild.textContent = open ? '↑' : '↓';
  }

  function close(box, btn) {
    box.style.maxHeight = box.scrollHeight + 'px';
    box.offsetHeight; // Ausgangshöhe festhalten, damit der Übergang greift
    box.style.maxHeight = limit(box) + 'px';
    box.classList.add('is-closed');
    label(btn, false);
  }

  function open(box, btn) {
    box.style.maxHeight = box.scrollHeight + 'px';
    box.classList.remove('is-closed');
    label(btn, true);
  }

  boxes.forEach(function (box, i) {
    box.id = box.id || 'prj-more-' + (i + 1);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'link-arrow prj-more__btn';
    btn.setAttribute('aria-controls', box.id);
    btn.appendChild(document.createTextNode(''));
    var arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    btn.appendChild(arrow);
    btn.hidden = true;
    box.after(btn);

    btn.addEventListener('click', function () {
      if (box.classList.contains('is-closed')) {
        open(box, btn);
      } else {
        close(box, btn);
        // Textanfang wieder ins Bild holen, falls er beim Lesen nach oben gewandert ist
        var top = box.getBoundingClientRect().top;
        if (top < 0) window.scrollBy({ top: top - 120, behavior: 'smooth' });
      }
    });
    // nach dem Aufklappen keine feste Höhe behalten, damit der Text frei umbrechen kann
    box.addEventListener('transitionend', function (e) {
      if (e.target === box && e.propertyName === 'max-height' && !box.classList.contains('is-closed')) box.style.maxHeight = '';
    });
    // Tastatur: ein Link im verborgenen Teil klappt den Text auf
    box.addEventListener('focusin', function () { if (box.classList.contains('is-closed')) open(box, btn); });
    box.prjBtn = btn;
  });

  // je Breite neu entscheiden, ob gekürzt wird; aufgeklappte Texte bleiben offen
  function fit() {
    boxes.forEach(function (box) {
      var btn = box.prjBtn;
      if (btn.getAttribute('aria-expanded') === 'true') return;
      box.style.transition = 'none';
      box.style.maxHeight = '';
      box.classList.remove('is-closed');
      var lh = parseFloat(getComputedStyle(box).lineHeight);
      var long = box.scrollHeight > lh * (LINES + SPARE);
      btn.hidden = !long;
      if (long) {
        box.style.maxHeight = limit(box) + 'px';
        box.classList.add('is-closed');
        label(btn, false);
      }
      box.offsetHeight;
      box.style.transition = '';
    });
  }

  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  var queued = false, w = window.innerWidth;
  window.addEventListener('resize', function () {
    if (queued || window.innerWidth === w) return; // mobile Adressleiste ändert nur die Höhe
    queued = true;
    requestAnimationFrame(function () { queued = false; w = window.innerWidth; fit(); });
  });
})();
