import { Component, OnInit } from '@angular/core';

import { Chart, ChartConfiguration, ChartEvent, ChartData ,ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Indicador, Dolare } from '../../interfaces/indicadores';

import { IndicadorService } from '../../services/indicador.service';
import { option } from '../detalle/detalle.component';

import * as moment from 'moment/moment';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  header: number[] = [];
  labels: string[] = [];
  indicador!: Indicador[];
  
  op: option = {
    name: 'ipc' ,
    category: 3,
    type: 'IPCs',
    year: '',
    month: '',
    day: ''
  }  

   // Line
  public lineChartLabels: string[] = [ ];
  
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: []
  };

  public lineChartType: ChartType = 'line';    
  
  constructor( private indicadorService: IndicadorService ) { }

  ngOnInit(): void {

    this.getDate(this.op.category);
    console.log( this.op )

    this.indicadorService.getData( this.op )
        .subscribe( ({data}) => {
          let objeto = data.IPCs;
          
          for( let i in  objeto){
            let header =  parseFloat(objeto[i].Valor);
            this.header.push( header );
            this.labels.push( objeto[i].Fecha );
          }

          const colors = ['#6405F0','#0724E3', '#05A0F0','#0724E3', '#05A0F0'];

          this.lineChartData = {
            labels: this.labels.reverse(),
            datasets: [{
              data: this.header.reverse(), 
              label: this.op.name,
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
              fill: 'origin',
            }]
          }
          
          console.log(  objeto , 'c-map' )  

        })    

  }



  public lineChartOptions: ChartConfiguration['options'] = {
    
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

  };








  getDate( option: number ){
  
    moment.locale('es');
    let today = moment();
    let res: moment.Moment; 

    if(option === 1){
      // Devuelve el día, contado desde el día anterior.
      // res = today.subtract(30, 'days').format('YYYY-MM-DD');
      let date = today.subtract(10, 'days');
      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
      this.op.day = date.format('DD');

    }else if(option === 2){
      // Devuelve el año actual
      // date = today.subtract(12, 'months').format('YYYY-MM');
      this.op.year = today.format('YYYY')
    }else {
      // Los ultimos 12 meses
      let date = today.subtract(12, 'months');
      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
      console.log(date, 'date-month')
    }

  }  
  

}
