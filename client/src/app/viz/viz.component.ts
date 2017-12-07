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

  //setting dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 40},
      width = 960 -margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the ranges

  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  //append the svg object to the body of the shape
  //append a 'group' element to 'svg'
  //moves the 'group' element to the top left margin

  var svg = d3.select("#visualization").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" +margin.left + "," +margin.top + ")" );

  // defining colors

  var color = d3.scaleOrdinal(d3.schemeCategory20c);

  //get the data
  d3.csv('./assets/museo.csv', (error, data) => {
    if (error) throw error;

    this.data = data;
  
    var conteo = d3.nest()
      .key(function(d) { return d.nom_ent; })
      .rollup(function(v) {return v.length; })
      .entries(this.data);
  
      console.log(conteo);
    //Scale the range of the data in the domains
    x.domain(conteo.map(function(c) { return c.key;}));
    y.domain([0, d3.max(conteo, function(c) { return c.value})]);

    //append the rectangles for the bar chart

    svg.selectAll(".bar")
        .data(conteo)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x",function(c) { return x(c.key); })
        .attr("width", x.bandwidth())
        .attr("y", function(c) { return y(c.value); })
        .attr("height", function(c) { return height - y(c.value); })
        .attr('fill', function(c) { return "rgb(0, "+c.value*4.50+", 80)" });

          //.attr("fill", function(c: any) { return color(c.key); }); //provides color to each category
    //add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        //
        .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(60)")
        .style("text-anchor", "start");
        

    //add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));




  });

  }//ngOnInit
}
