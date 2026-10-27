/* Film-Band: Timecode wie auf der Filmseite – tt:hh:mm:ss:ff bis zur Premiere
   (Di 15.12.2026, 19:00 Uhr, Stadthaus Ulm), 25 Bilder pro Sekunde */
(function () {
  var els = document.querySelectorAll('[data-tc]');
  if (!els.length) return;
  var premiere = new Date('2026-12-15T19:00:00+01:00').getTime();
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var p = function (n) { return String(n).padStart(2, '0'); };
  function tick() {
    var ms = Math.max(0, premiere - Date.now());
    var d = Math.floor(ms / 864e5); ms -= d * 864e5;
    var h = Math.floor(ms / 36e5); ms -= h * 36e5;
    var m = Math.floor(ms / 6e4); ms -= m * 6e4;
    var s = Math.floor(ms / 1e3); ms -= s * 1e3;
    var f = reduce ? 0 : Math.floor(ms / 40);
    var t = [d, h, m, s, f].map(p).join(':');
    els.forEach(function (e) { e.textContent = t; });
  }
  tick();
  setInterval(tick, reduce ? 1000 : 40);
})();
