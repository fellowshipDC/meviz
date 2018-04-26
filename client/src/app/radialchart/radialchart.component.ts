import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import * as d3 from 'd3';
import { MuseumsService } from '../services/museums.service';
import { Museum } from '../models/museum';

@Component({
  selector: 'app-radialchart',
  templateUrl: './radialchart.component.html',
  styleUrls: ['./radialchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RadialchartComponent implements OnInit {
  museums: Museum[];

  constructor(private http: Http, private museumService: MuseumsService) { }


  draw() {
    const width = 600,
      height = 400,
      chartRadius = height / 2 - 40;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select('#radial').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip');

    const PI = Math.PI,
      arcMinRadius = 10,
      arcPadding = 10,
      labelPadding = -5,
      numTicks = 10;

    const scale = d3.scaleLinear()
      .domain([0, d3.max(this.museums, d => d.value) * 1.1])
      .range([0, 2 * PI]);

    const ticks = scale.ticks(numTicks).slice(0, -1);
    const keys = this.museums.map((d, i) => d.key);

    // number of arcs
    const numArcs = keys.length;
    const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

    const arc = d3.arc()
      .innerRadius((d, i) => getInnerRadius(i))
      .outerRadius((d, i) => getOuterRadius(i))
      .startAngle(0)
      .endAngle((d, i) => scale(d));

    const radialAxis = svg.append('g')
      .attr('class', 'r axis')
      .selectAll('g')
      .data(this.museums)
      .enter().append('g');

    radialAxis.append('circle')
      .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

    radialAxis.append('text')
      .attr('x', labelPadding)
      .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
      .text(d => d.key);

    const axialAxis = svg.append('g')
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

    // data arcs
    const arcs = svg.append('g')
      .attr('class', 'data')
      .selectAll('path')
      .data(this.museums)
      .enter().append('path')
      .attr('class', 'arc')
      .style('fill', (d, i) => color(i));

    arcs.transition()
      .delay((d, i) => i * 200)
      .duration(1000)
      .attrTween('d', arcTween);

    arcs.on('mousemove', showTooltip);
    arcs.on('mouseout', hideTooltip);


    function arcTween(d, i) {
      const interpolate = d3.interpolate(0, d.value);
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
  }// ngOnInit
  getData() {
    this.museumService.getMuseums().subscribe(res => {
      this.museums = res;
      for (let i = 0; i < this.museums.length; i++) {
        if (!this.museums[i].museo_tematica_n1) {
          this.museums[i].museo_tematica_n1 = 'TND';
        }
      }
      if (this.museums.length > 0) {
        this.museums = d3.nest()
          .key( d => d.museo_tematica_n1 )
          .rollup(v => v.length)
          .entries(this.museums);
        this.draw();
      }

    });

  }



}
