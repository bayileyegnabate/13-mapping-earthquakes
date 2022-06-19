// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/majorAirports.json";

// create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-night-v1',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// create the dark view tile layer
let darklayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a base layer tha holds both maps
let baseMaps = {
    // Street: streets,
    // Dark: darklayer
};

let mapboxStyles = [
    'streets-v11',
    'outdoors-v11',
    'light-v10', 
    'dark-v10',
    'satellite-v9',
    'satellite-streets-v11',
    'navigation-day-v1',
    'navigation-night-v1'    
    ];

mapboxStyles.forEach((style) => baseMaps[style] = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: `mapbox/${style}`,
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
}))

// create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layer: [streets]
});

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



