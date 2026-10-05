/* Startseite: Projektkacheln, Aktuelles (Weiterschalten), Team-Namen bei Hover */
(function () {
  var IMG = {
    a: 'assets/img/wp/842_landscape-01-scaled.jpg',
    b: 'assets/img/wp/NU-Schwabenstr_0025-scaled.jpg',
    c: 'assets/img/wp/799_lanscape-02-scaled.jpg',
    d: 'assets/img/wp/744_landscape_Treppenhaus-3-scaled.jpg',
    e: 'assets/img/wp/14_landscape-1.jpg',
    f: 'assets/img/wp/jobs-e1530280090729.jpg'
  };
  var P = [
    { t: 'Wohnbebauung Neu-Ulm', y: 2024, aw: 0, i: 'b' },
    { t: 'Kriegsspital Neu-Ulm', y: 2024, aw: 0, i: 'a' },
    { t: 'BA3 Baubetriebshof der Stadt Ulm', y: 2024, aw: 0, i: 'c' },
    { t: 'Wohnbebauung Laichingen', y: 2024, aw: 0, i: 'e' },
    { t: 'Fassadenvarianten Wärmespeicher HKW', y: 2023, aw: 0, i: 'c' },
    { t: 'Rechenzentrum SWU', y: 2023, aw: 0, i: 'f' },
    { t: 'Erweiterung WITec', y: 2023, aw: 0, i: 'e' },
    { t: 'Friesenhofen – An der Sägemühle', y: 2023, aw: 0, i: 'b' },
    { t: 'WBW ehemaliges Kriegsspital', y: 2023, aw: 0, i: 'a' },
    { t: 'Haus MK', y: 2023, aw: 0, i: 'd' },
    { t: 'WBW Betreuungs- und Verpflegungsgebäude', y: 2023, aw: 0, i: 'f' },
    { t: 'Strohballenatelier', y: 2022, aw: 1, i: 'e' },
    { t: 'Hubschrauberdachlandeplatz BWK', y: 2022, aw: 0, i: 'c' },
    { t: 'WBW Wohnbebauung Weißenhorn', y: 2022, aw: 0, i: 'b' },
    { t: 'Haus S4', y: 2022, aw: 0, i: 'd' },
    { t: 'Parkhaus am Bahnhof und Fußgängerpassage', y: 2022, aw: 0, i: 'f' }
  ];
  /* Projekte mit eigener Detailseite (projektseiten.js) bekommen Link und Kachelbild,
     alle übrigen führen auf die Beispielseite FLZ */
  var PS = window.PROJEKTSEITEN || {};
  var tiles = document.getElementById('tiles');
  if (tiles) {
    tiles.innerHTML = P.map(function (p) {
      var s = PS[p.t];
      return '<a class="tile" href="' + (s ? s.href : 'projekt-flz-neuer-bau-ulm.html') + '">' +
        '<img src="' + (s ? s.img : IMG[p.i]) + '" alt="' + p.t + '" loading="lazy">' +
        ' <div class="tile__cap"><span class="tile__title">' + p.t +
        (p.aw ? '<span class="tile__star" title="Ausgezeichnet"></span>' : '') +
        '</span> <span class="tile__year">' + p.y + '</span></div></a>';
    }).join('');
  }

  /* Aktuelles: feste Reihenfolge; Klick auf den Pfeil schaltet Bild und Meldung weiter */
  var PH = 'Platzhalter – Bild zur Meldung folgt';
  var NEWS = [
    { img: IMG.a, alt: 'Das sanierte ehemalige Kriegsspital in Neu-Ulm mit Backsteinfassade', href: 'projekt-kriegsspital-neu-ulm.html',
      kind: 'Fertigstellung', year: '2024', title: 'Ehemaliges Kriegsspital Neu-Ulm',
      desc: 'Umbau und Sanierung eines Baudenkmals. Zwei Bauabschnitte, fertiggestellt im laufenden Betrieb.' },
    { img: IMG.d, alt: PH, kind: 'Fertigstellung', year: '2025',
      title: 'Umbau und Modernisierung Kornhaus Kempten — Wir gratulieren zur Eröffnung',
      desc: 'Umbau und Modernisierung des Kornhauses in Kempten. Das Haus ist eröffnet.' },
    { img: IMG.e, alt: PH, kind: 'Auszeichnung', year: '2023',
      title: 'Strohballenatelier Schrade — Auszeichnung Hugo-Häring',
      desc: 'Das Strohballenatelier wurde mit der Auszeichnung Hugo-Häring gewürdigt.' },
    { img: IMG.f, alt: PH, kind: 'Büro', year: '2023',
      title: 'Wir beteiligen uns an der Initiative Phase Nachhaltigkeit',
      desc: 'Das Büro ist Teil der Initiative Phase Nachhaltigkeit.' },
    { img: IMG.c, alt: PH, kind: 'Beitrag', year: '2024',
      title: 'Beitrag aktualisiert: Fußgängerpassage am Bahnhof',
      desc: 'Der Beitrag zur Fußgängerpassage am Bahnhof wurde aktualisiert.' }
  ];
  var media = document.getElementById('newsMedia');
  var img = document.getElementById('nImg');
  var feed = document.getElementById('newsFeed');
  var next = document.getElementById('newsNext');
  if (feed && img && next) {
    var idx = 0;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    feed.innerHTML = NEWS.map(function (n, i) {
      return '<li' + (i === 0 ? ' class="is-lead" aria-current="true"' : '') + '><a href="' + (n.href || '#') + '">' +
        '<span class="idx-feed__title t-h4">' + n.title + '</span> ' +
        '<span class="idx-feed__kind t-label">' + n.kind + '</span> ' +
        '<span class="idx-feed__year t-label">' + n.year + '</span> ' +
        '<span class="idx-feed__desc"><p>' + n.desc + '</p></span></a></li>';
    }).join('');
    var items = Array.prototype.slice.call(feed.children);
    window.addEventListener('load', function () {
      NEWS.slice(1).forEach(function (n) { new Image().src = n.img; });
    });
    next.addEventListener('click', function () {
      items[idx].classList.remove('is-lead');
      items[idx].removeAttribute('aria-current');
      idx = (idx + 1) % NEWS.length;
      items[idx].classList.add('is-lead');
      items[idx].setAttribute('aria-current', 'true');
      var n = NEWS[idx];
      var paint = function () { img.src = n.img; img.alt = n.alt; };
      if (still.matches) { paint(); return; }
      media.classList.add('is-swapping');
      setTimeout(function () { paint(); media.classList.remove('is-swapping'); }, 340);
    });
  }

  /* Team: Name bei Hover/Fokus */
  var crew = document.getElementById('crew');
  var crewName = document.getElementById('crewName');
  if (crew && crewName) {
    var base = crewName.textContent;
    var show = function (e) {
      var f = e.target.closest('.idx-face');
      if (f) crewName.textContent = f.getAttribute('data-name');
    };
    var reset = function () { crewName.textContent = base; };
    crew.addEventListener('mouseover', show);
    crew.addEventListener('focusin', show);
    crew.addEventListener('click', show);
    crew.addEventListener('mouseleave', reset);
    crew.addEventListener('focusout', reset);
  }
})();
