/* Leitbild (Profil, Büro) als Akkordeon: beim Scrollen öffnet sich der Wert, der gerade in der
   Bildschirmmitte steht; ein Klick wählt direkt (und hat kurz Vorrang vor dem Scrollen) bzw. klappt
   den offenen Wert wieder zu – der bleibt dann zu, bis er wieder angeklickt wird */
(function () {
  var box = document.getElementById('leitbild');
  if (!box) return;
  var items = Array.prototype.slice.call(box.querySelectorAll('.leitbild-acc__item'));
  var locked = 0;
  var shut = [];
  function open(i) {
    items.forEach(function (it, k) {
      it.classList.toggle('is-on', k === i);
      it.querySelector('.leitbild-acc__btn').setAttribute('aria-expanded', String(k === i));
    });
  }
  items.forEach(function (it, i) {
    it.querySelector('.leitbild-acc__btn').addEventListener('click', function () {
      shut[i] = it.classList.contains('is-on');
      open(shut[i] ? -1 : i);
      locked = Date.now();
    });
  });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    if (Date.now() - locked < 1200) return;
    es.forEach(function (e) { var i = items.indexOf(e.target); if (e.isIntersecting && !shut[i]) open(i); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  items.forEach(function (it) { io.observe(it); });
})();
