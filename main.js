// Initialize the map centered on Ecuador
var map = L.map('map').setView([-1.5, -78], 5);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Google Photos albums by country code
const albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// Load country shapes
fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({
        color: "#666",
        weight: 1,
        fillColor: albumLinks[feature.id] ? "#ff8800" : "#00aaff",
        fillOpacity: albumLinks[feature.id] ? 0.6 : 0.2
      }),
      onEachFeature: (feature, layer) => {
        const code = feature.id;
        const name = feature.properties.name;

        // Always bind tooltip
        layer.bindTooltip(name);

        // If we have an album for this country, show popup with a link
        if (albumLinks[code]) {
          const popupContent = `
            <div>
              <strong>${name}</strong><br>
              <a href="${albumLinks[code]}" target="_blank" rel="noopener noreferrer">
                📸 View Photo Album
              </a>
            </div>
          `;

          layer.bindPopup(popupContent);

          layer.on("click", function () {
            this.openPopup();
          });
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON error:", err));
