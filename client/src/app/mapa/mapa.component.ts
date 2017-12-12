import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as maps from 'js-marker-clusterer';
declare var $: any;
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.styl']
})
export class MapaComponent implements OnInit {


  constructor() { }

  initMap() {
    var cdmx = {lat: 19.4286973, lng: -99.156051};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: cdmx
    });

    return map;
  }

  addMarker(map, lat, lng) {
    var location = {lat: lat, lng: lng};
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

  ngOnInit() {

    d3.csv('./assets/museo.csv', (data) => {

      console.log(data);

      let map = this.initMap();

      data.map((object) => {
        this.addMarker(map, parseFloat(object.gmaps_latitud), parseFloat(object.gmaps_longitud));
      });

    });

  }

}
