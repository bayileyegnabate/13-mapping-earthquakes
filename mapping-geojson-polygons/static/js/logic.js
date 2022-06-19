// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/majorAirports.json";

// Accessing the Toronto airline GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL
let torontoNeighborhoods = "https://raw.githubusercontent.com/bayileyegnabate/13-mapping-earthquakes/main/torontoNeighborhoods.json";



// create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
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
    color: '#ffffa1',
    weight: 2
}

// use d3 to retrieve the json data
d3.json(torontoNeighborhoods).then(function(data) {
    console.log(data);
    // create a GeoJSON layer with the retrieved data and add popup marker
    L.geoJSON(data, {
        style: lineStyle,
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup(`Airline: <span class='popup-bold'>${feature.properties.AREA_NAME}</span><hr>Destination: <span class='popup-bold'>${feature.properties.dst}</span>`);
        }
    })
    .addTo(map);
});
