// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// =============================================================
  // Retrieve data from the CSV file
  d3.csv("data.csv").then(function(stateData){
    // console.log(stateData);
// Parse/Cast values to a number for each piece of data
  stateData.forEach(function(data) {
    data.state = data.state;
    data.abbr = data.abbr;
    data.id = +data.id;
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income; 
    data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.obesityLow = +data.obesityLow;
    data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;
    // console.log(stateData);
    });

// =========================================================
// Chosen X and Y Axes
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(stateData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.8,
        d3.max(stateData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
      return xLinearScale;
}
// =============================================================
  var chosenYAxis = "healthcare";
    // function used for updating y-scale var upon click on axis label
  function yScale(stateData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d[chosenYAxis]) * 0.8,
        d3.max(stateData, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);
    return yLinearScale;
  }

  // =================================================
  // function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
};

// =========================================================
  // // function used for updating yAxis var upon click on axis label
  // function renderAxes(newYScale, yAxis) {
  //   var leftAxis = d3.axisLeft(newYScale);
  //   yAxis.transition()
  //     .duration(1000)
  //     .call(leftAxis);
  //   return yAxis;
  // };

// ===============================================================

  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
  }

  // // function used for updating circles group with a transition to
  // // new circles
  // function renderCircles(circlesGroup, newYScale, chosenYaxis) {

  //   circlesGroup.transition()
  //     .duration(1000)
  //     .attr("cy", d => newXScale(d[chosenYAxis]));

  //   return circlesGroup;
  // }

// ================================================
  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "poverty") {
      var label = "poverty:";
    }
    // else if (chosenXAxis === "income") {
    //   var label = "income:";
    // }
    else {
      var label = "age:";
    }

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
      });
// // function used for updating circles group with new tooltip
  // function updateToolTip(chosenYAxis, circlesGroup) {

  //   if (chosenYAxis === "healthcare") {
  //     var label = "healthcare:";
    // }
    // // else if (chosenYAxis === "obesity") {
    // //   var label = "obesity:";
    // // }
    // else {
    //   var label = "smokes:";
    // }

    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>${label} ${d[chosenYAxis]}`);
    //   });

  // =======================================================
  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
      });
      return circlesGroup;
  }
// ===========================================================

  // xLinearScale function
  var xLinearScale = xScale(stateData, chosenXAxis);
  // .domain([25, d3.max(stateData, d => d.age)])
  // .range([height, 0]);

  // Create y scale function
  var yLinearScale = yScale(stateData, chosenYAxis);

  var yLinearScale = d3.scaleLinear()
    .domain([25, d3.max(stateData, d => d.age)])
    .range([height, 0]);

     // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.age))
    .attr("r", 15)
    .attr("fill", "lightblue")
    .attr("opacity", ".75");

    // Create group for  2 x- axis labels
  var xlabelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertyLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("Poverty (%)");

  var ageLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Median Age");
  
    // var incomeLabel = xlabelsGroup.append("text")
    // .attr("x", 0)
    // .attr("y", 40)
    // .attr("value", "income") // value to grab for event listener
    // .classed("inactive", true)
    // .text("Household Income (Median)");
    

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  xlabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXaxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(stateData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          // incomeLabel
          //   .classed("active", false)
          //   .classed("inactive", true);
        }
        else if 
          (chosenXAxis === "age") {
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);
            ageLabel
            .classed("active", true)
            .classed("inactive", false );
            // incomeLabel
            //   .classed("active", false)
            //   .classed("inactive", true);
          }

        else {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", true)
            .classed("inactive", false); 
          // incomeLabel
          //   .classed("active", true)
          //   .classed("inactive", false); 
        }
      }
    });
  // =========================================================================

  // append y axis
  var yAxis = chartGroup.append("g")
  // .attr("transform", "rotate(-90)")
    .classed("y-axis", true)
    .call(leftAxis);
  //  Create group for  2 Y axis labels 

  var ylabelsGroup = chartGroup.append("g")
      .attr("transform", "rotate(-90)")
  // var circlesGroup = chartGroup.selectAll("circle")
  //   .data(stateData)
  //   .enter()
  //   .append("circle")
  //   .attr("cx", d => xLinearScale(d[chosenYAxis]))
  //   .attr("cy", d => yLinearScale(d.smokes))
  //   .attr("r", 15)
  //   .attr("fill", "lightblue")
  //   .attr("opacity", ".5");

  var healthcareLabel = ylabelsGroup.append("text")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("value", "health") // value to grab for event listener
    .classed("active", true)
    .text("Lacks Health Care (%)");

  var smokesLabel = ylabelsGroup.append("text")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    // .attr("dy", "3em")
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes (%)");

  // var obesitylabel = ylabelsGroup.append("text")
  //   .attr("y", 0 - margin.left + 60)
  //   .attr("x", 0 - (height / 2))
  //   // .attr("dy", "3em")
  //   .attr("value", "obesity") // value to grab for event listener
  //   .classed("inactive", true)
  //   .text("Obesity (%)");

  // ===============================================================

  // // updateToolTip function above csv import
  // var circlesGroup = updateToolTip(chosenYAxis, circlesGroup);
  
  // ylabelsGroup.selectAll("text")
  // .on("click", function() {
  //   // get value of selection
  //   var value = d3.select(this).attr("value");
  //   if (value !== chosenYAxis) {

  //     // // replaces chosenXaxis with value
  //     chosenYAxis = value;

  //     console.log(chosenyAxis)

      // // functions here found above csv import
      // // updates y scale for new data
      // yLinearScale = xScale(stateData, chosenYAxis);

      // // updates y axis with transition
      // yAxis = renderAxes(yLinearScale, yAxis);

      // // updates circles with new x values
      // circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

      //  // updates tooltips with new info
      // circlesGroup = updateToolTip(chosenYAxis, circlesGroup);
      //   if (chosenYAxis === "healthcare") {
      //     healthcareLabel
      //       .classed("active", true)
      //       .classed("inactive", false);
      //     smokesLabel
      //       .classed("active", false)
      //       .classed("inactive", true);
      //     obesityLabel
          //   .classed("active", false)
      //       .classed("inactive", true);
      //   }

          // else  if (chosenYAxis === "healthcare") {
      //     healthcareLabel
      //       .classed("active", false)
      //       .classed("inactive", true);
      //     smokesLabel
      //       .classed("active", true)
      //       .classed("inactive", false );
      //     obesityLabel
          //   .classed("active", false)
      //       .classed("inactive", true);
      //   }
      //   else {
      //     healthcareLabel
      //       .classed("active", false)
      //       .classed("inactive", true);
      //     smokesLabel
      //       .classed("active", true)
      //       .classed("inactive", false);
          // obesityLabel
          //   .classed("active", true)
      //       .classed("inactive", false);
  //       }
      // }
  // });
});