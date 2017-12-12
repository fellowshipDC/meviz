import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as dbox from '@dboxjs/core';

@Component({
  selector: 'app-radarchart',
  templateUrl: './radarchart.component.html',
  styleUrls: ['./radarchart.component.styl']
})
export class RadarchartComponent implements OnInit {

  data: any;
  conteo:any;

  constructor() {}
  ngOnInit(){

  } // ngOnInit
}
