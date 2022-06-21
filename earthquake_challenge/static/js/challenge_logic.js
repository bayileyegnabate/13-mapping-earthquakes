// Add console.log to check to see if our code is working.
console.log("connceted!");

// // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// create a base layer 
let baseMaps = {
  streets: streets,
};

let mapboxStyles = {
    light: 'light-v10', 
    dark: 'dark-v10',
    outdoor: 'outdoors-v11',
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
    accessToken: API_KEY
}));


// --------------------------------------------------
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// 1. Add a 2nd layer group for the tectonic plate data.
let allEarthquakes = new L.LayerGroup();
let tectonics = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();



// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonics": tectonics,
  "Major Earthquakes": majorEarthquakes
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data
// =====================================
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
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

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup(`Magnitude: <span class="popup-bold">${feature.properties.mag}</span><br>Location: <span class="popup-bold">${feature.properties.place}</span>`);
      layer.on('mouseover', (e) => e.target.openPopup());
      layer.on('mouseout', (e) => e.target.closePopup());
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);

// =============
// DELIVERABLE 2
// =============

// 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
// ====================================================================
let majorEqData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
d3.json(majorEqData).then(function(data) {
  // 4. Use the same style as the earthquake data.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
    }
  }

  // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 6) {
      return "#4475F2";
    }
    if (magnitude > 5) {
      // return "#ea822c";
      return "#EC4038";
    }
    if (magnitude <= 5) {
      // return "#ee9c00";
      return "#964EE8";
    }
  }

  // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  // sets the style of the circle, and displays the magnitude and location of the earthquake
  //  after the marker has been created and styled.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // Style each circle with styleInfo() function
    style: styleInfo,
    // Create a popup for the circle to display the magnitude and location of the earthquake
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<span class='clr-blue'>Major Earthquake</span><hr>Magnitude: <span class="popup-bold">${feature.properties.mag}</span><br>Title: <span class="popup-bold">${feature.properties.title}</span>`);
      layer.on('mouseover', (e) => e.target.openPopup());
      layer.on('mouseout', (e) => e.target.closePopup());
    }
  }).addTo(majorEarthquakes);
  // 8. Add the major earthquakes layer to the map.
  majorEarthquakes.addTo(map);
  // 9. Close the braces and parentheses for the major earthquake data.
  });
});

// Here we create a legend control object.
let legend = L.control({
  position: "bottomright",
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];
  // Looping through our intervals to generate a label with a colored square for each interval
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
    magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};

// Finally, we our legend to the map.
legend.addTo(map);


// 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
let tectonicBoundaries = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

let tectonicStyles = {
color: '#D43171',
weight: 1.5
}

d3.json(tectonicBoundaries).then( function(data) {
  console.log(data);
  // create a GeoJSON layer with the retrieved data and add popup marke
  L.geoJSON(data, {
    // turn each feature into a circleMarker on the map
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: tectonicStyles
    // add to tectonics
  }).addTo(tectonics);
// add to map
tectonics.addTo(map);
});