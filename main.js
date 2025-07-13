// Initialize the map centered on Ecuador
var map = L.map('map').setView([-1.5, -78], 5);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Define album links by country ISO code
const albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// Load countries GeoJSON
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

        // Tooltip on hover
        layer.bindTooltip(name, { permanent: false });

        if (albumLinks[code]) {
          // Create the popup content
          const popupHtml = `
            <div>
              <strong>${name}</strong><br>
              <a href="${albumLinks[code]}" target="_blank" rel="noopener noreferrer">
                📸 View Photo Album
              </a>
            </div>
          `;

          // Bind popup during setup (not just on click)
          layer.bindPopup(popupHtml);

          // Open popup on click
          layer.on("click", function (e) {
            this.openPopup(e.latlng);
          });
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON error:", err));
