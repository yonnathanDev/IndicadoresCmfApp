import { Component, OnInit } from '@angular/core';

import { Chart, ChartConfiguration, ChartEvent, ChartData ,ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { intIndicadores, option } from '../../interfaces/indicadores';

import { IndicadorService } from '../../services/indicador.service';

// import * as moment from 'moment/moment';
import moment from 'moment/moment';

import { last, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import dataIndicadores from '../../../../assets/data/indicadores.json';



@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  fechaData: string[] = []; // Fechas del Gráfico
  valorData: number[] = []; // Valores del Gráfico
  tituloData: string = ''; //Nombre del Gráfico
  
  indicadores: intIndicadores[] = dataIndicadores; // Contiene los indicadores de indicadores.json

  tituloDetalle : number = 0; // Título del detalle
  tituloGrafico: string = ''; // Título del gráfico

  // Valores de los input del detalle
  nombreInput: string = ''; //Valor del input Nombre
  fechaInput: string = ''; // Valor del input Fecha
  unidadMedidaInput: string = ''; // Valor del input Unidad de Medida

  breadcrumb: string = 'Gráfico Indicadores'; // Breadcrumd de la sección
  loading: boolean = true; // Progress-bar de la sección, loading

  today: string = ''; // Fecha actual +1 día
  
  // Parametros dinámicos de la sección
  option: option = {
    name: '' ,
    category: 0,
    type: '',
    year: '',
    month: '',
    day: '',
    unidadMedida: ''
  }  


  constructor(  private indicadorService: IndicadorService, 
                private _router: ActivatedRoute) { }

  ngOnInit(): void {
   
    let _id = this._router.snapshot.paramMap.get('id');
    let indicador =  this.indicadores.find(x => x.name == _id);

    if( !indicador ){
      console.log('no se encontró nada');
      return;
    }

    // Se completan los parametros de la sección
    this.option.name = indicador ? indicador.name : '' ;
    this.option.type = indicador ? indicador.type : '' ;
    this.option.category = indicador ? indicador.category : 1 ;
    this.option.unidadMedida = indicador ? indicador.measureUnit : '';
    
    this.getDate(this.option.category);

    this.indicadorService.getDataGrafico( this.option )
        .subscribe( ({data}) => {

          let indicadores = data[ this.option.type ]; // obtiene los indicadores con su tipo de indicador
          let fecha; // para obtener la última fecha
          let valor; // para obtener el último valor

          for (const indicador of indicadores) {
            let valorData = parseFloat(indicador.Valor);
            let fechaData = indicador.Fecha;
            
            fecha = fechaData;
            valor = valorData;
            
            if( moment( valorData ).isAfter( this.today , 'day') ){
              console.log( valorData ,'Es mayor');
              break;
            }             

            this.valorData.push( valorData );
            this.fechaData.push( fechaData );
          }


          // Se obtienen los titulos del detalle y gráfico
          this.tituloGrafico = ( this.option.category == 1 ? 'Últimos 10 días.' : 'Últimos 12 meses');
          this.tituloDetalle = valor ? valor : 0.0;  

          // Título del Gráfico
          this.tituloData = this.option.name;

          // Valores de los input del detalle
          this.unidadMedidaInput = this.option.unidadMedida;
          this.nombreInput = this.option.name;
          this.fechaInput = fecha ? fecha : 'No se encontró la Fecha'; 
          

          // Se llama a la función para cargar el gróficos
          this.getGrafico();

          // Se finaliza el loafing
          this.loading = false;

        })    

  }

  // Configuraciín de la fecha
  getDate( option: number ){
  
    moment.locale('es');
    let today = moment();

    // Dia actual, para añadir un día, agregar lo siguiente: '.add( 1 , 'days')'
    this.today = today.format('YYYY-MM-DD');
    console.log(this.today, 'today')
    
    if(option === 1){
      // Devuelve el día, contado desde el día anterior.
      let date = today.subtract(10, 'days');
      // console.log(date.format('YYYY-MM-DD'), '10 días antes')
      this.option.year = date.format('YYYY');
      this.option.month = date.format('MM');
      this.option.day = date.format('DD');

    }else{
      // Los ultimos 12 meses
      let date = today.subtract(12, 'months');
      // console.log(date.format('YYYY-MM-DD'), '12 Meses antes')
      this.option.year = date.format('YYYY');
      this.option.month = date.format('MM');
    }

  }  
  
  // Carga información en el Gráfico
  getGrafico(){
    
    this.lineChartData = {
      labels: this.fechaData.reverse(),
      datasets: [{
        data: this.valorData.reverse(), 
        label: this.tituloData,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }]
    }    

  }

  // Configuración del gráfico
  public lineChartType: ChartType = 'line';    
  public lineChartLabels: string[] = [ ];
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: []
  };
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


  

}
