var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
    // Perform a GET request to the query URL
d3.json(url, function(data) {
  console.log(data.features);
  //  Once we get the response, send the data.features to the createFeatures function 
  createFeatures(data.features)
  });

  function createFeatures(earthquakeData){
        // Create a GeoJSON layer containing the features array on the earthquakeData object
        // define the radius, color and other properties of marker
    function onEachFeature(feature, layer){
      // use onEachFeature function to pop up place, magnitude and time of earthquake
      layer.bindPopup ("<h3>" + feature.properties.place + "</h3><hr><p>S" + 
                    (feature.properties.time) + "</p>" + "<hr>" + 
                    "Magnitude of the earthquake =  " + feature.properties.mag);
        }
    function getColor(d) {
      switch (true) {
      case d > 6:
        return '#7a0177';
      case d > 5:  
        return '#ae017e';
      case d > 4:
        return '#dd3497';
      case d >3:
        return '#f768a1';
      case d > 2:
        return '#fa9fb5';
      case d >1:
        return '#fcc5c0';
      default: 
        return '#feebe2';
        }
      }
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
      var color = getColor(feature.properties.mag); 
      var geojsonMarkerOptions = {
        radius: feature.properties.mag*5,
        fillColor: getColor(feature.properties.mag), 
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
        return L.circleMarker(latlng, geojsonMarkerOptions);
          },
  });

// Sending our earthquakes layer to the createMap function

   createMap(earthquakes);
    }
  // grayscale map tiles
    function createMap(earthquakes){
    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
    // dark map tiles
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
      });
      // grayscale map tiles
    var grayscalemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.grayscale",
      accessToken: API_KEY
      });  
      // outdoor map tiles
    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.outdoors",
      accessToken: API_KEY
      });
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Satellite Map": satellitemap,
      "Street Map": streetmap,
      "Gray Scale": grayscalemap,
      "Out Doors": outdoorsmap
      };

    var overlayMaps = {
      Earthquakes : earthquakes
      };
    // Create a new map
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
      });

    // Create a layer control containing our baseMaps
    // Be sure to add an overlay Layer containing the earthquake GeoJSON
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(myMap);
      // ==========================================================================================
      // Create a legend that will provide context for your map data
      var legend = L.control({position: 'bottomright'});
      legend.onAdd = function(myMap) {
          var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3, 4, 5, 6],
              labels = [];
          // loop through our density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < grades.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          }
          return div;
      };
      legend.addTo(myMap);
    }