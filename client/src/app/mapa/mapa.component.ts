import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
declare const google:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.styl']
})
export class MapaComponent implements OnInit {


  constructor() { }
  

  ngOnInit() {
    
        
    d3.csv('./assets/museo.csv', (data) => {

      function initMap() {
        
  
        var center = {lat: 21.88286, lng: -102.28177};
        var bounds = new google.maps.LatLngBounds();
        console.log(data)
  
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: center
        });
  
        for(var i = 0; i < data.length; i++ ) {
          var position = new google.maps.LatLng(data[i]['gmaps_latitud'], data[i]['gmaps_longitud']);
          bounds.extend(position);
          var marker = new google.maps.Marker({
              position: position,
              map: map
          });
      }
    }
    
    
      initMap();
     

    });
      
        
      }

}
