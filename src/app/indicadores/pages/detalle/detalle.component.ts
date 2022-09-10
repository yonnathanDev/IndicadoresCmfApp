import { Component, OnInit } from '@angular/core';
import { Dolar, Indicador, Indicadores } from '../../interfaces/indicadores';
import { IndicadorService } from '../../services/indicador.service';

import * as moment from 'moment/moment';

export interface PeriodicElement {
  name: string;
  position: number;
}

export interface option {
  name: string;
  category: number;
  type: string;
  year: string;
  month: string;
  day: string;
  unidadMedida: string;
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']  
})
export class DetalleComponent implements OnInit {

  
  displayedColumns: string[] = ['Fecha', 'Valor'];  
  indicador!: Indicador[];
  // indicadores: Indicadores[] = [
  //   {
  //     name: 'dolar',
  //     categoria: 1
  //   },
  //   {
  //     name: 'euro',
  //     categoria: 1
  //   },
  //   {
  //     name: 'uf',
  //     categoria: 1
  //   },
  //   {
  //     name: 'ipc',
  //     categoria: 2
  //   },
  //   {
  //     name: 'utm',
  //     categoria: 2
  //   }
  // ];


  op: option = {
    name: 'utm' ,
    category: 2,
    type: 'UTMs',
    year: '',
    month: '',
    day: '',
    unidadMedida: ''
  }  

  constructor( private indicadorService: IndicadorService ) { }

  ngOnInit(): void {

    let id: string = '';
    let option: number = 1;

    this.getDate(this.op.category);

    console.log( this.op, 'op' )
    

    this.indicadorService.getData( this.op )
        .subscribe( ({data}) => {
          // this.indicador = data.IPCs;
          // this.getType( data );

          switch( this.op.name ) {
      
            case 'dolar': {
              this.indicador = data.Dolares;
              console.log('dolar')
              break;
            }

            case 'euros': {
              this.indicador = data.Euros;
              console.log('uf')
              break;
            }   
            
            case 'uf': {
              this.indicador = data.UFs;
              console.log('uf')
              break;
            }            

            case 'ipc': {
              this.indicador = data.IPCs;
              console.log('ipc')
              break;
            }            
      
            case 'utm': {
              this.indicador = data.UTMs;
              console.log('utm')
              break;
            }
      
            default: {
              console.log('end')
              break;
            }
      
          }          

          console.log( data , 'c-map' )  

        })

  }
  




  
  getDate( option: number ){
  
    moment.locale('es');
    let today = moment();
    let res: moment.Moment; 

    if(option == 1){
      // Devuelve el día, contado desde el día anterior.
      // res = today.subtract(30, 'days').format('YYYY-MM-DD');
      let date = today.subtract(30, 'days');
      this.op.year = date.format('YYYY');
      this.op.month = date.format('MM');
      this.op.day = date.format('DD');

    }else{
      // Devuelve el año actual
      // date = today.subtract(12, 'months').format('YYYY-MM');
      this.op.year = today.format('YYYY')
    }

  }  





}
