// Initialize map
var map = L.map('map').setView([0, -78], 4); // Center near Ecuador

// Add base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Album links by ISO country code
var albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// Load country GeoJSON
fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
  .then(response => {
    if (!response.ok) throw new Error("GeoJSON fetch failed");
    return response.json();
  })
  .then(data => {
    L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "#666",
          weight: 1,
          fillColor: "#00aaff",
          fillOpacity: 0.2
        };
      },
      onEachFeature: function (feature, layer) {
        const code = feature.properties.ISO_A2;
        const name = feature.properties.ADMIN;

        // Tooltip on hover
        layer.bindTooltip(name);

        // Make clickable if there's an album
        if (albumLinks[code]) {
          layer.on("click", function () {
            window.open(albumLinks[code], "_blank");
          });

          // Optional: highlight album-linked countries
          layer.setStyle({
            fillColor: "#ff9900", // Different color for countries with albums
            fillOpacity: 0.5
          });
        }
      }
    }).addTo(map);
  })
  .catch(err => {
    console.error("GeoJSON load error:", err);
  });
