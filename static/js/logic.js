// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/majorAirports.json";

// create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    // layer: [streets]
});

// create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);

// create a base layer tha holds both maps
let baseMaps = {};

let mapboxStyles = {
    street: 'streets-v11',
    outdoor: 'outdoors-v11',
    light: 'light-v10', 
    dark: 'dark-v10',
    satellite: 'satellite-v9',
    sateStreets: 'satellite-streets-v11',
    navigDay: 'navigation-day-v1',
    navigNight: 'navigation-night-v1'
}

// create the different layer styles
Object.keys(mapboxStyles).forEach((style) => baseMaps[style] = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: `mapbox/${mapboxStyles[style]}`,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}));

// pass the map layers to layers control abd add the layers control to map
L.control.layers(baseMaps).addTo(map);

// use d3 to retrieve the json data
d3.json(airportData).then(function(data) {
    console.log(data);
    // create a GeoJSON layer with the retrieved data and add popup marker
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup(`Airport code: <span class='popup-bold'>${feature.properties.faa}</span><hr>Airport name: <span class='popup-bold'>${feature.properties.name}, ${feature.properties.country}</span>`);
        }
    }).addTo(map);
});



