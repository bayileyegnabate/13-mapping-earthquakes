// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/majorAirports.json";

// Accessing the Toronto airline GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL
let torontoNeighborhoods = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/torontoNeighborhoods.json";

// 
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
});

// create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
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
    satelliteStreets: 'satellite-streets-v11',
    navigationDay: 'navigation-day-v1',
    navigationNight: 'navigation-night-v1'
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

let lineStyle = {
    color: '#5988F3',
    weight: 1
}

// use d3 to retrieve the json data
d3.json(earthquakeData).then(function(data) {
    console.log(data);
    // create a GeoJSON layer with the retrieved data and add popup marker
    L.geoJSON(data, {
        style: lineStyle,
        onEachFeature: function(feature, layer) {
            console.log(feature.properties.place);
            layer.bindPopup(`Earthquake place: <span class='popup-bold'>${feature.properties.mag}</span>`);
        }
    })
    .addTo(map);
});
