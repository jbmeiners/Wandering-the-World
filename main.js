// Set up the base map
var map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Define album links by ISO country code
var albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// Load GeoJSON for countries
fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const code = feature.properties.ISO_A2;
        const name = feature.properties.ADMIN;

        // Show country name on hover
        layer.bindTooltip(name, { permanent: false });

        // Add click behavior
        layer.on("click", function () {
          if (albumLinks[code]) {
            window.open(albumLinks[code], "_blank");
          } else {
            alert("No album linked for " + name);
          }
        });

        // Optional: change style on hover
        layer.on("mouseover", function () {
          layer.setStyle({ weight: 2, color: "#333", fillOpacity: 0.4 });
        });
        layer.on("mouseout", function () {
          layer.setStyle({ weight: 1, color: "#666", fillOpacity: 0.2 });
        });

        // Style for each country
        layer.setStyle({
          color: "#666",
          weight: 1,
          fillColor: "#00aaff",
          fillOpacity: 0.2
        });
      }
    }).addTo(map);
  });
