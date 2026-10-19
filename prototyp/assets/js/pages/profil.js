/* Profil — Kernthemen-Schema */
(function () {
  var KT = {
    einfach: {
      img: 'assets/img/wp/825_header-scaled.jpg',
      cap: 'Platzhalter: Rechenzentrum SWU, Ulm',
      name: 'Einfach bauen',
      claim: 'Komplexität ist nicht automatisch Qualität.',
      text: 'Wir hinterfragen Standards, reduzieren unnötige Komplexität und entwickeln angemessene Lösungen, die funktional, robust und nachvollziehbar sind. Einfach bauen bedeutet für uns, mit klugen Entscheidungen mehr zu erreichen – nicht mit mehr Aufwand.'
    },
    wirtschaft: {
      img: 'assets/img/wp/799_lanscape-02-scaled.jpg',
      cap: 'Platzhalter: BA3 Baubetriebshof der Stadt Ulm',
      name: 'Wirtschaftlichkeit schaffen',
      claim: 'Gute Architektur muss leistbar sein.',
      text: 'Wirtschaftlichkeit entsteht nicht durch Verzicht, sondern durch intelligente Planung, klare Prozesse und frühzeitige Entscheidungen. Unser Ziel sind kostensichere und langlebige Lösungen mit einem Mehrwert für unsere Auftraggeber.'
    },
    kreislauf: {
      img: 'assets/img/wp/NU-Schwabenstr_0025-scaled.jpg',
      cap: 'Platzhalter: Wohnbebauung Neu-Ulm',
      name: 'Kreislaufgerecht planen und bauen',
      claim: 'Unsere Ressourcen sind wertvoll und endlich.',
      text: 'Deshalb denken wir Gebäude über ihren gesamten Lebenszyklus hinweg – von der Materialwahl über die Nutzung bis zur Wiederverwendung. Kreislaufgerechtes Planen und Bauen schafft langlebige, ressourcenschonende und wirtschaftlich tragfähige Lösungen.'
    },
    bestand: {
      img: 'assets/img/wp/02_header-1.jpg',
      cap: 'Platzhalter: Umbau Neue Straße, Ulm',
      name: 'Bestand weiterdenken',
      claim: 'Bestand ist eine wertvolle Ressource.',
      text: 'Wir sehen Bestand nicht als Beschränkung, sondern als Ausgangspunkt für neue Potenziale. Durch Umbau, Weiterentwicklung und behutsame Transformation schaffen wir nachhaltige Lösungen, die Geschichte bewahren und Zukunft ermöglichen.'
    },
    kompetenzen: {
      img: 'assets/img/wp/744_landscape_Treppenhaus-3-scaled.jpg',
      cap: 'Platzhalter: Haus MK, Ulm',
      name: 'Kompetenzen verbinden',
      claim: 'Die besten Lösungen entstehen im Zusammenspiel unterschiedlicher Perspektiven.',
      text: 'Wir vernetzen Architektur und Fachdisziplinen frühzeitig zu einem integralen Planungsprozess. So entstehen qualitativ hochwertige Ergebnisse, klare Verantwortlichkeiten und effiziente Abläufe aus einer Hand.'
    },
    zukunft: {
      img: 'assets/img/wp/14_landscape-1.jpg',
      cap: 'Platzhalter: Erweiterung WITec',
      name: 'Zukunft gestalten',
      claim: 'Architektur prägt das Leben von morgen.',
      text: 'Deshalb verstehen wir jede Planungsaufgabe als Verantwortung für die gebaute Umwelt und die kommenden Generationen. Wir entwickeln Gebäude und Räume, die langfristig Bestand haben und sich an veränderte Anforderungen anpassen können.'
    }
  };

  var schema = document.getElementById('schema');
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.profil-schema .node'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.profil-chips .chip'));
  var panel = document.getElementById('ktPanel');
  var ktName = document.getElementById('ktName'), ktClaim = document.getElementById('ktClaim'),
      ktText = document.getElementById('ktText'), ktImg = document.getElementById('ktImg');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 'einfach';

  function paint(key) {
    var d = KT[key];
    ktName.textContent = d.name;
    ktClaim.textContent = d.claim;
    ktText.textContent = d.text;
    ktImg.src = d.img;
    ktImg.alt = d.cap;
  }
  function mark() {
    nodes.forEach(function (n) {
      var on = n.dataset.k === current;
      n.classList.toggle('is-on', on);
      n.setAttribute('aria-pressed', String(on));
    });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.k === current)); });
  }
  function setKt(key) {
    if (key === current) return;
    current = key;
    mark();
    if (reduce) { paint(key); return; }
    panel.classList.add('is-fading');
    setTimeout(function () { paint(key); panel.classList.remove('is-fading'); }, 220);
  }
  nodes.concat(chips).forEach(function (el) {
    el.addEventListener('click', function () { setKt(el.dataset.k); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setKt(el.dataset.k); }
    });
  });
  schema.classList.add('has-on');
  mark();
})();

