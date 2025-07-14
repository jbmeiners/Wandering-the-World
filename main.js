// Album links - ISO Alpha-3 country codes
const albumLinks = {
  "ECU": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9",
  "CHN": "https://photos.app.goo.gl/N9SYsuYxfsLpmN35A",
  "HND": "https://photos.app.goo.gl/2ZrPVx21DUVhtWo29",
  "GTM": "https://photos.app.goo.gl/AESH3PKSnDmuo1r49",
  "MEX": "https://photos.app.goo.gl/C4zcTB61eXuCDri5A",
  "PER": "https://photos.app.goo.gl/bed4JQ6gMqhVekFA8",
  "NIC": "https://photos.app.goo.gl/cxqRjSRVwKZvJeBo9",
  "CRI": "https://photos.app.goo.gl/qaYthYA3FrJbNvzMA"
};

// Initialize map with tight bounds to prevent world wrapping
var map = L.map('map', {
  worldCopyJump: false,
  maxBounds: [
    [-60, -160], // Southwest corner
    [85, 180]    // Northeast corner
  ],
  maxBoundsViscosity: 1.0,
  minZoom: 2,
  maxZoom: 6
}).setView([25, 10], 2);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch GeoJSON country shapes
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

        layer.bindTooltip(name);

        if (albumLinks[code]) {
          const popupHtml = `
            <strong>${name}</strong><br>
            <a href="${albumLinks[code]}" target="_blank" rel="noopener noreferrer">
              📸 View pictures from ${name}
            </a>
          `;

          layer.bindPopup(popupHtml);
          layer.on("click", function () {
            this.openPopup();
          });
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON load error:", err));
