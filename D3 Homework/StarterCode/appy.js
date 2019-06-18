  // y axes=======================================================

  var chosenYAxis = "healthcare";
  // function used for updating y-scale var upon click on axis label
function yScale(stateData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d[chosenYAxis]) * 0.8,
      d3.max(stateData, d => d[chosenYAxis]) * 1.2
    ])
    .range([0, width]);
  return yLinearScale;
}

// function used for updating yAxis var upon click on axis label
function renderAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newYScale, chosenYaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenYAxis]));

  return circlesGroup;
}


// function used for updating circles group with new tooltip
function updateToolTip(chosenYAxis, circlesGroup) {

  if (chosenYAxis === "healthcare") {
    var label = "healthcare:";
  }
  // else if (chosenXAxis === "obesity") {
  //   var label = "obesity:";
  // }
  else {
    var label = "smokes:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenYAxis]}`);
    });


  // =============================================================
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


    // append y axis

   // append y axis
   var yAxis = chartGroup.append("g")
    // .attr("transform", "rotate(-90)")
    // .attr("y", 0 - margin.left)
    // .attr("x", 0 - (height / 2))
    .classed("y-axis", true)
    .call(leftAxis);
  //  Create group for  2 Y axis labels 

  var ylabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(0, ${width}, ${height}, 0)`);


  var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenYAxis]))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", 15)
    .attr("fill", "lightblue")
    .attr("opacity", ".5");

  var healthcareLabel = ylabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "health") // value to grab for event listener
    .classed("active", true)
    .text("Lacks Health Care (%)");

    var smokesLabel = ylabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes (%)");




ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXaxis with value
        chosenYAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = xScale(stateData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenYAxis, circlesGroup);


   
        // changes classes to change bold text
        if (chosenXAxis === "healthcare") {
            healthcareLabel
              .classed("active", true)
              .classed("inactive", false);
            smokesLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel
              .classed("active", true)
              .classed("inactive", false);
          }