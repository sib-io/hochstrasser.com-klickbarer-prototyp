/* Startseite: Projektkacheln, Aktuelles (Weiterschalten) */
(function () {
  /* Reihenfolge und Auswahl festgelegt; img = Kachelbild der Live-Seite,
     Projekte mit Detailseite holen Link und Bild aus projektseiten.js */
  var P = [
    { t: 'Zentrum für Gestaltung HFG Ulm', y: 2011, aw: 0, img: 'assets/img/hfg-ulm/01_2_squared.jpg' },
    { t: 'Parkhaus am Rathaus', y: 2009, aw: 1, img: 'assets/img/parkhaus-am-rathaus/01_square_500x500_acf_cropped.jpg' },
    { t: 'K5', y: 2016, aw: 1, img: 'assets/img/k5/01_squared_500x500_acf_cropped-2.jpg' },
    { t: 'FLZ im „Neuen Bau“ Ulm', y: 2017, aw: 0 },
    { t: 'Strohballenatelier', y: 2022, aw: 1, img: 'assets/img/strohballenatelier/864_square_aussen_500x500_acf_cropped.jpg' },
    { t: 'Hubschrauberdachlandeplatz BWK', y: 2022, aw: 0, img: 'assets/img/hubschrauberdachlandeplatz-bwk/624_square_Plattform-1_500x500_acf_cropped.jpg' },
    { t: 'Haus S4', y: 2022, aw: 0, img: 'assets/img/haus-s4/748_Treppe_zquare_500x500_acf_cropped.jpg' },
    { t: 'Sanierung VH Ulm', y: 2013, aw: 1, img: 'assets/img/sanierung-vh-ulm/01_2_squared.jpg' },
    { t: 'BA3 Baubetriebshof der Stadt Ulm', y: 2024, aw: 0 },
    { t: 'Haus MK', y: 2023, aw: 0 },
    { t: 'Parkhaus am Bahnhof und Fußgängerpassage', y: 2022, aw: 0, img: 'assets/img/parkhaus-am-bahnhof/502_square-Kunst-2_500x500_acf_cropped.jpg' },
    { t: 'Kita Illerblick', y: 2009, aw: 0, img: 'assets/img/kita-illerblick/01_2_squared.jpg' },
    { t: 'Z4 Science Park 3', y: 2021, aw: 0, img: 'assets/img/z4-science-park-3/736_square-Fassase-Ecke-1.jpg' },
    { t: 'Infopunkt Citybahnhof', y: 2005, aw: 0, img: 'assets/img/infopunkt-citybahnhof/01_2_squared-3_500x500_acf_cropped.jpg' },
    { t: 'Kriegsspital Neu-Ulm', y: 2024, aw: 0 }
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

  /* Aktuelles: feste Reihenfolge, gepflegt über das News-Formular; zu Beginn sind die ersten
     SHOW Meldungen zu sehen, die Pfeile schalten Bild und Meldung vor und zurück und holen dabei
     die folgenden in die Liste. Ohne href ist die Meldung nicht verlinkt, externe Links öffnen in neuem Tab */
  var NEWS = [
    { img: 'assets/img/news/detail-konstruktionshandbuch-stroh.jpg', alt: 'Publikation von hochstrasser Architekten im neuen Konstruktionshandbuch „Stroh“ von DETAIL', href: 'https://www.detail.de/187323/stroh',
      kind: 'Presse', year: '2026', title: 'Publikation im neuen DETAIL-Konstruktionshandbuch',
      desc: 'Das Strohballenatelier ist Teil des neuen DETAIL-Konstruktionshandbuchs „Stroh“, das Nachschlagewerk zum nachhaltigen & kreislauffähigen Bauen mit Stroh.' },
    { img: 'assets/img/news/parkhaus-am-bahnhof-ulm.jpg', alt: 'Parkhaus am Bahnhof Ulm Auszeichnung für Beispielhaftes Bauen hochstrasser Architekten',
      kind: 'Auszeichnung', year: '2026', title: 'Parkhaus am Bahnhof erhält Auszeichnung für Beispielhaftes Bauen',
      desc: 'Das Projekt Parkhaus am Bahnhof hat die Auszeichnung für Beispielhaftes Bauen der Architektenkammer Baden-Württemberg im Zeitraum von 2019 - 2026 erhalten.' },
    { img: 'assets/img/news/kornhaus-kempten.jpg', alt: 'Bauen im Bestand Sanierung Kornhaus Kempten hochstrasser Architekten', href: 'https://www.byak.de/planen-und-bauen/projektsuche-systematik-alt-vor-16042026/detail/umbau-und-modernisierung-des-kornhauses/-.html?no_cache=1&cHash=801c191ca41c850759df2f77f4380798',
      kind: 'Auszeichnung', year: '2026', title: 'Kornhaus Kempten erhält Prädikat KlimaKulturKompetenz',
      desc: 'Sanierung und Modernisierung des Kornhauses in Kempten, ein barockes Einzeldenkmal aus der Zeit um 1700. Auszeichnung im Bereich Barrierefreiheit.' },
    { img: 'assets/img/news/filmpremiere-fred-hochstrasser.jpg', alt: 'Film Dokumentation Fred Hochstrasser Architekt', href: 'https://fred.hochstrasser.com/',
      kind: 'Veranstaltung', year: '2026', title: 'Filmpremiere: Fred Hochstrasser Architekt',
      desc: '60 Minuten über Fred Hochstrasser — Architekt und Gestalter. Wir freuen uns auf die Premiere der Film-Dokumentation über sein Leben und Lebenswerk.' },
    { img: 'assets/img/news/bda-berufung.jpg', alt: 'BDA Berufung unserer Mitarbeiter Scheer, Geywitz und Geitner hochstrasser Architekten',
      kind: 'Büro', year: '2026', title: 'BDA-Berufung',
      desc: 'Stolz präsentieren wir unsere 3 neuen Mitglieder im Bund Deutscher Architektinnen & Architekten: Frank Scheer, Stefanie Geywitz und Michael Geitner. (Juni 2026)' },
    { img: 'assets/img/news/vortrag-einsteinhaus.jpg', alt: 'Vortrag Adrian hochstrasser Architekten Ulm VH Einsteinhaus',
      kind: 'Veranstaltung', year: '2026', title: 'Vortrag im EinsteinHaus - Ulmer Volkshochschule',
      desc: 'Anlässlich des 80-jährigen Jubiläums war Adrian Hochstrasser zu Gast im Einsteinhaus und sprach über die Entstehung, Architektur und Sanierung des Gebäudes.' },
    { img: 'assets/img/news/baubetriebshof-ulm.jpg', alt: 'Bau Betriebshof Stadt Ulm hochstrasser. Architekten', href: 'projekt-ba3-baubetriebshof-ulm.html',
      kind: 'Fertigstellung', year: '2024', title: 'Fertigstellung BA3 Baubetriebshof der Stadt Ulm',
      desc: 'Neubau einer Fahrzeughalle für die Stadt Ulm. Die Ausführung erfolgte in einer Stahl-/ Holz-Hybridkonstruktion (Foto: Conné van d’Grachten).' },
    { img: 'assets/img/news/phase-nachhaltigkeit.jpg', alt: 'Initiative „Phase Nachhaltigkeit“', href: 'https://www.phase-nachhaltigkeit.jetzt/',
      kind: 'Presse', year: '2024', title: 'Unterzeichnung Phase Nachhaltigkeit',
      desc: 'Wir unterstützen die Initiative „Phase Nachhaltigkeit“. Damit unterstreichen wir unseren Anspruch, Verantwortung für ressourcenschonendes Bauen zu übernehmen.' },
    { img: 'assets/img/news/kriegsspital-neu-ulm.jpg', alt: 'Sanierung und Modernisierung des Kriegsspitals in Neu-Ulm hochstrasser Architekten',
      kind: 'Fertigstellung', year: '2024', title: 'Fertigstellung Umbau und Sanierung Kriegsspital Neu-Ulm',
      desc: 'Das als „ehemaliges Kriegsspital“ bekannte Gebäude in Neu-Ulm wurde von uns umgebaut und saniert.' },
    { img: 'assets/img/news/wohnbebauung-neu-ulm.jpg', alt: 'sanierung und modernisierung eines wohnquartiers hochstrasser Architekten', href: 'projekt-wohnbebauung-neu-ulm.html',
      kind: 'Fertigstellung', year: '2024', title: 'Fertigstellung Wohnbebauung in Neu-Ulm',
      desc: 'Abschluss der Sanierung und Modernisierung eines Wohnquartiers in Neu-Ulm mit insgesamt 33 Wohneinheiten.' },
    { img: 'assets/img/news/hugo-haering-auszeichnung.jpg', alt: 'Atelier aus Stroh hochstrasser Architekten',
      kind: 'Auszeichnung', year: '2023', title: 'Hugo-Häring-Auszeichnung',
      desc: 'Verleihung der Hugo-Häring-Auszeichnung 2023 für das Strohballenatelier von Dorothea Schrade (Foto: Conné van d’Grachten).' },
    { img: 'assets/img/news/haus-mk.jpg', alt: 'Sanierung Privat-Haus MK', href: 'projekt-haus-mk.html',
      kind: 'Fertigstellung', year: '2023', title: 'Fertigstellung Sanierung und Umbau Haus MK',
      desc: 'Das denkmalgeschützte Einfamilienhaus mit Einliegerwohnung wurde von uns energetisch saniert und umgebaut.' },
    { img: 'assets/img/news/strohballenatelier.jpg', alt: 'Strohballenatelier hochstrasser Architekten',
      kind: 'Fertigstellung', year: '2022', title: 'Fertigstellung Strohballenatelier',
      desc: 'Ein Atelier aus Strohballen, alten Fenstern und Naturmaterialien. Das Ergebnis: Teamwork und eine Hugo-Häring-Auszeichnung 2023.' }
  ];
  var SHOW = 4;
  var media = document.getElementById('newsMedia');
  var img = document.getElementById('nImg');
  var feed = document.getElementById('newsFeed');
  var prev = document.getElementById('newsPrev');
  var next = document.getElementById('newsNext');
  if (feed && img && prev && next) {
    var idx = 0;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    var side = window.matchMedia('(min-width: 1200px)');
    var esc = function (v) { return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
    feed.innerHTML = NEWS.map(function (n, i) {
      var link = !n.href ? '' : ' href="' + esc(n.href) + '"' + (/^https?:/.test(n.href) ? ' target="_blank" rel="noopener"' : '');
      return '<li' + (i === 0 ? ' class="is-lead" aria-current="true"' : '') + (i >= SHOW ? ' hidden' : '') + '><a' + link + '>' +
        '<span class="idx-feed__title t-h4">' + esc(n.title) + '</span> ' +
        '<span class="idx-feed__kind t-label">' + esc(n.kind) + '</span> ' +
        '<span class="idx-feed__year t-label">' + esc(n.year) + '</span> ' +
        '<span class="idx-feed__desc"><p>' + esc(n.desc) + '</p></span></a></li>';
    }).join('');
    var items = Array.prototype.slice.call(feed.children);
    /* sichtbar sind SHOW Meldungen am Stück: bis zur vierten die ersten vier, danach rückt
       die Liste mit, sodass die aktive Meldung die unterste ist */
    var first = function (i) { return Math.max(0, Math.min(i - SHOW + 1, NEWS.length - SHOW)); };
    var lead = function (i) {
      var f = first(i);
      items.forEach(function (li, k) {
        li.classList.toggle('is-lead', k === i);
        li.hidden = k < f || k >= f + SHOW;
      });
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
      var was = items.map(function (li) { return li.hidden; });
      lead(idx);
      items.forEach(function (li, k) {
        if (was[k] && !li.hidden && !still.matches) {
          li.classList.remove('is-in'); void li.offsetWidth; li.classList.add('is-in');
        }
      });
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
