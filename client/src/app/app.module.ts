import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VizComponent } from './viz/viz.component';
import { MapaComponent } from './mapa/mapa.component';
import { AgmCoreModule } from '@agm/core';
import { RadarchartComponent } from './radarchart/radarchart.component';
import { BarchartComponent } from './barchart/barchart.component';
import { RadialchartComponent } from './radialchart/radialchart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VizComponent,
    MapaComponent,
    RadarchartComponent,
    BarchartComponent,
    RadialchartComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA_yetbQwK-K8yHxngPj6AA4jVocxZO4II'
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
