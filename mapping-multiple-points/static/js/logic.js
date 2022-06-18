// console.log('connceted!')

const cityData = cities;

// create the map object with a center and zoom level
let map = L.map('mapid', {
	center: [
		40.7, -94.5
	],
	zoom: 4
});

// add a marker to the map for Los Angeles, California
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// loop through the cities array and create one marker for reach city
// let markers = cityData.forEach(function(city) {
//     L.marker(city.location)
//     .bindPopup(`<h2>${city.city}, ${city.state}</h2><hr><h3>Population ${city.population.toLocaleString()}</h3>`)
//     .addTo(map);
// });

// change the marker for reach city to a circle that has a radius equivalent to the city's population\
// let markers = cityData.forEach(function(city) {
//     L.circleMarker(city.location, {
//         radius: city.population * 0.00001,
//         color: 'purple',
//         fillColor: 'lightgreen'
//     })
//     .bindPopup(`<h2>${city.city}, ${city.state}</h2><hr><h3>Population ${city.population.toLocaleString()}</h3>`)
//     .addTo(map);
// });

// create an orange circle popup marker for each city, with a lineweight of 4, a radius where the population number is decreased by 200,000

let markers = cityData.forEach(function(city) {
    L.circleMarker(city.location, {
        radius: city.population / 200000,
        color: 'orange',
        lineweight: 4,
        fillColor: ''
    })
    .bindPopup(`<h2>${city.city}, ${city.state}</h2><hr><h3>Population ${city.population.toLocaleString()}</h3>`)
    .addTo(map);
});

// markers.forEach((marker) => marker.on('mouseover', (e) => marker.closePopup));
 
 // add a circle marker to the map for LA, Ca
 // L.circle([34.0522, -118.2437], {
 //    radius: 500,
 //    color: 'red'
 // }).addTo(map);

// create a light-yellow circle with black lines indicating a 300-meter radius
L.circle([34.0522, -118.2437], {
    radius: 300,
    color: 'black',
    fillColor: 'yellow'
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