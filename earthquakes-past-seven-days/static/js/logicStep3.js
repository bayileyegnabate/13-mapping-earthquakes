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

    // styles
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: '#000',
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.512
        }
    }

    // determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
      if (magnitude > 5) {
        return "#ea2c2c";
      }
      if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00";
    }

    // earthquakes with a magnitude of 0 will be plotted with radius of 1
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // create a GeoJSON layer with the retrieved data and add popup marker
    L.geoJSON(data, {
        // style: lineStyle,
        // turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        //  add popups
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Magnitude <span class="popup-bold">${feature.properties.mag}</span><br>Location: <span class="popup-bold">${feature.properties.place}</span>`)

        },
        // set the style for each circleMarker 
        style: styleInfo
    }).addTo(map);
});




