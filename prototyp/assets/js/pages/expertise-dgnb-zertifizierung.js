/* DGNB / Zertifizierung: Inhalte der Auszeichnungsstufen für das Panel
   (Interaktion: pages/expertise.js) */
(function () {
  'use strict';
  var GK = {
    bronze: {
      name: 'DGNB Bronze',
      claim: 'Nur für bestehende Gebäude.',
      size: 'Ab 35 %',
      parts: 'Kein Mindesterfüllungsgrad je Themenfeld',
      way: 'Gebäude im Betrieb und Bestandsbewertungen — im Neubau wird Bronze nicht vergeben',
      plan: 'Ein ehrlicher erster Befund für Bestandshalter. Er zeigt, wo Sanierung und Betrieb am meisten bewirken, und ist oft der Ausgangspunkt für eine Modernisierung.'
    },
    silber: {
      name: 'DGNB Silber',
      claim: 'Die solide Grundlage.',
      size: 'Ab 50 %',
      parts: 'Ab 35 % in jedem der Themenfelder',
      way: 'Projekte, die Nachhaltigkeit gegenüber Mietern, Banken oder der öffentlichen Hand belegen müssen',
      plan: 'Mit sauberer Planung und lückenloser Dokumentation gut erreichbar. Entscheidend ist, dass kein Themenfeld abfällt — eine schwache Prozessqualität lässt sich nicht mit guter Gebäudetechnik ausgleichen.'
    },
    gold: {
      name: 'DGNB Gold',
      claim: 'Der Maßstab für anspruchsvolle Projekte.',
      size: 'Ab 65 %',
      parts: 'Ab 50 % in jedem der Themenfelder',
      way: 'Büro-, Bildungs- und Wohnungsbau mit langfristigen Eigentümern und institutionellen Investoren',
      plan: 'Erreichbar, wenn Nachhaltigkeit ab der Vorplanung mitläuft: Ökobilanz im Variantenvergleich, schadstoffarme Ausschreibung, Qualitätssicherung auf der Baustelle. Nachträglich wird es teuer.'
    },
    platin: {
      name: 'DGNB Platin',
      claim: 'Hier entscheidet sich alles im Entwurf.',
      size: 'Ab 80 %',
      parts: 'Ab 65 % in jedem der Themenfelder, dazu zusätzliche Mindestanforderungen einzelner Kriterien',
      way: 'Vorbildprojekte öffentlicher Bauherrschaften, Unternehmenszentralen, Projekte mit klimapositivem Anspruch',
      plan: 'Platin ist keine Frage der Ausstattung, sondern der Konzeption. Kubatur, Tragwerk, Material, Energie und Freiraum müssen von Beginn an zusammen gedacht werden — genau dort liegt die Arbeit der Architektur.'
    }
  };
  Expertise.drawPanel({ root: '#auszeichnungsstufen', data: GK, initial: 'gold' });
})();
