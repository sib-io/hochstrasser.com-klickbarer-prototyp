/* Anfahrtskarte Karpfengasse 5, Ulm (Kontakt, Büro)
   Vorlage: ausgangstexte/Kontakt-Karte/karte-ulm.html
   Container: <div class="media media--16x10 karte" data-karte></div>
   Braucht vendor/maplibre-gl.js (4.7.1, lokal) – Kacheln kommen von OpenFreeMap. */
(function () {
  var el = document.querySelector('[data-karte]');
  if (!el || !window.maplibregl) return;

  // Koordinaten von Karpfengasse 5 als [Längengrad, Breitengrad]
  var ADRESSE = [9.995305, 48.398713];

  // Routen-Link: öffnet Google Maps im neuen Tab bzw. mobil die Google-Maps-App.
  // Es werden erst beim Klick Daten an Google übertragen.
  var ROUTE_URL = 'https://www.google.com/maps/dir/?api=1&destination='
    + encodeURIComponent('Karpfengasse 5, 89073 Ulm');

  var ADRESS_TEXT =
    '<span class="karte__name">hochstrasser.</span>' +
    'Karpfengasse 5<br>89073 Ulm<br>' +
    '<a class="link-arrow karte__route" href="' + ROUTE_URL + '" target="_blank" rel="noopener noreferrer">Route <span aria-hidden="true">→</span></a>' +
    '<span class="karte__hinweis">öffnet Google Maps</span>';

  // Ulmer Münster (eigenes Label, damit es sicher angezeigt wird)
  var MUENSTER = [9.9925, 48.3986];

  var map = new maplibregl.Map({
    container: el,
    style: 'https://tiles.openfreemap.org/styles/positron',
    center: ADRESSE,
    zoom: 15.5,
    maxZoom: 19.5,
    cooperativeGestures: true, // Scrollen auf der Seite zoomt nicht ungewollt die Karte
    locale: {
      'CooperativeGesturesHandler.WindowsHelpText': 'Strg + Scrollen zum Zoomen der Karte',
      'CooperativeGesturesHandler.MacHelpText': '⌘ + Scrollen zum Zoomen der Karte',
      'CooperativeGesturesHandler.MobileHelpText': 'Mit zwei Fingern die Karte bewegen',
      'NavigationControl.ZoomIn': 'Vergrößern',
      'NavigationControl.ZoomOut': 'Verkleinern',
      'AttributionControl.ToggleAttribution': 'Quellenangaben ein-/ausblenden',
      'Popup.Close': 'Schließen',
      'Map.Title': 'Karte',
      'Marker.Title': 'Karpfengasse 5, 89073 Ulm'
    }
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

  map.on('load', function () {
    // 1) Straßennamen früher einblenden – Positron zeigt Namen kleiner Straßen erst sehr spät
    map.getStyle().layers.forEach(function (layer) {
      if (layer['source-layer'] === 'transportation_name') {
        map.setLayerZoomRange(layer.id, Math.min(layer.minzoom || 0, 14), layer.maxzoom || 24);
      }
    });

    // 2) Hausnummern (sind in den Daten enthalten, Positron blendet sie nur aus)
    map.addLayer({
      id: 'hausnummern',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'housenumber',
      minzoom: 17,
      layout: {
        'text-field': ['get', 'housenumber'],
        'text-font': ['Noto Sans Regular'],
        'text-size': 10
      },
      paint: {
        'text-color': '#8a8a8a',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1
      }
    });

    // 3) Ulmer Münster als eigenes Label
    map.addSource('orte', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: { type: 'Point', coordinates: MUENSTER },
          properties: { name: 'Ulmer Münster' }
        }]
      }
    });
    map.addLayer({
      id: 'orte-label',
      type: 'symbol',
      source: 'orte',
      minzoom: 13,
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Noto Sans Bold'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 13, 11, 17, 15],
        'text-allow-overlap': true
      },
      paint: {
        'text-color': '#555555',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1.5
      }
    });

    // 4) Adressmarker mit Popup
    var marker = document.createElement('div');
    marker.className = 'karte__marker';
    marker.setAttribute('aria-label', 'Karpfengasse 5, 89073 Ulm');
    new maplibregl.Marker({ element: marker })
      .setLngLat(ADRESSE)
      .setPopup(new maplibregl.Popup({ offset: 14, focusAfterOpen: false }).setHTML(ADRESS_TEXT))
      .addTo(map);
  });
})();
