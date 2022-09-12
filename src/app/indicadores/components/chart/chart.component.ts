import { Component, Input, OnInit } from '@angular/core';

import { Chart, ChartConfiguration, ChartEvent, ChartData ,ChartType } from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() titulo!: string; // Título
  @Input() data!: ChartData<'line'>; // data para cargar el gráfico 
  @Input() options!: ChartConfiguration['options']; // Opciones
  @Input() type!: ChartType; // tipo de gráfico

  constructor() { }

  ngOnInit(): void {

  }




}
