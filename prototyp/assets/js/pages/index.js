/* Startseite: Projektkacheln, Aktuelles (Weiterschalten) */
(function () {
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

  /* Aktuelles: die zehn neuesten Meldungen der Live-Startseite (Slider), in Live-Reihenfolge.
     Titel = Überschrift des Slides, Teaser = Unterzeile (nur, wenn live vorhanden).
     Slides ohne Text: Titel aus der Bildaufschrift. Kategorie und Jahr aus Slide/Upload-Datum */
  var WP = 'assets/img/wp/';
  var NEWS = [
    { img: WP + 'Homepage-Banner_BDA.jpg', alt: 'Frank Scheer, Stefanie Geywitz und Michael Geitner, Schriftzug „BDA Berufung“',
      kind: 'Büro', year: '2026', title: 'BDA-Berufung' },
    { img: WP + 'Kornhaus-Kempten_0022.jpg', alt: 'Das umgebaute und modernisierte Kornhaus in Kempten',
      href: 'https://www.kempten.de/videogalerie-27976.html', ext: 1,
      kind: 'Fertigstellung', year: '2025', title: 'Fertigstellung Umbau und Modernisierung Kornhaus Kempten',
      desc: 'Wir gratulieren zur Eröffnung! Foto: Conné van d’Grachten' },
    { img: WP + 'Banner-baupysik_kompr.jpg', alt: 'Planungsbesprechung von oben, Schriftzug „neue kompetenzen: Energieberatung, thermische und akustische Bauphysik, Nachhaltigkeitszertifizierungen“',
      kind: 'Büro', year: '2025', title: 'Neue Kompetenzen' },
    { img: WP + 'aktuelles-Banner-Veraenderung_final-scaled.jpg', alt: 'Plakat „veränderung.“ zu 64 Jahren Büro: Haus K5 mit Stationen und Kompetenzen',
      href: 'https://hochstrasser.com/wp-content/uploads/2024/10/Plakat-Veraenderung_reduziert.pdf', ext: 1,
      kind: 'Büro', year: '2024', title: 'Veränderung' },
    { img: WP + 'NU-Schwabenstr_0025-scaled.jpg', alt: 'Die Wohnbebauung in Neu-Ulm', href: 'projekt-wohnbebauung-neu-ulm.html',
      kind: 'Fertigstellung', year: '2024', title: 'Fertigstellung: Wohnbebauung Neu-Ulm',
      desc: '→ Hier geht’s zum Beitrag' },
    { img: WP + 'Sedelhof-Passage-Ulm-Hbf_0005-scaled.jpg', alt: 'Die Fußgängerpassage am Ulmer Hauptbahnhof', href: 'projekt-flz-neuer-bau-ulm.html',
      kind: 'Projekt', year: '2024', title: 'Beitrag aktualisiert: Fußgängerpassage am Bahnhof',
      desc: '→ Hier geht’s zum Beitrag' },
    { img: WP + '842_landscape-Ostfluegel-scaled.jpg', alt: 'Der Ostflügel des sanierten ehemaligen Kriegsspitals in Neu-Ulm', href: 'projekt-kriegsspital-neu-ulm.html',
      kind: 'Fertigstellung', year: '2024', title: 'Fertigstellung ehemaliges Kriegsspital Neu-Ulm' },
    { img: WP + '799_lanscape-02-scaled.jpg', alt: 'Der BA3 Baubetriebshof der Stadt Ulm', href: 'projekt-ba3-baubetriebshof-ulm.html',
      kind: 'Fertigstellung', year: '2024', title: 'Fertigstellung BA3 Baubetriebshof der Stadt Ulm',
      desc: 'Foto: Conné van d’Grachten' },
    { img: WP + 'Banner-Phase-Nachaltigkeit.jpg', alt: 'Logo „Wir unterstützen die Phase Nachhaltigkeit“',
      kind: 'Büro', year: '2024', title: 'Phase Nachhaltigkeit' },
    { img: WP + '864_landscape_gurt2-mit-Logos-scaled.jpg', alt: 'Das Strohballenatelier Schrade mit den Logos der Hugo-Häring-Auszeichnung',
      href: 'https://www.xn--hugo-hring-preis-0nb.de/preistraeger/object/2680/-1/-1/-1/-1', ext: 1,
      kind: 'Auszeichnung', year: '2023', title: 'Strohballenatelier Schrade – Auszeichnung Hugo-Häring 2023',
      desc: 'Wir bauen ein Atelier! Foto: Conné van d’Grachten' }
  ];
  var VIS = 4; /* sichtbare Meldungen; die Pfeile schieben das Fenster im Kreis weiter */
  var media = document.getElementById('newsMedia');
  var img = document.getElementById('nImg');
  var feed = document.getElementById('newsFeed');
  var prev = document.getElementById('newsPrev');
  var next = document.getElementById('newsNext');
  if (feed && img && prev && next) {
    var N = NEWS.length, idx = 0, top = 0;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    var side = window.matchMedia('(min-width: 1200px)');
    feed.innerHTML = NEWS.map(function (n) {
      return '<li><a href="' + (n.href || '#') + '"' + (n.ext ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="idx-feed__title t-h4">' + n.title + '</span> ' +
        '<span class="idx-feed__kind t-label">' + n.kind + '</span> ' +
        '<span class="idx-feed__year t-label">' + n.year + '</span> ' +
        (n.desc ? '<span class="idx-feed__desc"><p>' + n.desc + '</p></span>' : '') + '</a></li>';
    }).join('');
    var items = Array.prototype.slice.call(feed.children);
    /* Fenster ab Meldung t (im Kreis), aktive Meldung i */
    var place = function (t, i) {
      for (var k = 0; k < N; k++) {
        var li = items[(t + k) % N];
        li.hidden = k >= VIS;
        feed.appendChild(li);
      }
      items.forEach(function (li, k) {
        li.classList.toggle('is-lead', k === i);
        if (k === i) li.setAttribute('aria-current', 'true'); else li.removeAttribute('aria-current');
      });
    };

    /* ab 1200 ist die Liste so hoch wie das Bild: für die aktive Meldung im jeweiligen Fenster
       Titelgröße (in 1px-Schritten bis 75 %) und Teaserzeilen suchen, mit denen sie hineinpasst –
       vorrangig mit vollem Teaser, sonst gekürzt, sonst ohne; jeweils mit dem größten Titel.
       Gemessen wird synchron ohne Übergänge (Ergebnis je Fenster gemerkt), danach ist wieder
       der bisherige Zustand aktiv, damit der Wechsel animiert */
    var fits = function () { return feed.scrollHeight <= feed.clientHeight; };
    var set = function (li, fs, lines) {
      li.style.setProperty('--lead-fs', fs + 'px');
      if (lines > 0 && lines < 99) li.style.setProperty('--desc-lines', lines);
      else li.style.removeProperty('--desc-lines');
      li.classList.toggle('no-desc', lines === 0);
    };
    var reset = function (li) {
      li.style.removeProperty('--lead-fs');
      li.style.removeProperty('--desc-lines');
      li.classList.remove('no-desc');
    };
    var size = function (li, r) { if (r) set(li, r[0], r[1]); else reset(li); };
    var measure = function (li) {
      reset(li);
      if (!side.matches || fits()) return null;
      var title = li.querySelector('.idx-feed__title');
      var p = li.querySelector('.idx-feed__desc>p');
      var max = Math.floor(parseFloat(getComputedStyle(title).fontSize));
      var all = 0;
      if (p) {
        var lh = parseFloat(getComputedStyle(p).lineHeight);
        all = Math.round((p.scrollHeight - parseFloat(getComputedStyle(p).paddingTop)) / lh);
      }
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
      return full || cut || none || [Math.ceil(max * 0.75), 0];
    };
    var fitted = {};
    var go = function (t, i) {
      var key = t + ':' + i;
      if (!(key in fitted)) {
        feed.classList.add('is-fitting');
        place(t, i);
        fitted[key] = measure(items[i]);
        place(top, idx);
        size(items[idx], fitted[top + ':' + idx]);
        void feed.offsetHeight;
        feed.classList.remove('is-fitting');
      }
      top = t; idx = i;
      place(t, i);
      size(items[i], fitted[key]);
    };
    var refit = function () {
      fitted = {};
      feed.classList.add('is-fitting');
      place(top, idx);
      fitted[top + ':' + idx] = measure(items[idx]);
      size(items[idx], fitted[top + ':' + idx]);
      void feed.offsetHeight;
      feed.classList.remove('is-fitting');
    };
    var queued = 0;
    var refitSoon = function () {
      if (queued) return;
      queued = requestAnimationFrame(function () { queued = 0; refit(); });
    };
    refit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refitSoon);
    window.addEventListener('resize', refitSoon);

    window.addEventListener('load', function () {
      refitSoon();
      NEWS.slice(1).forEach(function (n) { new Image().src = n.img; });
    });

    /* Pfeil runter: nächste Meldung, Pfeil hoch: vorherige (jeweils im Kreis). Verlässt die aktive
       Meldung das Fenster, rückt es um eine Meldung nach (unten bzw. oben) */
    var show = function (step) {
      var i = (idx + step + N) % N;
      var t = top;
      if ((i - top + N) % N >= VIS) t = step > 0 ? (i - VIS + 1 + N) % N : i;
      go(t, i);
      var n = NEWS[i];
      var paint = function () { img.src = n.img; img.alt = n.alt; };
      if (still.matches) { paint(); return; }
      media.classList.add('is-swapping');
      setTimeout(function () { paint(); media.classList.remove('is-swapping'); }, 340);
    };
    prev.addEventListener('click', function () { show(-1); });
    next.addEventListener('click', function () { show(1); });
  }
})();
