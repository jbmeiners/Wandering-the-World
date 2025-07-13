// Album links - use ISO Alpha-3 country codes
const albumLinks = {
  "ECU": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
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

        layer.bindTooltip(name); // Show name tooltip on hover

        if (albumLinks[code]) {
          layer.on("click", function () {
            window.open(albumLinks[code], "_blank", "noopener");
          });
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON load error:", err));
