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
    });
    countriesLayer.addTo(map);  // Add countries layer on load
  });
