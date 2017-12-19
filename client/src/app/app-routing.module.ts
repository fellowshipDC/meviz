import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RadialchartComponent } from './radialchart/radialchart.component';

import { BarchartComponent } from './barchart/barchart.component';


const routes: Routes = [
  {
    path: 'radialchart',
    component: RadialchartComponent
  },
  {
    path: 'barchart',
    component: BarchartComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
