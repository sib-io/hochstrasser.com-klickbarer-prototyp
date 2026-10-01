/* Nachhaltigkeit: Inhalte der Lebenszyklusphasen für das Panel
   (Interaktion: pages/expertise.js) */
(function () {
  'use strict';
  var LZ = {
    a1: {
      name: 'Herstellung, Module A1 bis A3',
      claim: 'Bevor der erste Stein gesetzt ist.',
      mods: 'Rohstoffgewinnung, Transport zum Werk, Herstellung der Bauprodukte',
      what: 'Zement, Stahl, Glas, Aluminium und Dämmstoffe — mengenmäßig vor allem im Tragwerk, in den Decken und in den Untergeschossen',
      lever: 'Erhalt statt Neubau, wirtschaftliche Spannweiten, schlanke Decken, Holz- und Hybridbau, zementreduzierte Betone, recycelte Baustoffe',
      plan: 'Diese Emissionen sind mit der Fertigstellung vollständig angefallen. Was hier im Entwurf nicht gespart wird, lässt sich im Betrieb nicht mehr zurückholen.'
    },
    a4: {
      name: 'Errichtung, Module A4 und A5',
      claim: 'Der Weg auf die Baustelle.',
      mods: 'Transport zur Baustelle, Bau- und Montageprozess, Baustellenabfälle',
      what: 'Lkw-Transporte, Energie auf der Baustelle, Verschnitt und Verpackung',
      lever: 'Regionale Bezugsquellen, Vorfertigung im Werk, durchdachte Baustellenlogistik, Abfalltrennung vor Ort',
      plan: 'Der Anteil an der Bilanz ist vergleichsweise klein. Vorfertigung verkürzt aber zugleich Bauzeit und Störungen im Umfeld — hier trifft Nachhaltigkeit direkt auf den Terminplan.'
    },
    b1: {
      name: 'Instandhaltung und Ersatz, Module B1 bis B5',
      claim: 'Ein Gebäude wird mehrmals gebaut.',
      mods: 'Nutzung, Instandhaltung, Reparatur, Ersatz, Umbau',
      what: 'Jeder Austausch von Fassade, Dach, Fenstern und Gebäudetechnik innerhalb des Betrachtungszeitraums — jedes Mal mit neuer Herstellung',
      lever: 'Langlebige Bauteile, zugängliche und trennbare Schichten, Technik ohne einbetonierte Leitungen, Grundrisse, die andere Nutzungen zulassen',
      plan: 'Die Gebäudetechnik wird in fünfzig Jahren oft mehrfach erneuert, das Tragwerk nie. Wer beides voneinander löst, spart bei jedem Austausch — und macht aus dem nächsten Umbau keinen Abriss.'
    },
    b6: {
      name: 'Betrieb, Module B6 und B7',
      claim: 'Der Teil, den alle kennen.',
      mods: 'Energiebedarf im Betrieb, Wasserverbrauch',
      what: 'Heizung, Kühlung, Lüftung, Warmwasser, Beleuchtung — und die Frage, woher die Energie kommt',
      lever: 'Kompaktheit, gute Hülle, sommerlicher Wärmeschutz ohne Technik, Tageslicht, erneuerbare Energie vor Ort — in Baden-Württemberg ohnehin mit Photovoltaikpflicht',
      plan: 'Ab 2030 wird jeder Neubau als Nullemissionsgebäude errichtet, neue öffentliche Nichtwohngebäude schon ab 2028. Je besser der Betrieb wird, desto größer wird der Anteil der Herstellung an der Bilanz.'
    },
    c1: {
      name: 'Rückbau, Module C1 bis C4',
      claim: 'Das Ende ist Teil des Entwurfs.',
      mods: 'Rückbau, Transport, Abfallbehandlung, Beseitigung',
      what: 'Abbruch, Sortierung, Deponie und Verbrennung — besonders dort, wo Baustoffe verklebt oder verschäumt sind',
      lever: 'Lösbare Verbindungen, sortenreine Schichten, dokumentierte Materialien, schadstofffreie Bauprodukte',
      plan: 'Bau- und Abbruchabfälle machen mehr als die Hälfte des Abfallaufkommens in Deutschland aus. Ob ein Gebäude dazu beiträgt, entscheidet sich im Detail — geschraubt oder geklebt.'
    },
    d: {
      name: 'Wiederverwendung und Recycling, Modul D',
      claim: 'Was nach dem Gebäude bleibt.',
      mods: 'Wiederverwendung, Recycling und Energierückgewinnung jenseits der Systemgrenze',
      what: 'Keine Emissionen, sondern Potenziale: Bauteile und Materialien, die im nächsten Gebäude Primärrohstoffe ersetzen',
      lever: 'Rückbaugerechtes Konstruieren, Materialpass, Bauteile aus dem Rückbau, Planung in Modulen und Rastern',
      plan: 'Modul D wird getrennt ausgewiesen und nicht verrechnet. Eine gute Wiederverwendbarkeit entschuldigt also keine schlechte Herstellung — sie ist ein zusätzlicher Wert.'
    }
  };
  Expertise.drawPanel({ root: '#lebenszyklus', data: LZ, initial: 'a1' });
})();
