import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.styl']
})
export class VizComponent implements OnInit {
  data:any;
  
  constructor() {}

  

ngOnInit() {

  /*var svg = d3.select("svg"),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  var y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/


d3.csv('./assets/museo.csv', (error, data) => {
  if (error) throw error;

  this.data = data;
  
  var conteo = d3.nest()
  .key(function(d) { return d.nom_ent; })
  .rollup(function(v) {return v.length; })
  .entries(this.data);

  

    console.log(conteo);

    /*x.domain(this.data.map(function(d){ return d.nom_ent;}));
    y.domain([0, d3.max(this.data, function(d) {return d.category;})]);

    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
     .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Categories");

    g.selectAll(".bar")
     .data(this.data)
     .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d){ return x(d.nom_ent); })
      .attr("y",function(d){ return y(d.category); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.category); });*/

  });

  }//ngOnInit
}
