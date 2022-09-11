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
  
  style: string = 'background-color: #0a4275; margin-top: 50px; position: fixed; bottom: 0;width: 100%;';

  indicadores: intIndicadores[] = dataIndicadores;

  displayedColumns: string[] = ['name', 'position'];

  indicador!: Dolar;

  constructor( private indicadorService: IndicadorService ) { }

  ngOnInit( ): void {


  
  }





}
