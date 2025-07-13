const countryAlbumLinks = {
  "ECU": "https://photos.app.goo.gl/2WRE3e5T3aumguWS9",
  "CHN": "https://photos.app.goo.gl/N9SYsuYxfsLpmN35A"
};

const stateAlbumLinks = {
  "SC": "https://photos.app.goo.gl/juKhxjzKhdjEWcGG6"
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
    fillOpacity:
