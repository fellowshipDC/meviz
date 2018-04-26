import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { MuseumsService } from '../services/museums.service';
import { Museum } from '../models/museum';

declare const google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.styl']
})
export class MapaComponent implements OnInit {
  latLng: any;
  _markers: any = [];
  data: any;
  museums: Museum[] = [];
  notLocated: Museum [] = [];
  _map: any;
  categories = [
  {value: 'Historia', checked: false},
  {value: 'Arqueología', checked: false},
  {value: 'TND', checked: false},
  {value: 'Ciencia y tecnología', checked: false},
  {value: 'Especializado', checked: false},
  {value: 'Antropología', checked: false},
  {value: 'Arte', checked: false}
 ];

  constructor(private http: Http, private museumService: MuseumsService) { }

  initMap() {
    const cdmx = { lat: 19.4286973, lng: -99.156051 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: cdmx
    });

    this._map = map;
    return this._map;
  }

  addMarker(map, lat, lng, category) {
    const location = { lat: lat, lng: lng };
    const marker = new google.maps.Marker({
    position: location,
      map: map,
      caregory: category
    });
    this._markers.push(marker);
  }

  categoriesChecked () {
    return this.categories.filter(cat => cat.checked);
  }

  setMapOnAll(map) {
    for (let i = 0; i < this._markers.length; i++) {
      this._markers[i].setMap(map);
    }
  }

 /* filterMarkers = function (category) {
    for (let i = 0; i < this._markers.length; i++) {
      marker = gmarkers1[i];

      // If is same category or category not picked
      if (marker.category == category || category.length == 0) {
        marker.setVisible(true);
      }
      // Categories don't match 
      else {
        marker.setVisible(false);
      }
    }
  }*/

  selectedCat() {
    const cat = this.categoriesChecked();
    console.log(cat[0].value);
    for (let i = 0; i < this._markers.length; i++) {
      for (let k = 0; k < cat.length; k++) {
        if (this._markers[i].category === cat[k].value.toString() || cat.length === 0) {
            this._markers[i].setVisible(true);
        } else {
            this._markers[i].setVisible(false);
        }
      }
    }
  }



  ngOnInit() {

    this.museumService.getMuseums().subscribe(museums => {
      this.initMap();
      this.museums = museums;
      for (let i = 0; i < this.museums.length; i++) {
        if (!this.museums[i].gmaps_latitud) {
          this.notLocated.push(this.museums[i]);
        }
        if (!this.museums[i].museo_tematica_n1) {
          this.museums[i].museo_tematica_n1 = 'TND';
          this.addMarker(this._map, this.museums[i].gmaps_latitud, this.museums[i].gmaps_longitud, this.museums[i].museo_tematica_n1);
        } else {
          console.log('adding');
          this.addMarker(this._map, this.museums[i].gmaps_latitud, this.museums[i].gmaps_longitud, this.museums[i].museo_tematica_n1);
        }

      }
      
      return this.museums;

    });
    
    /*for (let i = 0; i < this.museums.length; i++) {
      console.log(this.museums);
      this.addMarker(this._map, this.museums[i].gmaps_latitud, this.museums[i].gmaps_longitud);
    }*/


    /*
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
          const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlSafeName},
          ${codigoPostal}&key=${GOOGLE_MAPS_API_KEY}`

          this.http.get(requestUrl).subscribe((res: Response) => {
            const latLng = res.json();
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


      }
      console.log(notFound)

    });



    */

  }

}
