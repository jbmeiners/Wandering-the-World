var map = L.map('map').setView([-1.5, -78], 5); // center on Ecuador

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'© OpenStreetMap contributors'
}).addTo(map);

// Album link using country ISO code
const albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9"
};

// This GeoJSON source uses "id" as the ISO code
const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

fetch(geoUrl)
  .then(r => r.json())
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

        layer.bindTooltip(name, { interactive: true });

        if (albumLinks[code]) {
          layer.on("click", () => window.open(albumLinks[code], "_blank"));
        }
      }
    }).addTo(map);
  })
  .catch(e => console.error("GeoJSON error:", e));
