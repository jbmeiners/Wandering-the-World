// Set initial view centered on Ecuador
var map = L.map('map').setView([-1.5, -78], 5);

// Add base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Album links by ISO code
const albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// Use the Johan GeoJSON source with "id" as ISO code
const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

// Load the country shapes and display them
fetch(geoUrl)
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: f => ({
        color: "#666",
        weight: 1,
        fillColor: albumLinks[f.id] ? "#ff8800" : "#00aaff",
        fillOpacity: albumLinks[f.id] ? 0.6 : 0.2
      }),
      onEachFeature: (f, layer) => {
        const code = f.id;
        const name = f.properties.name;

        // Tooltip on hover
        layer.bindTooltip(name, { interactive: true });

        // If we have an album for this country, show a popup with a link
        if (albumLinks[code]) {
          layer.on("click", function (e) {
            const popupContent = `
              <strong>${name}</strong><br/>
              <a href="${albumLinks[code]}" target="_blank" rel="noopener noreferrer">
                📸 View Photo Album
              </a>
            `;
            // Bind and open popup correctly
            layer.bindPopup(popupContent).openPopup();
          });
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error loading GeoJSON:", err));
