const countryAlbumLinks = {
  "ECU": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9",
  "CHN": "https://photos.app.goo.gl/N9SYsuYxfsLpmN35A"
};

const stateAlbumLinks = {
  "SC": "https://photos.app.goo.gl/juKhxjzKhdjEWcGG6"
};

const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let countriesLayer;
let usStatesLayer;

// Load countries GeoJSON
fetch('countries.geojson')
  .then(res => res.json())
  .then(data => {
    countriesLayer = L.geoJSON(data, {
      style: feature => ({
        fillColor: countryAlbumLinks[feature.id] ? "#ff8800" : "#00aaff",
        fillOpacity: countryAlbumLinks[feature.id] ? 0.6 : 0.2,
        weight: 1,
        color: "#666"
      }),
      onEachFeature: (feature, layer) => {
        const code = feature.id;
        const name = feature.properties.name;
        layer.bindTooltip(name);

        if (countryAlbumLinks[code]) {
          layer.bindPopup(`
            <strong>${name}</strong><br>
            <a href="${countryAlbumLinks[code]}" target="_blank" rel="noopener noreferrer">
              📸 View pictures from ${name}
            </a>
          `);
          layer.on('click', () => layer.openPopup());
        }
      }
    }).addTo(map);
  });

// Load US States GeoJSON
fetch('us-states.geojson')
  .then(res => res.json())
  .then(data => {
    usStatesLayer = L.geoJSON(data, {
      style: feature => ({
        fillColor: stateAlbumLinks[feature.properties.postal] ? "#ff8800" : "#00aaff",
        fillOpacity: stateAlbumLinks[feature.properties.postal] ? 0.6 : 0.2,
        weight: 1,
        color: "#666"
      }),
      onEachFeature: (feature, layer) => {
        const code = feature.properties.postal;
        const name = feature.properties.name;
        layer.bindTooltip(name);

        if (stateAlbumLinks[code]) {
          layer.bindPopup(`
            <strong>${name}</strong><br>
            <a href="${stateAlbumLinks[code]}" target="_blank" rel="noopener noreferrer">
              📸 View pictures from ${name}
            </a>
          `);
          layer.on('click', () => layer.openPopup());
        }
      }
    });
  });

// Control visibility based on zoom level
map.on('zoomend', () => {
  if (map.getZoom() >= 5) {
    if (countriesLayer) map.removeLayer(countriesLayer);
    if (usStatesLayer) usStatesLayer.addTo(map);
  } else {
    if (usStatesLayer) map.removeLayer(usStatesLayer);
    if (countriesLayer) countriesLayer.addTo(map);
  }
});
