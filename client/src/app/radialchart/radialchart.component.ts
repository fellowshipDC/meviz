  import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import { Http, Response } from '@angular/http';
  import { HttpModule } from '@angular/http';
  import * as d3 from 'd3';

  @Component({
    selector: 'app-radialchart',
    templateUrl: './radialchart.component.html',
    styleUrls: ['./radialchart.component.css'],
    encapsulation: ViewEncapsulation.None
  })
  export class RadialchartComponent implements OnInit {
  data:any;
  

    constructor(private http: Http) { }


    draw(){
      const width = 600,
      height = 400,
      chartRadius = height / 2 - 40;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    let svg = d3.select('#radial').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    let tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip');

    const PI = Math.PI,
      arcMinRadius = 10,
      arcPadding = 10,
      labelPadding = -5,
      numTicks = 10;

      let scale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value) * 1.1])
      .range([0, 2 * PI]);

    let ticks = scale.ticks(numTicks).slice(0, -1);
    let keys = this.data.map((d, i) => d.key);

    //number of arcs
    const numArcs = keys.length;
    const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

    let arc = d3.arc()
      .innerRadius((d, i) => getInnerRadius(i))
      .outerRadius((d, i) => getOuterRadius(i))
      .startAngle(0)
      .endAngle((d, i) => scale(d))

    let radialAxis = svg.append('g')
      .attr('class', 'r axis')
      .selectAll('g')
        .data(this.data)
        .enter().append('g');

    radialAxis.append('circle')
      .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

    radialAxis.append('text')
      .attr('x', labelPadding)
      .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
      .text(d => d.key);

    let axialAxis = svg.append('g')
      .attr('class', 'a axis')
      .selectAll('g')
        .data(ticks)
        .enter().append('g')
          .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

    axialAxis.append('line')
      .attr('x2', chartRadius);

    axialAxis.append('text')
      .attr('x', chartRadius + 10)
      .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
      .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
      .text(d => d);

    //data arcs
    let arcs = svg.append('g')
      .attr('class', 'data')
      .selectAll('path')
        .data(this.data)
        .enter().append('path')
        .attr('class', 'arc')
        .style('fill', (d, i) => color(i))

    arcs.transition()
      .delay((d, i) => i * 200)
      .duration(1000)
      .attrTween('d', arcTween);

    arcs.on('mousemove', showTooltip)
    arcs.on('mouseout', hideTooltip)


    function arcTween(d, i) {
      let interpolate = d3.interpolate(0, d.value);
      return t => arc(interpolate(t), i);
    }

    function showTooltip(d) {
      tooltip.style('left', (d3.event.pageX + 10) + 'px')
        .style('top', (d3.event.pageY - 25) + 'px')
        .style('display', 'inline-block')
        .html(d.value);
    }

    function hideTooltip() {
      tooltip.style('display', 'none');
    }

    function rad2deg(angle) {
      return angle * 180 / PI;
    }

    function getInnerRadius(index) {
      return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
    }

    function getOuterRadius(index) {
      return getInnerRadius(index) + arcWidth;
    }
  }


    ngOnInit() {

    this.getData();
     

      

    }//ngOnInit

    getData() {
      const requestUrl = `http://localhost:3000/museums/`
      this.http.get(requestUrl)
        .subscribe(
          (res: Response) => {
            const data = res.json();
            
              if(data.data.length > 0){
                this.data = d3.nest()
                              .key(function(d) { return d.museo_tematica_n1; })
                              .rollup(function(v) { return v.length})
                              .entries(data.data);
          
                this.draw();
              }
          err => {
            console.log('error');
          }
        })
    }


  }
