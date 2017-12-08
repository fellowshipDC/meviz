import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-radialchart',
  templateUrl: './radialchart.component.html',
  styleUrls: ['./radialchart.component.styl']
})
export class RadialchartComponent implements OnInit {
data:any;

  constructor() { }

  ngOnInit() {

    var width = 960,
    height = 500,
    barHeight = height / 2 - 40;

var formatNumber = d3.format("s");

var color = d3.scaleBand()
    .range(["#8dd3c7","#ffffb3","#bebada","#fb8072",
            "#80b1d3","#fdb462","#b3de69","#fccde5",
            "#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);

var svg = d3.select('svg')
    .attr("width", width)
    .attr("height", height)
   .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");



//get the data
d3.csv('./assets/museo.csv', (error, data) => {
if (error) throw error;

this.data = data;

var conteo = d3.nest()
  .key(function(d) { return d.museo_tematica_n1; })
  .rollup(function(v) {return v.length; })
  .entries(this.data); //Visualizing  categories

conteo.sort(function(a,b) { return b.value - a.value; });

var extent = d3.extent(data, function (d) { return d.value; })
var barScale = d3.scaleLinear()
    .domain(extent)
    .range([ 0, barHeight]);

var keys = data.map(function(d,i) { return d.key; })
var numBars = keys.length;

var x = d3.scaleLinear()
        .domain(extent)
        .range([0, -barHeight]);

var xAxis = d3.axisBottom()
            //.scale(x).orient("left")
            //.ticks(3)
            .tickFormat(formatNumber);

var circles = svg.selectAll("circle")
      .data(x.ticks(3))
    .enter().append("circle")
      .attr("r", function(d) { return barScale(d); })
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-dasharray", "2,2")
      .style("stroke-width", ".5px");

var arc = d3.arc()
    .startAngle(function(d,i) { return ( i * 2 * Math.PI)/ numBars; })
    .endAngle(function (d,i) { return ((i + 1 ) * 2 * Math.PI) / numBars; })
    .innerRadius(0);

var segments = svg.selectAll("path")
          .data(conteo)
        .enter().append("path")
          .each(function (d) { d.outerRadius = 0; })
          .style("fill", function (d) { return color(d.key);})
          .attr("d", arc);

segments.transition().ease("elastic").duration(1000).delay(function(d,i) { return (25-i)*100;})
        .attrTween("d",function(d,index){
          var i = d3.interpolate(d.outerRadius, barScale(+d.value));
          return function(t) {d.outerRadius = i(t); return arc(d,index);};
        });

var lines = svg.selectAll("line")
    .data(keys)
  .enter().append("line")
    .attr("y2", -barHeight - 20)
    .style("stroke", "black")
    .style("stroke-width", ".5px")
    .attr("transform", function (d, i) { return "rotate(" + (i * 360 / numBars) + ")"; })

svg.append("g")
  .attr("class", "x axis")
  .call(xAxis);

//Labels

var labelRadius = barHeight * 1.025;

var labels = svg.append("g")
    .classed("labels", true);

labels.append("def")
      .append("path")
      .attr("id", "label-path")
      .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");

labels.selectAll("text")
      .data(keys)
    .enter().append("text")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("fill", function(d, i) { return i * 100 / numBars + 50 / numBars + '%'; })
      .text(function(d) { return d.toUpperCase(); });

    });

  }//ngOnInit

}
