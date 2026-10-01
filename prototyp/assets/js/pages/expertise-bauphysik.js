/* Bauphysik: Inhalte der Wandaufbauten für das Panel
   (Interaktion: pages/expertise.js) */
(function () {
  'use strict';
  var AW = {
    aw1: {
      name: '01 Monolithisches Ziegelmauerwerk',
      claim: 'Eine Schicht, die alles kann — ein bisschen.',
      u: 'U-Wert etwa 0,16 bis 0,20 W/(m²·K) bei 42,5 cm und einer Wärmeleitfähigkeit von 0,07 bis 0,08 W/(m·K)',
      m: 'Mittel — die Porosierung, die dämmt, senkt zugleich Rohdichte und Speicherfähigkeit',
      f: 'Unkritisch: kapillaraktiv, diffusionsoffen, ohne Schichtwechsel, an dem Tauwasser anfällt',
      s: 'Die Schwachstelle des Aufbaus — bei Außenlärm oder leichten Innenwänden früh prüfen statt spät verglasen',
      l: 'Energieintensive Herstellung, dafür sortenrein und ohne Verbundstoffe rückbaubar',
      p: 'Die ehrlichste Wand: eine Schicht, eine Laibung, ein Anschlussdetail. Der Preis ist die Konstruktionstiefe — rund 50 cm, die im Grundriss fehlen, und eine Laibung, die das Fassadenbild bestimmt.'
    },
    aw2: {
      name: '02 Wärmedämmverbundsystem',
      claim: 'Die dünnste Hülle, der schwierigste Rückbau.',
      u: 'U-Wert etwa 0,14 bis 0,20 W/(m²·K) bei 16 bis 20 cm Dämmung auf einer tragenden Massivschale',
      m: 'Hoch — die Speichermasse liegt innen, wo sie im Sommer arbeitet',
      f: 'Schichtabhängig: außen dampfbremsend (Polystyrol) oder diffusionsoffen (Mineralwolle, Holzfaser) — die Entscheidung fällt mit dem Innenklima, nicht mit dem Preis',
      s: 'Gut durch die schwere Schale; das Dämmsystem selbst wirkt als Masse-Feder-Masse-System und kann einzelne Frequenzen verschlechtern',
      l: 'Verbund aus Kleber, Dämmstoff, Gewebe und Putz — schwer trennbar. Der Entsorgungspfad ist heute das Hauptargument gegen das System',
      p: 'Gestalterisch das größte Risiko: die Dämmebene sitzt vor der Tragebene. Attika, Sockel, Laibung und Fensteranschlag müssen gezeichnet werden — sonst zeichnet sie der Verarbeiter.'
    },
    aw3: {
      name: '03 Zweischaliges Mauerwerk',
      claim: 'Die robusteste Konstruktion, die wir bauen können.',
      u: 'U-Wert etwa 0,15 bis 0,18 W/(m²·K) bei 14 bis 16 cm Kerndämmung',
      m: 'Sehr hoch, und zusätzlich eine zweite massive Schale vor der Dämmebene',
      f: 'Sehr robust: Schlagregen wird vor der Dämmebene abgeführt, die Luftschicht trocknet rück — der Aufbau mit der größten Fehlertoleranz',
      s: 'Der beste Wert der fünf — zwei massive Schalen, konstruktiv entkoppelt',
      l: 'Hoher Materialeinsatz, dafür Nutzungsdauern jenseits von achtzig Jahren. Auf das Jahr gerechnet oft besser als die dünnere Variante',
      p: 'Sichtbares Mauerwerk ist eine Entwurfshaltung, keine Bekleidung. Es verlangt früh entschiedene Fugenbilder, Stürze, Sockel und Dehnfugen — und 50 bis 55 cm Wandstärke im Grundriss.'
    },
    aw4: {
      name: '04 Holzrahmenbau',
      claim: 'Leicht, schnell, empfindlich an vier Stellen.',
      u: 'U-Wert etwa 0,13 bis 0,18 W/(m²·K) bei 24 cm Gefachdämmung und dämmender Beplankung',
      m: 'Gering — für den Sommer die Kernfrage. Schwere Dämmstoffe und massive Innenbauteile gleichen einen Teil aus',
      f: 'Der Nachweis, der wirklich gerechnet gehört: instationär statt mit dem vereinfachten Verfahren, inklusive Baufeuchte und Witterung während der Montage',
      s: 'Flankenübertragung und Trittschall entscheiden, nicht das Trennbauteil — der Nachweis ist deutlich aufwendiger als im Massivbau',
      l: 'Der beste Wert der fünf in der Herstellungsphase, mit im Bauteil gebundenem Kohlenstoff',
      p: 'Hier kippt die Reihenfolge: Luftdichtheitsebene, Installationsführung und Bekleidung gehören in die Entwurfsplanung. Und in den Gebäudeklassen 4 und 5 koppelt der Brandschutz die Sichtbarkeit des Holzes an die Bekleidung.'
    },
    aw5: {
      name: '05 Innendämmung im Bestand',
      claim: 'Der Fall, in dem die Norm nicht mehr weiterhilft.',
      u: 'U-Wert etwa 0,30 bis 0,50 W/(m²·K) — begrenzt, und das ist beabsichtigt',
      m: 'Die Speichermasse liegt jetzt außerhalb der Dämmebene und steht dem Raum nicht mehr zur Verfügung',
      f: 'Kritisch: Schlagregenschutz der Fassade, kapillaraktive Systeme, Anschlüsse und Balkenköpfe — jeder dieser Punkte kann den Aufbau kippen',
      s: 'Unverändert gegenüber dem Bestand; Vorsatzschalen verbessern ihn, kosten aber wieder Raumtiefe',
      l: 'Wenig neues Material, erhaltene Substanz — im Lebenszyklus meist die günstigste Variante',
      p: 'Die einzige Lösung, wenn die Fassade bleiben muss. Sie wird nicht über die Dämmstärke optimiert, sondern über das Feuchteverhalten: lieber sechs Zentimeter kapillaraktiv und sicher als zwölf und ein Schaden hinter dem Balkenkopf.'
    }
  };
  Expertise.drawPanel({ root: '#aufbauten', data: AW, initial: 'aw1' });
})();
