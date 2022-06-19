// console.log('connceted!')
// create the map object with the center at the SF airport 
let map = L.map('mapid', {
    center: [
        37.5, -122.5
    ],
    zoom: 10
});

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// 
// GeoJSON objects are added to the map through a GeoJSON layer, L.geoJSON()
// 
// The pointToLayer Function
// =========================
// L.geoJSON(sanFranAirport, {
//     // turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup(`<h3>${feature.properties.name}</h3><hr><h5>${feature.properties.city}, ${feature.properties.country}</h5>`)
//     }
// }).addTo(map)


// The onEachFeature Function
// ==========================
// use the onEachFeature callback function to add a popup marker for each feature and add data from the properties of the JavaScript object
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup(`Airport code: <b>${feature.properties.faa}</b><hr>Airport name: <b>${feature.properties.name}</b>`);
    }
}).addTo(map);


// add a circle marker
// L.circleMarker([37.622452, -122.384072], {
//     radius: 30,
//     color: 'red',
//     fillColor: '#ffffa5'
// }).addTo(map);

// create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/navigation-night-v1',
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);