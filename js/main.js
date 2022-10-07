const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right:50, top:50, bottom:50}

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.FRAME_HEIGHT

const FRAME = d3.select("#vis")
  .append("svg")
    .attr("width", FRAME_WIDTH)
    .attr("height", FRAME_HEIGHT)
  .append("g")
    .attr("transform",
          "translate(" + MARGINS.left + "," + MARGINS.top + ")");



d3.csv("data/data.csv").then((data) => {

var x = d3.scaleBand()
  .range([ 0, VIS_WIDTH])
  .domain(data.map(function(d) { return d.Category; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + VIS_HEIGHT + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

var y = d3.scaleLinear()
  .domain([0, 90000])
  .range([ VIS_HEIGHT, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Category); })
    .attr("y", function(d) { return y(d.Value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return VIS_HEIGHT - y(d.Value); })
    .attr("fill", "#69b3a2")

});