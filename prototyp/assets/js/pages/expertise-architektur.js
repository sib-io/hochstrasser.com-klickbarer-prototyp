/* Architektur: Inhalte der Leistungsphasen für das Panel
   (Interaktion: pages/expertise.js) und Zitat-Kette. */
(function () {
  'use strict';
  var L = {
    l0: { name: 'Leistungsphase 0 · Projektvorbereitung', claim: 'Bedarf, Ort, Ziel.',
      a: 'Bedarf und Ziele der Bauherrschaft, Standort und Grundstück, Planungsrecht, Bestand, Budget und Termine — methodisch angelehnt an DIN 18205',
      b: 'Bedarfsprogramm, Standort- oder Machbarkeitsstudie, Empfehlung für das weitere Vorgehen',
      c: 'Kostenrahmen nach DIN 276 als erste, bewusst grobe Stufe',
      d: 'Nicht in den Grundleistungen der HOAI enthalten, frei zu vereinbaren' },
    l1: { name: 'Leistungsphase 1 · Grundlagenermittlung', claim: 'Die Aufgabe verstehen.',
      a: 'Aufgabenstellung auf Grundlage der Bedarfsplanung, Ortsbesichtigung, Beratung zum Leistungs- und Untersuchungsbedarf, Auswahl der Fachplanung',
      b: 'Dokumentierte Ergebnisse als Entscheidungsgrundlage — bei offenen Zielen die Planungsgrundlage nach § 650p Abs. 2 BGB',
      c: 'Kosteneinschätzung, sofern die wesentlichen Ziele noch nicht vereinbart sind',
      d: '2 Prozent' },
    l2: { name: 'Leistungsphase 2 · Vorplanung', claim: 'Die Idee, in Varianten.',
      a: 'Planungskonzept mit Untersuchung alternativer Lösungen, Zielkatalog, Vorabstimmung der Genehmigungsfähigkeit, Integration der Fachplanung',
      b: 'Vorentwurf mit Erläuterung, Terminplan für den Planungs- und Bauablauf',
      c: 'Kostenschätzung nach DIN 276',
      d: '7 Prozent' },
    l3: { name: 'Leistungsphase 3 · Entwurfsplanung', claim: 'Das Haus, durchgearbeitet.',
      a: 'Durcharbeitung des Konzepts mit allen Fachplanungen: Tragwerk, Technik, Bauphysik, Brandschutz — bis zur zeichnerischen Darstellung im Maßstab 1:100',
      b: 'Entwurf als Grundlage für Genehmigung und Ausführung, fortgeschriebener Terminplan',
      c: 'Kostenberechnung nach DIN 276, abgeglichen mit der Kostenschätzung',
      d: '15 Prozent' },
    l4: { name: 'Leistungsphase 4 · Genehmigungsplanung', claim: 'Das Recht, eingereicht.',
      a: 'Bauvorlagen nach öffentlich-rechtlichen Vorschriften, Abstimmung mit Behörden; in Baden-Württemberg in der Regel Kenntnisgabe- oder vereinfachtes Verfahren',
      b: 'Vollständige Bauvorlagen, eingereicht und begleitet bis zur Genehmigung',
      c: '—',
      d: '3 Prozent' },
    l5: { name: 'Leistungsphase 5 · Ausführungsplanung', claim: 'Jede Fuge, gezeichnet.',
      a: 'Werk- und Detailplanung vom Maßstab 1:50 bis 1:1, Abstimmung mit den ausführungsrelevanten Plänen der Fachplanung',
      b: 'Ausführungsreife Pläne, fortgeschrieben während der Bauzeit',
      c: '—',
      d: '25 Prozent' },
    l6: { name: 'Leistungsphase 6 · Vorbereitung der Vergabe', claim: 'Das Haus, in Positionen.',
      a: 'Mengenermittlung, Leistungsbeschreibungen mit Leistungsverzeichnissen, Vergabeterminplan',
      b: 'Vergabeunterlagen für alle Leistungsbereiche',
      c: 'Ermittlung der Kosten auf Grundlage bepreister Leistungsverzeichnisse, Abgleich mit der Kostenberechnung',
      d: '10 Prozent' },
    l7: { name: 'Leistungsphase 7 · Mitwirkung bei der Vergabe', claim: 'Die richtigen Hände.',
      a: 'Einholen und Prüfen der Angebote, Preisspiegel, Bietergespräche, Vergabevorschlag',
      b: 'Dokumentation des Vergabeverfahrens, Vertragsunterlagen',
      c: 'Vergleich der Ausschreibungsergebnisse mit den bepreisten Verzeichnissen und der Kostenberechnung',
      d: '4 Prozent' },
    l8: { name: 'Leistungsphase 8 · Objektüberwachung', claim: 'Gebaut wie gezeichnet.',
      a: 'Überwachung der Ausführung, Koordination der Beteiligten, Terminkontrolle, Rechnungsprüfung, Abnahme',
      b: 'Mängelfreie Übergabe, Objektdokumentation, Verzeichnis der Verjährungsfristen',
      c: 'Kostenkontrolle und Kostenfeststellung nach DIN 276',
      d: '32 Prozent — die größte einzelne Phase' },
    l9: { name: 'Leistungsphase 9 · Objektbetreuung', claim: 'Nach dem Einzug.',
      a: 'Fachliche Bewertung von Mängeln innerhalb der Verjährungsfristen, Objektbegehung vor ihrem Ablauf',
      b: 'Freigabe von Sicherheitsleistungen, abschließende Dokumentation',
      c: '—',
      d: '2 Prozent' }
  };
  Expertise.drawPanel({ root: '#leistungsphasen', data: L, initial: 'l0' });

  /* Zitat: Zeilen unter das wiederholte Wort rücken */
  var chain = document.getElementById('archChain');
  if (!chain) return;
  var lines = Array.prototype.slice.call(chain.querySelectorAll('.arch-chain__ln'));
  function rect(el) { return el.getBoundingClientRect(); }
  function place() {
    for (var i = 1; i < lines.length; i++) {
      var anchor = lines[i - 1].querySelector('[data-link]');
      lines[i].style.marginLeft = (rect(anchor).left - rect(chain).left) + 'px';
    }
  }
  function reset() { lines.forEach(function (l) { l.style.marginLeft = ''; }); }
  function align() {
    reset();
    chain.style.fontSize = '';
    if (window.innerWidth < 700) return;
    place();
    var size = parseFloat(getComputedStyle(chain).fontSize), guard = 0;
    while (guard++ < 30) {
      var last = lines[lines.length - 1];
      if (rect(last.lastElementChild).right <= rect(chain).right + 1) break;
      size *= 0.95;
      chain.style.fontSize = size + 'px';
      reset();
      place();
    }
  }
  align();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(align);
  var t;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(align, 120); });
})();
