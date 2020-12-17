var svg = d3.select("div#plot")
            .append("svg")
            .attr("width", "800")
            .attr("height", "500");

var margin = {top: 50, right: 50, bottom: 50, left: 80}
var width =  +svg.attr("width") - margin.left - margin.right
var height = +svg.attr("height") - margin.top - margin.bottom
var g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
var parseTime = d3.timeParse("%Y-%m-%d");
var bisectDate = d3.bisector(d => d.date).left;
var xScale = d3.scaleTime().range([0, width]);
var yScale = d3.scaleLinear()
  .domain([5, 50000])
  .range([height, 0]);
var line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.totalcases));
  
d3.select("svg")
  .append("rect")
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", "800")
  .attr("height", "500")
  .attr("fill", "lightblue")
  .style("opacity", 0.3);
  
var data = 
[{"date":"2020-01-31","totalcases":9.927},
  {"date":"2020-02-29","totalcases":86.014},
  {"date":"2020-03-31","totalcases":875.928},
  {"date":"2020-04-30","totalcases":3273.653},
  {"date":"2020-05-31","totalcases":6182.716},
  {"date":"2020-06-30","totalcases":10442.171},
  {"date":"2020-07-31","totalcases":17584.892},
  {"date":"2020-08-31","totalcases":25467.962},
  {"date":"2020-09-30","totalcases":33953.158},
  {"date":"2020-10-31","totalcases":46061.412}];
data.forEach(function(d) {
      d.date = parseTime(d.date);
});

xScale
  .domain(d3.extent(data, d => d.date));
  
g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(10));
g.append("g")
    .call(d3.axisLeft(yScale))

//add graph title    
svg.append("text")
  .attr("x", 400)             
  .attr("y", 50)
  .attr("text-anchor", "middle")  
  .style("font-size", "20px") 
  .text("2020 Global Covid-19 Monthly Total Confirmed Cases");
    
// Add X axis label
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 90)
    .text("Month");

// Y axis label
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 105)
    .attr("x", -margin.top)
    .text("Total confirmed Cases (in thousands)")
    
// Start Animation on Click
d3.select("#start").on("click", function(event) {
  var path = g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "2")
      .attr("d", line)

  // Variable to Hold Total Length
  var totalLength = path.node().getTotalLength();

  // Set Properties of Dash Array and Dash Offset and initiate Transition
  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition() // Call Transition Method
    .duration(5000) // Set Duration timing (ms)
    .ease(d3.easeLinear) // Set Easing option
    .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition
    
  var text = g.append("text")
    .attr("id", "count")
    .attr("x", 450)
    .attr("y", 350)
    .text("Total Confirmed Cases: 9.927");
    
    
  d3.select("text#count")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 86.014")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 875.928")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 3273.653")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 6182.716")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 10442.171")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 17584.892")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 25467.962")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 33953.158")
    .transition()
    .duration(600)
    .text("Total Confirmed Cases: 46061.412")

}); 

// Reset Animation
d3.select("#reset").on("click", function() {
  d3.select(".line").remove();
  d3.select("#count").remove();
});
