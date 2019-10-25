function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  var metadataUrl = `/metadata/${sample}`;
  d3.json(metadataUrl).then(function(data) {
    console.log(data);
     // Use d3 to select the panel with id of `#sample-metadata`
    var metadatapanel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metadatapanel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(data).forEach(([key, value]) => {
        console.log(key, value);
    // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
        metadatapanel.append("p").text(`${key}: ${value}`)
        });
    });
};

function buildCharts(sample) {
   // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

  var sampleUrl = `/samples/${sample}`;
  d3.json(sampleUrl).then(function(data) {
    // console.log(data);

    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      type: "scatter",
      mode: "markers",
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Bluered",
        type: "heatmap",
        }
      };
      
    var bubbleChart = [trace1];
  
    Plotly.newPlot("bubble", bubbleChart);
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each)

   pieData = []

    for (var i = 0; i < data.otu_ids.length; i++){
      pieData.push({"sample_values": data.sample_values[i] ,"otu_ids": data.otu_ids[i], 
      "otu_labels": data.otu_labels[i]})
      };
      
      pieData.sort((a, b) => b.sample_values - a.sample_values);
      pieData = pieData.slice(0, 10);
      console.log(pieData);
  
      var trace2 = {
        values: pieData.map(row => row.sample_values),
        labels: pieData.map(row => row.otu_ids),
        hovertext: pieData.map(row => row.otu_labels),
        type: "pie"
        };
      var pieChart = [trace2];
    
      var layout = {
        height: 600,
        width: 500 
        };

      Plotly.newPlot("pie", pieChart, layout);

  });
}

 // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

//   var wfreqUrl = `/wfreq/${sample}`;
//   d3.json(wfreqUrl).then(function(data) {
//     console.log(data);
   

// // Enter a speed between 0 and 180
// var level = wfreq;

// // Trig to calc meter point
// var degrees = 180 - level,
//      radius = .5;
// var radians = degrees * Math.PI / 9;
// var x = radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// // Path: may have to change to create a better triangle
// var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//      pathX = String(x),
//      space = ' ',
//      pathY = String(y),
//      pathEnd = ' Z';
// var path = mainPath.concat(pathX,space,pathY,pathEnd);

// var data = [{ type: 'scatter',
//    x: [0], y:[0],
//     marker: {size: 28, color:'850000'},
//     showlegend: false,
//     name: 'speed',
//     text: level,
//     hoverinfo: 'text+name'},
//   { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
//   rotation: 90,
//   text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', ''],
//   textinfo: 'text',
//   textposition:'inside',
//   marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
//                          'rgba(255, 255, 255, .5)', 'rgba(240, 202, 155, .5)',
//                          'rgba(260, 202, 160, .5)']},
//   labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', ''],
//   hoverinfo: 'label',
//   hole: .5,
//   type: 'pie',
//   showlegend: false
// }];

// var layout = {
//   shapes:[{
//       type: 'path',
//       path: path,
//       fillcolor: '850000',
//       line: {
//         color: '850000'
//       }
//     }],

//   title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
//   height: 1000,
//   width: 1000,
//   xaxis: {zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]},
//   yaxis: {zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]}
// };

// Plotly.newPlot("gauge", data, layout);

// });



function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
