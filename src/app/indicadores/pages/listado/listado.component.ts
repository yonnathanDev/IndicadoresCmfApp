import { Component, OnInit } from '@angular/core';

import * as moment from 'moment/moment';
import { last } from 'rxjs';

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
  
  
  ELEMENT_DATA: PeriodicElement[] = [
    { name: 'dolar', position: 1},
    { name: 'euro', position: 2},
    { name: 'ipc', position: 3},
    { name: 'uf', position: 4},
    { name: 'utm', position: 5},
  ];
  displayedColumns: string[] = ['name', 'position'];

  constructor() { }

  ngOnInit(): void {


    let date = this.getDate(2);
    console.log(date)

  
  }

  detalle( option: number){

    console.log('detalle', option);
  }


  getDate( option: number ){
  
    moment.locale('es');
    let today = moment();
    let res: string; 

    if(option == 1){
      res = today.subtract(10, 'days').format('YYYY-MM');
    }else{
      res = today.subtract(3, 'months').format('YYYY-MM');
    }

    return res;
  }



}
