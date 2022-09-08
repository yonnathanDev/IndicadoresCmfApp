import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { MaterialModule } from '../material/material.module';

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
    FlexLayoutModule ,
    MaterialModule,
    IndicadoresRoutingModule
  ]
})
export class IndicadoresModule { }
