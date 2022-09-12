import { Component, OnInit } from '@angular/core';

import { intIndicadores } from '../../interfaces/indicadores';

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

  constructor( ) { }

  ngOnInit( ): void {


  
  }





}
