/* Profil — Kernthemen-Schema */
(function () {
  var KT = {
    integral: {
      img: 'assets/img/wp/825_header-scaled.jpg',
      cap: 'Platzhalter: Rechenzentrum SWU, Ulm',
      name: 'Integrale Planung',
      claim: 'Gemeinsam planen. Einfach bauen.',
      text: 'Komplexe Bauprojekte entstehen nicht mehr in einzelnen Fachbereichen, sondern im Zusammenspiel aller Beteiligten. Deshalb verbinden wir Architektur und technische Fachdisziplinen von Beginn an in einem integralen Planungsprozess. Klare Verantwortlichkeit, kurze Entscheidungswege und frühzeitige Abstimmungen schaffen Transparenz, vereinfachen Schnittstellen und erhöhen die Planungs-, Termin- und Kostensicherheit.',
      kicker: 'Komplexität braucht keine komplizierten Prozesse. Sie braucht klare Strukturen.'
    },
    wirtschaft: {
      img: 'assets/img/wp/799_lanscape-02-scaled.jpg',
      cap: 'Platzhalter: BA3 Baubetriebshof der Stadt Ulm',
      name: 'Wirtschaftlichkeit',
      claim: 'Gute Architektur muss leistbar sein.',
      text: 'Wirtschaftlichkeit beginnt nicht auf der Baustelle, sondern bereits in der Planung. Durch intelligente Prozesse, frühzeitige Entscheidungen und integrale Zusammenarbeit schaffen wir kostensichere und langlebige Lösungen mit einem Mehrwert für unsere Auftraggeber.',
      kicker: 'Qualität entsteht nicht durch höhere Budgets, sondern durch bessere Entscheidungen.'
    },
    nachhaltigkeit: {
      img: 'assets/img/wp/NU-Schwabenstr_0025-scaled.jpg',
      cap: 'Platzhalter: Wohnbebauung Neu-Ulm',
      name: 'Nachhaltigkeit',
      claim: 'Heute planen. Für morgen bauen.',
      text: 'Nachhaltigkeit ist für uns kein Zusatz, sondern Bestandteil jeder Entscheidung. Wir hinterfragen Standards, planen ressourcenschonend und mit Blick auf den gesamten Lebenszyklus eines Gebäudes. Durch das enge Zusammenspiel aller Fachdisziplinen entstehen angemessene Lösungen, die ökologisch sinnvoll, wirtschaftlich tragfähig und somit langfristig zukunftssicher sind.',
      kicker: 'Nachhaltigkeit entsteht im Zusammenspiel von Architektur und technischen Fachdisziplinen.'
    },
    bestand: {
      img: 'assets/img/wp/02_header-1.jpg',
      cap: 'Platzhalter: Umbau Neue Straße, Ulm',
      name: 'Bestand',
      claim: 'Erhalten. Weiterentwickeln. Zukunft schaffen.',
      text: 'Der nachhaltigste Quadratmeter ist häufig der, der bereits existiert. Deshalb verstehen wir den Bestand nicht als Einschränkung, sondern als Chance. Mit intelligenten Konzepten für Umbau, Sanierung, Revitalisierung und Denkmalschutz entwickeln wir Gebäude weiter und verbinden Geschichte mit den Anforderungen für morgen.',
      kicker: 'Bestand bewahren heißt Zukunft gestalten.'
    },
    verantwortung: {
      img: 'assets/img/wp/744_landscape_Treppenhaus-3-scaled.jpg',
      cap: 'Platzhalter: Haus MK, Ulm',
      name: 'Verantwortung',
      claim: 'Ein Ansprechpartner. Klare Verantwortung.',
      text: 'Wir übernehmen Verantwortung für das gesamte Projekt — von der ersten Idee bis zur Realisierung. Als integraler Planungspartner koordinieren wir alle Disziplinen, führen Interessen zusammen und behalten Qualität, Termine und Kosten jederzeit im Blick. Für unsere Auftraggeber bedeutet dies klare Zuständigkeiten, transparente Prozesse und einen zentralen Ansprechpartner über alle Projektphasen hinweg.',
      kicker: 'Verantwortung schafft Vertrauen. Vertrauen schafft erfolgreiche Projekte.'
    }
  };

  var schema = document.getElementById('schema');
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.profil-schema .node'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.profil-chips .chip'));
  var panel = document.getElementById('ktPanel');
  var ktName = document.getElementById('ktName'), ktClaim = document.getElementById('ktClaim'),
      ktText = document.getElementById('ktText'), ktKicker = document.getElementById('ktKicker'),
      ktImg = document.getElementById('ktImg');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 'integral';

  function paint(key) {
    var d = KT[key];
    ktName.textContent = d.name;
    ktClaim.textContent = d.claim;
    ktText.textContent = d.text;
    ktKicker.textContent = d.kicker;
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

/* Profil — Collage Architektur: alle 2,5 s wechselt ein Feld (reihum in gemischter Folge)
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
    ['viktoria-kessler', 'Viktoria Kessler'],
    ['aileen-elser', 'Aileen Elser'],
    ['simon-mueller', 'Simon Müller'],
    ['stefanie-seemann-corneel', 'Stefanie Seemann-Corneel'],
    ['wolfgang-kliesch', 'Wolfgang Kliesch'],
    ['miriam-steigerwald', 'Miriam Steigerwald'],
    ['niklas-berthold', 'Niklas Berthold'],
    ['michael-amann', 'Michael Amann'],
    ['andreas-borgolte', 'Andreas Borgolte'],
    ['nicola-span', 'Nicola Span'],
    ['maximilian-hoeppler', 'Maximilian Höppler'],
    ['alexandra-schmidt', 'Alexandra Schmidt'],
    ['sonja-lambert', 'Sonja Lambert'],
    ['ipek-maremoglou', 'Ipek Maremoglou'],
    ['jens-taube', 'Jens Taube'],
    ['kira-poleschal-seemann', 'Kira Poleschal-Seemann'],
    ['alma-salkic', 'Alma Salkic'],
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
      setTimeout(function () { while (cell.children.length > 1) cell.removeChild(cell.firstElementChild); }, 1000);
    };
    img.src = 'assets/img/team/' + pick[0] + '.jpg';
  }
  setInterval(function () { if (!document.hidden) next(); }, 2500);
})();
