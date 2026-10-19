(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Gitterschrift so groß setzen, dass die längste Zeile etwa vier Fünftel der Breite füllt */
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
      var next = Math.min(base * (avail * 0.8) / max, avail * 0.09);
      rows.style.fontSize = next.toFixed(2) + 'px';
    }
  }

  function fitAll() { fitGrid(); }
  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
  var raf;
  window.addEventListener('resize', function () {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(fitAll);
  });

  /* wechselndes Quadratbild (farbig, etwa alle 1,6 s): echte Projektfotos als Farbverlauf
     Orange → Ziegelrot → Holz → Gold → Grün → Glasgrün → Grau → Weiß, Detail und Ansicht im Wechsel.
     pos = Bildausschnitt im Quadrat (object-position) */
  var MOTIVE = [
    { src: 'assets/img/wohnbebauung-neu-ulm/NU-Schwabenstr_0037-scaled.jpg', pos: '50% 50%', alt: 'Wohnbebauung Neu-Ulm: orangefarbener Putz und Streckmetallbrüstung' },
    { src: 'assets/img/kriegsspital-neu-ulm/842_potrait-detail-Schiessscharte-scaled.jpg', pos: '50% 50%', alt: 'Kriegsspital Neu-Ulm: Ziegelmauer mit Schießscharte' },
    { src: 'assets/img/haus-mk/744_portrait_Treppenhaus-1-scaled.jpg', pos: '50% 40%', alt: 'Haus MK: Treppenhaus mit Holzgeländer' },
    { src: 'assets/img/ba3-baubetriebshof-ulm/799_lanscape-05-scaled.jpg', pos: '30% 50%', alt: 'BA3 Baubetriebshof der Stadt Ulm: Holzlamellen der Fassade' },
    { src: 'assets/img/strohballenatelier/atelier-innenraum.jpg', pos: '40% 50%', alt: 'Strohballenatelier: Innenraum mit Holztragwerk' },
    { src: 'assets/img/flz/02_header-23.jpg', pos: '30% 50%', alt: 'FLZ im „Neuen Bau“ Ulm: Gewölbe mit goldenen Wandflächen' },
    { src: 'assets/img/friesenhofen-saegemuehle/784_square_500x500_acf_cropped.jpg', pos: '50% 50%', alt: 'Friesenhofen – An der Sägemühle: Häuser am Bachlauf' },
    { src: 'assets/img/wohnbebauung-laichingen/773_square_500x500_acf_cropped.jpg', pos: '50% 50%', alt: 'Wohnbebauung Laichingen: Glasfassade des Treppenhauses' },
    { src: 'assets/img/wohnbebauung-laichingen/773_Haus-A-C_TG-Abfahrt.jpg', pos: '35% 50%', alt: 'Wohnbebauung Laichingen: Haus A bis C mit Tiefgaragenabfahrt' },
    { src: 'assets/img/erweiterung-witec/757_portrait_Auskragung-Ecke-scaled.jpg', pos: '50% 30%', alt: 'Erweiterung WITec: auskragende Gebäudeecke' },
    { src: 'assets/img/rechenzentrum-swu/825_square-01_500x500_acf_cropped.jpg', pos: '50% 50%', alt: 'Rechenzentrum SWU: Sichtbeton und Metallfassade' },
    { src: 'assets/img/wohnbebauung-lettenwald/01_squared.jpg', pos: '50% 50%', alt: 'Wohnbebauung Lettenwald: weiße Baukörper vor blauem Himmel' }
  ];
  var fig = document.getElementById('markFig');
  if (fig) {
    fig.innerHTML = MOTIVE.map(function (m, i) {
      return '<img src="' + m.src + '" alt="' + (i === 0 ? m.alt : '') + '" style="object-position:' + m.pos + '"' +
        (i === 0 ? ' class="is-on"' : '') + (i > 0 ? ' loading="lazy"' : '') + '>';
    }).join('');
    var shots = Array.prototype.slice.call(fig.querySelectorAll('img'));
    var k = 0;
    if (!reduce && shots.length > 1) {
      setInterval(function () {
        shots[k].classList.remove('is-on'); shots[k].alt = '';
        k = (k + 1) % shots.length;
        shots[k].classList.add('is-on'); shots[k].alt = MOTIVE[k].alt;
      }, 1600);
    }
  }
})();
