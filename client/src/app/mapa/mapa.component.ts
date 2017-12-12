import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as maps from 'js-marker-clusterer';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
declare var $: any;
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.styl']
})
export class MapaComponent implements OnInit {
  latLng: any;

  constructor(private http: Http) { }

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

     // for (let i = 0; i < data.length; i++){
        if (data[1223].gmaps_latitud === "0" || data[1223].gmaps_longitud === "0" || typeof parseFloat(data[1223].gmaps_longitud) !== 'number'){
          console.log("no hay coordenadas")/* Cuando se haga la petición, almacenarla en el objeto data en su posición [i]*/
          data[1223].museo_nombre.replace(/\s/g, "+");
          console.log(data[1223].museo_nombre)

          
          this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+data[1223].museo_nombre+','+data[1223].museo_cp+'&key=AIzaSyA_yetbQwK-K8yHxngPj6AA4jVocxZO4II').subscribe((res:Response) => {
            this.latLng = res.json()

            this.addMarker(map, this.latLng.results[0].geometry.location.lat, this.latLng.results[0].geometry.location.lng);
        console.log(this.latLng.results[0].geometry.location.lat);
      
      });//HTTP

        /*TODO SOMEDAY: Listas aquellos museos que no están registrados en Google Maps*/
        
        }

     // }


      let map = this.initMap();

      data.map((object) => {
        this.addMarker(map, parseFloat(object.gmaps_latitud), parseFloat(object.gmaps_longitud));
      });

      console.log(data)

    });

  }

}
