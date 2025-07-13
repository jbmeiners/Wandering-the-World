const countryAlbumLinks = {
  "ECU": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9",
  "CHN": "https://photos.app.goo.gl/N9SYsuYxfsLpmN35A"
  // Add more countries here
};

const stateAlbumLinks = {
  "CA": "https://photos.app.goo.gl/californiaAlbumLink",
  "TX": "https://photos.app.goo.gl/texasAlbumLink"
  // Add more US states here
};

const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function styleCountries(feature) {
  return {
    fillColor: countryAlbumLinks[feature.id] ? "#ff8800" : "#00aaff",
    fillOpacity: 0.6,
    weight: 1,
    color: "#666"
  };
}

function styleStates(feature) {
  return {
    fillColor: stateAlbumLinks[feature.properties.postal] ? "#ff8800" : "#00aaff",
    fillOpacity: 0.6,
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
    layer.bindPopup(popupH