/* Profil — Collage Architektur: alle 0,8 s wechselt ein Feld (reihum in gemischter Folge)
   auf ein Teammitglied, das gerade nicht zu sehen ist */
(function () {
  var box = document.getElementById('collage');
  if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var TEAM = [
    ['adrian-hochstrasser', 'Adrian Hochstrasser'],
    ['michael-geitner', 'Michael Geitner'],
    ['stefanie-geywitz', 'Stefanie Geywitz'],
    ['patricia-selig', 'Patricia Selig'],
    ['frank-scheer', 'Frank Scheer'],
    ['sebastian-baier', 'Sebastian Baier'],
    ['georg-mueller', 'Georg Müller'],
    ['aileen-elser', 'Aileen Elser'],
    ['simon-mueller', 'Simon Müller'],
    ['wolfgang-kliesch', 'Wolfgang Kliesch'],
    ['miriam-steigerwald', 'Miriam Steigerwald'],
    ['michael-amann', 'Michael Amann'],
    ['nicola-span', 'Nicola Span'],
    ['maximilian-hoeppler', 'Maximilian Höppler'],
    ['alexandra-schmidt', 'Alexandra Schmidt'],
    ['sonja-lambert', 'Sonja Lambert'],
    ['ipek-maremoglou', 'Ipek Maremoglou'],
    ['kira-poleschal-seemann', 'Kira Poleschal-Seemann'],
    ['markus-hauser', 'Markus Hauser'],
    ['ralph-thiemann', 'Ralph Thiemann'],
    ['louisa-maria-gloeckle', 'Louisa Maria Glöckle'],
    ['lukas-fischer', 'Lukas Fischer'],
    ['anna-verena-wittlinger', 'Anna-Verena Wittlinger'],
    ['sabine-schuessler', 'Sabine Schüssler'],
    ['laura-rallo-sanchez', 'Laura Rallo Sánchez']
  ];
  var cells = Array.prototype.slice.call(box.querySelectorAll('.profil-collage__cell'));
  var order = [0, 3, 1, 2];
  var step = 0;
  function shown() {
    return cells.map(function (c) { var i = c.querySelector('img:last-child'); return i ? i.getAttribute('src') : ''; });
  }
  function next() {
    var vis = shown();
    var free = TEAM.filter(function (p) { return vis.indexOf('assets/img/team/' + p[0] + '.jpg') < 0; });
    var pick = free[Math.floor(Math.random() * free.length)];
    var cell = cells[order[step++ % order.length]];
    var img = new Image();
    img.alt = pick[1];
    img.className = 'is-in';
    img.onload = function () {
      cell.appendChild(img);
      requestAnimationFrame(function () { requestAnimationFrame(function () { img.classList.remove('is-in'); }); });
      setTimeout(function () { while (cell.children.length > 1) cell.removeChild(cell.firstElementChild); }, 500);
    };
    img.src = 'assets/img/team/' + pick[0] + '.jpg';
  }
  setInterval(function () { if (!document.hidden) next(); }, 800);
})();

/* Profil — Leitbild als Akkordeon: beim Scrollen öffnet sich der Wert, der gerade in der
   Bildschirmmitte steht; ein Klick wählt direkt (und hat kurz Vorrang vor dem Scrollen) */
(function () {
  var box = document.getElementById('leitbild');
  if (!box) return;
  var items = Array.prototype.slice.call(box.querySelectorAll('.profil-acc__item'));
  var locked = 0;
  function open(i) {
    items.forEach(function (it, k) {
      it.classList.toggle('is-on', k === i);
      it.querySelector('.profil-acc__btn').setAttribute('aria-expanded', String(k === i));
    });
  }
  items.forEach(function (it, i) {
    it.querySelector('.profil-acc__btn').addEventListener('click', function () { open(i); locked = Date.now(); });
  });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    if (Date.now() - locked < 1200) return;
    es.forEach(function (e) { if (e.isIntersecting) open(items.indexOf(e.target)); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  items.forEach(function (it) { io.observe(it); });
})();
