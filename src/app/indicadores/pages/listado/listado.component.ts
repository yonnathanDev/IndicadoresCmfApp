import { Component, OnInit } from '@angular/core';

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
    { name: 'Dolar', position: 1},
    { name: 'Euro', position: 2},
    { name: 'IPC', position: 3},
    { name: 'UF', position: 4},
    { name: 'UTM', position: 5},
  ];
  displayedColumns: string[] = ['name', 'position'];

  constructor() { }

  ngOnInit(): void {


  }

}
