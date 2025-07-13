// Set initial view centered on Ecuador
var map = L.map('map').setView([-1.5, -78], 5);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Photo album links by ISO code
const albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// Use the Johan geojson file where "id" = ISO code
const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

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

        // Click to open album if available
        if (albumLinks[code]) {
          layer.on("click", () => window.open(albumLinks[code], "_blank"));
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error loading GeoJSON:", err));
