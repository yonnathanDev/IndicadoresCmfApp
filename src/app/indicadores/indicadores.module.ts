import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';

import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { MaterialModule } from '../material/material.module';

import { ListadoComponent } from './pages/listado/listado.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { GraficoComponent } from './pages/grafico/grafico.component';
import { HomeComponent } from './pages/home/home.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    ListadoComponent,
    DetalleComponent,
    GraficoComponent,
    HomeComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule ,
    NgChartsModule,
    MaterialModule,
    IndicadoresRoutingModule
  ]
})
export class IndicadoresModule { }
