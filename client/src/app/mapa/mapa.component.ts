import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as maps from 'js-marker-clusterer';
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

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var location = data.map(d => { return (parseFloat(d.gmaps_latitud), parseFloat(d.gmaps_longitud));});
       

        console.log(location)
        
                // Add some markers to the map.
                var markers = location.map(function(d:any, i) {
                  return new google.maps.Marker({
                    position: d,
                    label: labels[i % labels.length]
                  });
                });
        
                // Add a marker clusterer to manage the markers.
                var markerCluster = new maps.MarkerClusterer(map, markers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
              
        
        
  
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
