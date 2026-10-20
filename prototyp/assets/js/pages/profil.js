/* Profil — Kernthemen-Schema */
(function () {
  var KT = {
    einfach: {
      img: 'assets/img/ba3-baubetriebshof-ulm/799_lanscape-03-scaled.jpg',
      cap: 'Baubetriebshof Ulm: Fahrzeughalle mit Fassade aus Holzlatten',
      name: 'Einfach bauen',
      claim: 'Komplexität ist nicht automatisch Qualität.',
      text: 'Wir hinterfragen Standards, reduzieren unnötige Komplexität und entwickeln angemessene Lösungen, die funktional, robust und nachvollziehbar sind. Einfach bauen bedeutet für uns, mit klugen Entscheidungen mehr zu erreichen – nicht mit mehr Aufwand.'
    },
    wirtschaft: {
      img: 'assets/img/erweiterung-witec/757_landscape_SuedWest-Ecke.jpg',
      cap: 'Erweiterung WITec: Büro- und Produktionsgebäude mit heller Betonfassade',
      name: 'Wirtschaftlichkeit schaffen',
      claim: 'Gute Architektur muss leistbar sein.',
      text: 'Wirtschaftlichkeit entsteht nicht durch Verzicht, sondern durch intelligente Planung, klare Prozesse und frühzeitige Entscheidungen. Unser Ziel sind kostensichere und langlebige Lösungen mit einem Mehrwert für unsere Auftraggeber.'
    },
    kreislauf: {
      img: 'assets/img/strohballenatelier/atelier-innenraum.jpg',
      cap: 'Strohballenatelier: Wände aus Strohballen, Holztragwerk und wiederverwendete Schlossfenster',
      name: 'Kreislaufgerecht planen und bauen',
      claim: 'Unsere Ressourcen sind wertvoll und endlich.',
      text: 'Deshalb denken wir Gebäude über ihren gesamten Lebenszyklus hinweg – von der Materialwahl über die Nutzung bis zur Wiederverwendung. Kreislaufgerechtes Planen und Bauen schafft langlebige, ressourcenschonende und wirtschaftlich tragfähige Lösungen.'
    },
    bestand: {
      img: 'assets/img/kriegsspital-neu-ulm/842_potrait-MItte-EG-01-scaled.jpg',
      cap: 'Ehemaliges Kriegsspital Neu-Ulm: Gewölbe aus Ziegel und Naturstein, heute als Werkstatt genutzt',
      name: 'Bestand weiterdenken',
      claim: 'Bestand ist eine wertvolle Ressource.',
      text: 'Wir sehen Bestand nicht als Beschränkung, sondern als Ausgangspunkt für neue Potenziale. Durch Umbau, Weiterentwicklung und behutsame Transformation schaffen wir nachhaltige Lösungen, die Geschichte bewahren und Zukunft ermöglichen.'
    },
    kompetenzen: {
      img: 'assets/img/rechenzentrum-swu/825_header-scaled.jpg',
      cap: 'Rechenzentrum der Stadtwerke Ulm/Neu-Ulm',
      name: 'Kompetenzen verbinden',
      claim: 'Die besten Lösungen entstehen im Zusammenspiel unterschiedlicher Perspektiven.',
      text: 'Wir vernetzen Architektur und Fachdisziplinen frühzeitig zu einem integralen Planungsprozess. So entstehen qualitativ hochwertige Ergebnisse, klare Verantwortlichkeiten und effiziente Abläufe aus einer Hand.'
    },
    zukunft: {
      img: 'assets/img/friesenhofen-saegemuehle/784_header.jpg',
      cap: 'Wohnareal Sägemühle Friesenhofen: Visualisierung der Häuser am Fluss',
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

