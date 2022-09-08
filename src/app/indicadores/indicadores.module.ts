import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicadoresRoutingModule } from './indicadores-routing.module';

import { ListadoComponent } from './pages/listado/listado.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { GraficoComponent } from './pages/grafico/grafico.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    ListadoComponent,
    DetalleComponent,
    GraficoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    IndicadoresRoutingModule
  ]
})
export class IndicadoresModule { }
