// console.log('connceted!')

const cityData = cities;

// create the map object with a center and zoom level
let map = L.map('mapid', {
	center: [
		40.7, -94.5
	],
	zoom: 4
});

// coordinates for each point
let line = [
    // LA to SFO
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    // SLC to SEA
    [40.7899, -111.9791],
    [47.4502, -122.3088]
];

let newRoute = [
    [36.167256, -115.148516],
    [33.9416, -118.4085],
    [30.1167, -97.4019],
    [43.4038, -79.3750],
    [40.3840, -73.4672],
    [41.974162, -87.907321]
]

// create a polyline using the line coordiantes
L.polyline(line, {
    color: 'red'
}).addTo(map);

// 
L.polyline(newRoute, {
    color: '#ffffa3',
    dashArray: '7, 7'
}).addTo(map);



// create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);