// Album links - ISO Alpha-3 country codes
const albumLinks = {
  "ECU": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
  "CHN": "https://photos.app.goo.gl/N9SYsuYxfsLpmN35A"
};

// Initialize map centered on Ecuador
var map = L.map('map').setView([-1.5, -78], 5);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch GeoJSON data
fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
  .then(res => {
    console.log("GeoJSON fetch status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("GeoJSON features count:", data.features.length);

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

        // Tooltip on hover with country name
        layer.bindTooltip(name);

        if (albumLinks[code]) {
          // Popup content with dynamic country name and clickable link
          const popupHtml = `
            <strong>${name}</strong><br>
            <a href="${albumLinks[code]}" target="_blank" rel="noopener noreferrer">
              📸 View pictures from ${name}
            </a>
          `;

          layer.bindPopup(popupHtml);

          // Open popup on click
          layer.on("click", function () {
            this.openPopup();
          });
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON load error:", err));
