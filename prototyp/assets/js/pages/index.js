/* Startseite: Projektkacheln, Aktuelles (Weiterschalten) */
(function () {
  var IMG = {
    a: 'assets/img/wp/842_landscape-01-scaled.jpg',
    b: 'assets/img/wp/NU-Schwabenstr_0025-scaled.jpg',
    c: 'assets/img/wp/799_lanscape-02-scaled.jpg',
    d: 'assets/img/wp/744_landscape_Treppenhaus-3-scaled.jpg',
    e: 'assets/img/wp/14_landscape-1.jpg',
    f: 'assets/img/wp/jobs-e1530280090729.jpg'
  };
  /* Reihenfolge und Auswahl festgelegt; img = Kachelbild der Live-Seite,
     Projekte mit Detailseite holen Link und Bild aus projektseiten.js */
  var P = [
    { t: 'Zentrum für Gestaltung HFG Ulm', y: 2011, aw: 0, img: 'assets/img/hfg-ulm/01_2_squared.jpg' },
    { t: 'Parkhaus am Rathaus', y: 2009, aw: 1, img: 'assets/img/parkhaus-am-rathaus/01_square_500x500_acf_cropped.jpg' },
    { t: 'Bootshaus Ulm', y: 2013, aw: 0, img: 'assets/img/bootshaus-ulm/01_2_squared-2_500x500_acf_cropped.jpg' },
    { t: 'FLZ im „Neuen Bau“ Ulm', y: 2017, aw: 0 },
    { t: 'Friesenhofen – An der Sägemühle', y: 2023, aw: 0 },
    { t: 'K5', y: 2016, aw: 1, img: 'assets/img/k5/01_squared_500x500_acf_cropped-2.jpg' },
    { t: 'BA3 Baubetriebshof der Stadt Ulm', y: 2024, aw: 0 },
    { t: 'Sanierung VH Ulm', y: 2013, aw: 1, img: 'assets/img/sanierung-vh-ulm/01_2_squared.jpg' },
    { t: 'Haus MK', y: 2023, aw: 0 },
    { t: 'Infopunkt Citybahnhof', y: 2005, aw: 0, img: 'assets/img/infopunkt-citybahnhof/01_2_squared-3_500x500_acf_cropped.jpg' },
    { t: 'Hubschrauberdachlandeplatz BWK', y: 2022, aw: 0, img: 'assets/img/hubschrauberdachlandeplatz-bwk/624_square_Plattform-1_500x500_acf_cropped.jpg' },
    { t: 'Strohballenatelier', y: 2022, aw: 1, img: 'assets/img/strohballenatelier/864_square_aussen_500x500_acf_cropped.jpg' },
    { t: 'Wohnbebauung Lettenwald', y: 2010, aw: 0, img: 'assets/img/wohnbebauung-lettenwald/01_squared.jpg' },
    { t: 'Kriegsspital Neu-Ulm', y: 2024, aw: 0 },
    { t: 'Gesundheitsbox', y: 2002, aw: 0, img: 'assets/img/gesundheitsbox/01_2_squared-1_500x500_acf_cropped-5.jpg' },
    { t: 'Parkhaus am Bahnhof und Fußgängerpassage', y: 2022, aw: 0, img: 'assets/img/parkhaus-am-bahnhof/502_square-Kunst-2_500x500_acf_cropped.jpg' }
  ];


  /* Projekte mit eigener Detailseite (projektseiten.js) bekommen Link und Kachelbild,
     alle übrigen führen auf die Beispielseite FLZ */
  var PS = window.PROJEKTSEITEN || {};
  var tiles = document.getElementById('tiles');
  if (tiles) {
    tiles.innerHTML = P.map(function (p) {
      var s = PS[p.t];
      return '<a class="tile" href="' + (s ? s.href : 'projekt-flz-neuer-bau-ulm.html') + '">' +
        '<img src="' + (s ? s.img : p.img) + '" alt="' + p.t + '" loading="lazy">' +
        ' <div class="tile__cap"><span class="tile__title">' + p.t +
        (p.aw ? '<span class="tile__star" title="Ausgezeichnet"></span>' : '') +
        '</span> <span class="tile__year">' + p.y + '</span></div></a>';
    }).join('');
  }

  /* Aktuelles: feste Reihenfolge; die Pfeile schalten Bild und Meldung vor und zurück */
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
      desc: 'Das Büro ist Teil der Initiative Phase Nachhaltigkeit.' }
  ];
  var media = document.getElementById('newsMedia');
  var img = document.getElementById('nImg');
  var feed = document.getElementById('newsFeed');
  var prev = document.getElementById('newsPrev');
  var next = document.getElementById('newsNext');
  if (feed && img && prev && next) {
    var idx = 0;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    var side = window.matchMedia('(min-width: 1200px)');
    feed.innerHTML = NEWS.map(function (n, i) {
      return '<li' + (i === 0 ? ' class="is-lead" aria-current="true"' : '') + '><a href="' + (n.href || '#') + '">' +
        '<span class="idx-feed__title t-h4">' + n.title + '</span> ' +
        '<span class="idx-feed__kind t-label">' + n.kind + '</span> ' +
        '<span class="idx-feed__year t-label">' + n.year + '</span> ' +
        '<span class="idx-feed__desc"><p>' + n.desc + '</p></span></a></li>';
    }).join('');
    var items = Array.prototype.slice.call(feed.children);
    var lead = function (i) {
      items.forEach(function (li, k) { li.classList.toggle('is-lead', k === i); });
    };

    /* ab 1200 ist die Liste so hoch wie das Bild: je Meldung Titelgröße (in 1px-Schritten
       bis 75 %) und Teaserzeilen suchen, mit denen sie als aktive Meldung hineinpasst –
       vorrangig mit vollem Teaser, sonst gekürzt, sonst ohne; jeweils mit dem größten Titel.
       Gemessen wird synchron ohne Übergänge, danach ist wieder die aktuelle Meldung aktiv */
    var fits = function () { return feed.scrollHeight <= feed.clientHeight; };
    var set = function (li, fs, lines) {
      li.style.setProperty('--lead-fs', fs + 'px');
      if (lines > 0 && lines < 99) li.style.setProperty('--desc-lines', lines);
      else li.style.removeProperty('--desc-lines');
      li.classList.toggle('no-desc', lines === 0);
    };
    var fit = function () {
      items.forEach(function (li) {
        li.style.removeProperty('--lead-fs');
        li.style.removeProperty('--desc-lines');
        li.classList.remove('no-desc');
      });
      if (!side.matches) return;
      feed.classList.add('is-fitting');
      items.forEach(function (li, i) {
        lead(i);
        if (fits()) return;
        var title = li.querySelector('.idx-feed__title');
        var p = li.querySelector('.idx-feed__desc>p');
        var max = Math.floor(parseFloat(getComputedStyle(title).fontSize));
        var lh = parseFloat(getComputedStyle(p).lineHeight);
        var all = Math.round((p.scrollHeight - parseFloat(getComputedStyle(p).paddingTop)) / lh);
        var full, cut, none;
        for (var fs = max; fs >= Math.ceil(max * 0.75) && !full; fs--) {
          for (var lines = all; lines >= 0; lines--) {
            set(li, fs, lines === all ? 99 : lines);
            if (fits()) break;
          }
          if (lines === all) full = [fs, 99];
          else if (lines > 0 && !cut) cut = [fs, lines];
          else if (lines === 0 && !none) none = [fs, 0];
        }
        var pick = full || cut || none || [Math.ceil(max * 0.75), 0];
        set(li, pick[0], pick[1]);
      });
      lead(idx);
      void feed.offsetHeight;
      feed.classList.remove('is-fitting');
    };
    var queued = 0;
    var refit = function () {
      if (queued) return;
      queued = requestAnimationFrame(function () { queued = 0; fit(); });
    };
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
    window.addEventListener('resize', refit);

    window.addEventListener('load', function () {
      refit();
      NEWS.slice(1).forEach(function (n) { new Image().src = n.img; });
    });

    /* Pfeil runter: nächste Meldung, Pfeil hoch: vorherige (jeweils im Kreis) */
    var show = function (step) {
      items[idx].removeAttribute('aria-current');
      idx = (idx + step + NEWS.length) % NEWS.length;
      lead(idx);
      items[idx].setAttribute('aria-current', 'true');
      var n = NEWS[idx];
      var paint = function () { img.src = n.img; img.alt = n.alt; };
      if (still.matches) { paint(); return; }
      media.classList.add('is-swapping');
      setTimeout(function () { paint(); media.classList.remove('is-swapping'); }, 340);
    };
    prev.addEventListener('click', function () { show(-1); });
    next.addEventListener('click', function () { show(1); });
  }
})();
