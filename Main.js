var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var albumLinks = {
  "EC": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9",
  
};

fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: "#007bff", weight: 1 },
      onEachFeature: function (feature, layer) {
        layer.on('click', function () {
          const code = feature.properties.iso_a2;
          const album = albumLinks[code];
          if (album) {
            window.open(album, '_blank');
          } else {
            alert("No photos for this country yet.");
          }
        });
      }
    }).addTo(map);
  });
