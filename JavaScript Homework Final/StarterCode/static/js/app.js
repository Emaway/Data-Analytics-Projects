// from data.js
var tableData = data;

// Select the filter table button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and 
  // Get the value property of the input element

  var inputValue = d3.select("#datetime").property("value");

  console.log(inputValue);
  console.log(tableData);
  
 // filter UFO table data by datetime attribute with input value
  var filteredData = tableData.filter(dt => dt.datetime === inputValue);
 
  // Get a reference to the table body
  var tbody = d3.select("tbody");
  tbody.html("");
  // Loop Through UFO data and console.log objects using Arrow function

  filteredData.forEach((ufoInformation) => {
    console.log(ufoInformation);
    var row = tbody.append("tr");
    Object.entries(ufoInformation).forEach(([key, value]) => {
      console.log(key, value);
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
});