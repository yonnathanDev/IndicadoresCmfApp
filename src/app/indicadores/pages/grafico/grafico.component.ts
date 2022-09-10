import { Component, OnInit } from '@angular/core';

import { Chart, ChartConfiguration, ChartEvent, ChartData ,ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Indicador, Dolare, Indicadores, intIndicadores } from '../../interfaces/indicadores';

import { IndicadorService } from '../../services/indicador.service';
import { option } from '../detalle/detalle.component';

// import * as moment from 'moment/moment';
import moment from 'moment/moment';

import { last } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import dataIndicadores from '../../../../assets/data/indicadores.json';



@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  header: number[] = [];
  labels: string[] = [];
  indicador!: Indicador[];

  indicadores: intIndicadores[] = dataIndicadores;


  graficoTitulo: number = 0;
  graficoSubtitulo: string = '';
  nombre: string = '';
  fecha: string = '';
  unidadMedida: string = '';
  
  op: option = {
    name: '' ,
    category: 0,
    type: '',
    year: '',
    month: '',
    day: '',
    unidadMedida: ''
  }  

   // Line
  public lineChartLabels: string[] = [ ];
  
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: []
  };

  public lineChartType: ChartType = 'line';    
  
  constructor(  private indicadorService: IndicadorService, 
                private _router: ActivatedRoute) { }

  ngOnInit(): void {
   
    let _id = this._router.snapshot.paramMap.get('id');

    console.log(_id, 'id');

    let ind =  this.indicadores.find(x => x.name == _id);

    if( !ind ){
      console.log('no se encontró nada');
      return;
    }

    console.log(ind, 'ind')
    this.op.name = ind ? ind.name : '' ;
    this.op.type = ind ? ind.type : '' ;
    this.op.category = ind ? ind.category : 1 ;
    this.op.unidadMedida = ind ? ind.measureUnit : '';

    console.log(this.op, 'op')


    // this.titulo = `${ this.op.name } `;
    // this.subtitulo = this.op.category == 1 ? 'Últimos 30 días' : 'Año actual' 


    this.getDate(this.op.category);
    this.nombre = this.op.name;
    this.unidadMedida = this.op.unidadMedida;
    
    this.graficoSubtitulo = ( this.op.category == 1 ? 'Últimos 10 días.' : 'Últimos 12 meses') 
    console.log(this.graficoSubtitulo)

    this.indicadorService.getData( this.op )
        .subscribe( ({data}) => {

          let objeto = data[ this.op.type ];
          console.log(objeto)

          for( let i in  objeto){

            let header =  parseFloat(objeto[i].Valor);
            this.header.push( header );
            this.labels.push( objeto[i].Fecha );
            
            if( this.op.name == 'uf' ){
              if( objeto[i].Fecha === '2022-09-10'){
                console.log('valorFecha', header )
                break;
              }
            }

          }

          let date = this.labels.pop()
          let price = this.header.pop()
          this.graficoTitulo = price ? price : 0.0;  
          this.fecha = date ? date : 'No se encontró la Fecha'; 

          console.log( price, date )

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
      let date = today.subtract(11, 'days');
      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
      this.op.day = date.format('DD');
    }else if(option === 2){
      // Devuelve el año actual
      // date = today.subtract(12, 'months').format('YYYY-MM');
      this.op.year = today.format('YYYY')
    }else if( option === 3) {
      // Los ultimos 12 meses
      let date = today.subtract(12, 'months');
      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
      // console.log(date, 'date-month')
    } else {
      let date = today.subtract(10, 'days');
      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
      this.op.day = date.format('DD');
      console.log( date.format('YYYY-MM-DD'), 'datev1' )
    }

  }  


 
  

}
