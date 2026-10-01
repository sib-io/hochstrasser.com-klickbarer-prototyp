/* Digitales Bauen: Informationslieferkette (Interaktion: pages/expertise.js)
   und Umschalter der Akzentfarbe in der Prototyp-Leiste. */
(function () {
  'use strict';
  var FLOW = {
    aia: {
      name: 'Auftraggeber-Informationsanforderungen',
      claim: 'Die Bestellung, die kaum jemand schreibt.',
      who: 'Die Bauherrschaft — in der Praxis fast immer mit fachlicher Unterstützung, oft durch das Architekturbüro',
      when: 'Vor der Vergabe der Planungsleistungen, spätestens mit der Aufgabenstellung',
      what: 'Projektziele, Anwendungsfälle, Rollen, Datenformate, Modellstruktur und die Informationstiefe je Übergabe',
      plan: 'Ohne AIA gibt es keinen Maßstab für Modellqualität — und damit keine Abnahme, die diesen Namen verdient. Wer sie nicht hat, bekommt Modelle, die gut aussehen und nichts beantworten.'
    },
    bap: {
      name: 'BIM-Abwicklungsplan',
      claim: 'Die Antwort des Planungsteams.',
      who: 'Das Planungsteam, federführend die BIM-Gesamtkoordination, abgestimmt mit allen Fachplanungen',
      when: 'Als vorläufige Fassung mit dem Angebot, verbindlich ab Leistungsphase 1 bis 2, danach fortgeschrieben',
      what: 'Modellstruktur, Namenskonvention, Koordinatensystem, Austauschzyklen, Prüfregeln, Rollen und Zuständigkeiten',
      plan: 'Im BAP wird aus einer Methode ein Terminplan. Jede Lieferung bekommt Datum, Format und Empfänger — und jede Vorgabe eine verantwortliche Person.'
    },
    fach: {
      name: 'Fachmodelle',
      claim: 'Jede Disziplin plant im eigenen Modell.',
      who: 'Architektur, Tragwerk, technische Ausrüstung, Bauphysik, Vermessung — jeweils in eigener Verantwortung',
      when: 'Ab Leistungsphase 2, fortgeschrieben mit jeder Phase und jedem Austauschzyklus',
      what: 'Geometrie und Merkmale in der vereinbarten Informationsbedarfstiefe nach DIN EN 17412-1 — nicht mehr und nicht weniger',
      plan: 'Fachmodelle bleiben getrennt und in der Hand ihrer Verfasser. Das ist keine Schwäche des Verfahrens, sondern der Grund, warum Verantwortung zuordenbar bleibt.'
    },
    koord: {
      name: 'Koordinationsmodell',
      claim: 'Hier wird es unbequem — und billig.',
      who: 'Die BIM-Gesamtkoordination, zusammengeführt aus den gelieferten Fachmodellen',
      when: 'In festen Zyklen, in der Regel wöchentlich bis zweiwöchentlich über die gesamte Planung',
      what: 'Zusammengeführte Fachmodelle, Kollisionsprüfung, Regelprüfung gegen AIA und BAP, offene Punkte als BCF-Vorgänge',
      plan: 'Das Koordinationsmodell ist kein Liefergegenstand, sondern ein Prüfwerkzeug. Es ist die Stelle, an der ein Konflikt noch Zeit kostet statt Geld.'
    },
    aim: {
      name: 'Betriebsmodell',
      claim: 'Das einzige Modell, das lange lebt.',
      who: 'Übergabe durch das Planungsteam, Fortschreibung durch Betreiber und Facility Management',
      when: 'Mit Abnahme und Inbetriebnahme — und danach über Jahrzehnte',
      what: 'As-built-Geometrie, Anlagenkennzeichnung, Produkt- und Wartungsdaten, Dokumente in einer lesbaren Struktur',
      plan: 'Was hier fehlt, wird später neu erfasst — meist teurer, als es in der Planung gekostet hätte. Deshalb steht die Frage nach dem Betrieb am Anfang, nicht am Ende.'
    }
  };
  Expertise.drawPanel({ root: '#lieferkette', data: FLOW, initial: 'aia' });

  /* Akzentfarbe vergleichen (nur Prototyp) */
  var inner = document.querySelector('.proto__in');
  var toggle = document.getElementById('notesToggle');
  if (!inner) return;
  var tools = document.createElement('div');
  tools.className = 'xdb-tools';
  var group = document.createElement('div');
  group.className = 'xdb-acc';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Akzentfarbe wählen');
  var current = document.body.getAttribute('data-accent') || 'blau';
  [['blau', 'Blau'], ['petrol', 'Petrol'], ['rost', 'Rost'], ['ohne', 'Ohne']].forEach(function (a) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('data-a', a[0]);
    b.setAttribute('aria-pressed', String(a[0] === current));
    b.innerHTML = '<i class="accent-sw--' + a[0] + '"></i>' + a[1];
    b.addEventListener('click', function () {
      document.body.setAttribute('data-accent', a[0]);
      group.querySelectorAll('button').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
    });
    group.appendChild(b);
  });
  tools.appendChild(group);
  if (toggle) tools.appendChild(toggle);
  inner.appendChild(tools);
})();

/* Hero-Video: spielt einmal und bleibt auf dem Schlussbild stehen (Vorschlag
   aus den offenen Punkten). Klick spielt erneut ab. Bei „Bewegung reduzieren“
   startet es nicht von selbst. */
(function () {
  var v = document.getElementById('xdbVideo');
  if (!v) return;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still) { var go = v.play(); if (go && go.catch) go.catch(function () {}); }
  v.addEventListener('click', function () { v.currentTime = 0; v.play(); });
})();
