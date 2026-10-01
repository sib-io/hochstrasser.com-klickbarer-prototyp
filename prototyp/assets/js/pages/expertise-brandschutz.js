/* Brandschutz: Inhalte der Gebäudeklassen für das Panel
   (Interaktion: pages/expertise.js) */
(function () {
  'use strict';
  var GK = {
    gk1: {
      name: 'Gebäudeklasse 1',
      claim: 'Das freistehende Haus.',
      size: 'Bis 7 m, höchstens zwei Nutzungseinheiten mit zusammen bis zu 400 m², freistehend',
      parts: 'Über der Geländeoberfläche keine Anforderung an den Feuerwiderstand tragender Bauteile, im Kellergeschoss feuerhemmend',
      way: 'In der Regel über Rettungsgeräte der Feuerwehr oder ebenerdig ins Freie',
      plan: 'Der größte gestalterische Spielraum. Entscheidend sind Abstand zur Grenze, Feuerwehrzugang — und die Frage, was passiert, sobald angebaut wird.'
    },
    gk2: {
      name: 'Gebäudeklasse 2',
      claim: 'Dasselbe Haus, aber angebaut.',
      size: 'Bis 7 m, höchstens zwei Nutzungseinheiten mit zusammen bis zu 400 m², nicht freistehend',
      parts: 'Tragende und aussteifende Bauteile feuerhemmend, im Kellergeschoss feuerhemmend',
      way: 'Über eine weitere Treppe oder über Rettungsgeräte der Feuerwehr',
      plan: 'Die Grenzbebauung bringt die Gebäudeabschlusswand ins Spiel. Hier entscheidet sich früh, ob es eine Brandwand braucht.'
    },
    gk3: {
      name: 'Gebäudeklasse 3',
      claim: 'Das Mehrfamilienhaus bis sieben Metern.',
      size: 'Alle übrigen Gebäude bis 7 m, also mehr als zwei Einheiten oder mehr als 400 m²',
      parts: 'Tragende und aussteifende Bauteile feuerhemmend, im Kellergeschoss feuerbeständig',
      way: 'Über eine weitere Treppe oder über Rettungsgeräte der Feuerwehr',
      plan: 'Der notwendige Treppenraum wird zum Thema. Rettungswegführung und Flurlängen bestimmen den Grundriss mit.'
    },
    gk4: {
      name: 'Gebäudeklasse 4',
      claim: 'Die Schwelle, an der es teurer wird.',
      size: 'Bis 13 m, Nutzungseinheiten von jeweils bis zu 400 m²',
      parts: 'Tragende und aussteifende Bauteile hochfeuerhemmend, im Kellergeschoss feuerbeständig',
      way: 'Über eine weitere Treppe oder über Hubrettungsfahrzeuge — mit den zugehörigen Aufstellflächen',
      plan: 'Hochfeuerhemmend heißt im Holzbau: Muster-Holzbaurichtlinie. Wer sichtbares Holz will, klärt das hier — nicht in der Ausführungsplanung.'
    },
    gk5: {
      name: 'Gebäudeklasse 5',
      claim: 'Ab hier zählt jede Durchdringung.',
      size: 'Alle übrigen Gebäude, auch unterirdische; ab 22 m gilt das Gebäude als Hochhaus und damit als Sonderbau',
      parts: 'Tragende und aussteifende Bauteile feuerbeständig, im Kellergeschoss feuerbeständig',
      way: 'In der Regel baulich; Leiterrettung nur unter engen Voraussetzungen',
      plan: 'Brandabschnitte, Schächte, Aufzüge und die Haustechnik bestimmen die Konstruktion mit. Hier lohnt sich die integrale Planung am deutlichsten.'
    }
  };
  Expertise.drawPanel({ root: '#gebaeudeklassen', data: GK, initial: 'gk1' });
})();
