import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as MarkerClusterer from 'js-marker-clusterer';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
declare var $: any;
declare var google: any;
declare var MarkerClusterer: any;

const GOOGLE_MAPS_API_KEY = 'AIzaSyAtsAnZ-V5yr5erdgfD2xAx6UFjeQra6lw'
const museumCSVFile = './assets/museo.csv'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.styl']
})
export class MapaComponent implements OnInit {
  latLng: any;
  markers: any;
  data:any;


  constructor(private http: Http) { }

  initMap() {
    var cdmx = { lat: 19.4286973, lng: -99.156051 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: cdmx
    });

    return map;
  }

  addMarker(map, lat, lng) {
    var location = { lat: lat, lng: lng };
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }




  ngOnInit() {

    let map = this.initMap();
    d3.csv(museumCSVFile, (data) => {
      this.data = data
      let notFound = [];
      let markers = [];

    
      for (let i = 0; i < data.length; i++) {
        const latitud = data[i].gmaps_latitud
        const longitud = data[i].gmaps_longitud
        const name = data[i].museo_nombre
        const codigoPostal = data[i].museo_cp
        const ciudad = data[i].nom_mun
    
        if (latitud === '0' || longitud === '0') {
          const urlSafeName = name.replace(/\s/g, "+");
          const urlSafeCity = ciudad.replace(/\s/g, "+");
          const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlSafeName},${codigoPostal}&key=${GOOGLE_MAPS_API_KEY}`
    
          this.http.get(requestUrl).subscribe((res: Response) => {
            const latLng = res.json()
            
            if (latLng.status === "ZERO_RESULTS") {
              notFound.push({
                nom_ent: data[i].nom_ent,
                museo_nombre: data[i].museo_nombre,
                nom_mun: data[i].nom_mun 
              });
              
            } else {
              
             let lat,lng
             try{
              lat = latLng.results[0].geometry.location.lat
              lng = latLng.results[0].geometry.location.lng
            
             } catch(e){
               debugger
             }
               
              
              this.addMarker(map, lat, lng);
            };

          });
        }
        this.addMarker(map,parseFloat(latitud), parseFloat(longitud))
        /*else {
          
        }*/

      }
      console.log(notFound)

     
    });
    


    

  }

}