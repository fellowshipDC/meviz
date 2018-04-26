import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VizComponent } from './viz/viz.component';
import { MapaComponent } from './mapa/mapa.component';
import { BarchartComponent } from './barchart/barchart.component';
import { RadialchartComponent } from './radialchart/radialchart.component';
import { IntroComponent } from './intro/intro.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { FooterComponent } from './footer/footer.component';
import { MuseumsService } from './services/museums.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VizComponent,
    MapaComponent,
    BarchartComponent,
    RadialchartComponent,
    IntroComponent,
    AnalisisComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [MuseumsService,
   AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
