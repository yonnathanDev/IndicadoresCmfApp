import { Component, OnInit } from '@angular/core';

import moment from 'moment/moment';

import { last } from 'rxjs';
import { intIndicadores, Dolar } from '../../interfaces/indicadores';
import { IndicadorService } from '../../services/indicador.service';

import dataIndicadores from '../../../../assets/data/indicadores.json';

export interface PeriodicElement {
  name: string;
  position: number;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  styles: [
    `
      table {
        width: 100%;
      }   
    `
  ]
})
export class ListadoComponent implements OnInit {
  
  indicadores: intIndicadores[] = dataIndicadores;

  displayedColumns: string[] = ['name', 'position'];

  indicador!: Dolar;

  constructor( private indicadorService: IndicadorService ) { }

  ngOnInit( ): void {


  
  }





}
