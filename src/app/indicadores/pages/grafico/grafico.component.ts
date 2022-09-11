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

  today: string = '';
  
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

    // console.log(_id, 'id');

    let ind =  this.indicadores.find(x => x.name == _id);

    if( !ind ){
      console.log('no se encontró nada');
      return;
    }

    this.op.name = ind ? ind.name : '' ;
    this.op.type = ind ? ind.type : '' ;
    this.op.category = ind ? ind.category : 1 ;
    this.op.unidadMedida = ind ? ind.measureUnit : '';


    // this.titulo = `${ this.op.name } `;
    // this.subtitulo = this.op.category == 1 ? 'Últimos 30 días' : 'Año actual' 


    this.getDate(this.op.category);
    this.nombre = this.op.name;
    this.unidadMedida = this.op.unidadMedida;
    
    this.graficoSubtitulo = ( this.op.category == 1 ? 'Últimos 10 días.' : 'Últimos 12 meses') 
    // console.log(this.graficoSubtitulo)

    this.indicadorService.getDataGrafico( this.op )
        .subscribe( ({data}) => {

          let objeto = data[ this.op.type ];
          console.log(objeto, 'objeto')

          // Recorre el objeto y le hace un push this.header y this.labels
          for( let i  in  objeto){
            
            // braak
            if( this.op.name === 'uf' ){

              if( moment( objeto[i].Fecha ).isAfter( this.today , 'day') ){
                // console.log('momet');
                break;
              }    
              
            }
            
            let header =   parseFloat(objeto[i].Valor);
            let label  =   objeto[i].Fecha;

            this.labels.push( label );
            this.header.push( header );

          }


          let date = this.labels.pop()
          let price = this.header.pop()
          this.graficoTitulo = price ? price : 0.0;  
          this.fecha = date ? date : 'No se encontró la Fecha'; 
          console.log( price, date )

          this.getGrafico();
          

        })    

  }

  getGrafico(){
    
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
 
    this.today = today.add( 1 , 'days').format('YYYY-MM-DD');
    console.log(this.today, 'today')
    
    if(option === 1){
      // Devuelve el día, contado desde el día anterior.
      let date = today.subtract(11, 'days');

      console.log(date.format('YYYY-MM-DD'), '10 días antes')
      
      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
      this.op.day = date.format('DD');
    }else{
      // Los ultimos 12 meses, agregar un mes más
      let date = today.subtract(12, 'months');

      console.log(date.format('YYYY-MM-DD'), '12 Meses antes')

      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
    }

  }  


 
  

}
