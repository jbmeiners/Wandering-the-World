const countryAlbumLinks = {
  "ECU": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9",
  "CHN": "https://photos.app.goo.gl/N9SYsuYxfsLpmN35A"
  // Add more countries here, use 3-letter ISO codes (feature.id)
};

const stateAlbumLinks = {
  "CA": "https://photos.app.goo.gl/californiaAlbumLink",
  "TX": "https://photos.app.goo.gl/texasAlbumLink"
  // Add more states here with 2-letter postal codes (feature.properties.postal)
};

const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let countriesLayer;
let usStatesLayer;

function styleCountries(feature) {
  return {
    fillColor: countryAlbumLinks[feature.id] ? "#ff8800" : "#00aaff",
    fillOpacity: countryAlbumLinks[feature.id] ? 0.6 : 0.2,
    weight: 1,
    color: "#666"
  };
}

function styleStates(feature) {
  return {
    fillColor: stateAlbumLinks[feature.properties.postal] ? "#ff8800" : "#00aaff",
    fillOpacity: stateAlbumLinks[feature.properties.postal] ? 0.6 : 0.2,
    weight: 1,
    color: "#666"
  };
}

function onEachCountry(feature, layer) {
  const code = feature.id;
  const name = feature.properties.name;
  layer.bindTooltip(name);
  if (countryAlbumLinks[code]) {
    const popupHtml = `
      <strong>${name}</strong><br>
      <a href="${countryAlbumLinks[code]}" target="_blank" rel="noopener noreferrer">
        📸 View pictures from ${name}
      </a>`;
    layer.bindPopup(popupHtml);
    layer.on('click', () => layer.openPopup());
  }
}

function onEachState(feature, layer) {
  const code = feature.properties.postal;
  const name = feature.properties.name;
  layer.bindTooltip(name);
  if (stateAlbumLinks[code]) {
    const popupHtml = `
      <strong>${name}</strong><br>
      <a href="${stateAlbumLinks[code]}" target="_blank" rel="noopener noreferrer">
        📸 View pictures from ${name}
      </a>`;
    layer.bindPopup(popupHtml);
    layer.on('click', () => layer.openPopup());
  }
}

// Load countries
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(res => res.json())
  .then(data => {
    countriesLayer = L.geoJSON(data, {
      style: styleCountries,
      onEachFeature: onEachCountry
    });
    countriesLayer.addTo(map);
    console.log("Countries layer loaded");
  });

// Load US states
fetch('https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json')
  .then(res => res.json())
  .then(data => {
    usStatesLayer = L.geoJSON(data, {
      style: styleStates,
      onEachFeature: onEachState
    });
    // Do NOT add to map initially
    console.log("US states layer loaded");
  });

map.on('zoomend', () => {
  const zoom = map.getZoom();
  console.log("Zoom level:", zoom);
  if (zoom >= 5) {
    if (countriesLayer && map.hasLayer(countriesLayer)) {
      map.removeLayer(countriesLayer);
    }
    if (usStatesLayer && !map.hasLayer(usStatesLayer)) {
      usStatesLayer.addTo(map);
    }
  } else {
    if (usStatesLayer && map.hasLayer(usStatesLayer)) {
      map.removeLayer(usStatesLayer);
    }
    if (countriesLayer && !map.hasLayer(countriesLayer)) {
      countriesLayer.addTo(map);
    }
  }
});
