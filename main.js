// Initialize the map centered on Ecuador
var map = L.map('map').setView([-1.5, -78], 5);

// Add the base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Album links by ISO country code
const albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// GeoJSON source with country shapes
const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

fetch(geoUrl)
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "#666",
          weight: 1,
          fillColor: albumLinks[feature.id] ? "#ff8800" : "#00aaff",
          fillOpacity: albumLinks[feature.id] ? 0.6 : 0.2
        };
      },
      onEachFeature: function (feature, layer) {
        const code = feature.id;
        const name = feature.properties.name;

        layer.bindTooltip(name, { interactive: true });

        // Always bind popup — with album link if exists
        let popupContent = `<strong>${name}</strong>`;
        if (albumLinks[code]) {
          popupContent += `<br><a href="${albumLinks[code]}" target="_blank" rel="noopener noreferrer">📸 View Photo Album</a>`;
        }

        layer.bindPopup(popupContent);

        // Open popup on click (so it works even if user clicks multiple times)
        layer.on("click", function (e) {
          layer.openPopup(e.latlng);
        });
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON load error:", err));
