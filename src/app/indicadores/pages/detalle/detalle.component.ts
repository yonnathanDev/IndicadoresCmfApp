import { Component, OnInit } from '@angular/core';
import { Dolar, Indicador, Indicadores, intIndicadores } from '../../interfaces/indicadores';
import { IndicadorService } from '../../services/indicador.service';

// import * as moment from 'moment/moment';
import moment from 'moment/moment';
import { ActivatedRoute } from '@angular/router';

import dataIndicadores from '../../../../assets/data/indicadores.json';



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

  style: string = 'background-color: #0a4275; margin-top: 50px;';
  
  displayedColumns: string[] = ['Fecha', 'Valor'];  
  indicador!: Indicador[];

  indicadores: intIndicadores[] = dataIndicadores;

  titulo: string = '';
  subtitulo: string = '';
  
  breadcrumb: string = 'Historial Indicadores';
  loading: boolean = true;

  op: option = {
    name: '' ,
    category: 0,
    type: '',
    year: '',
    month: '',
    day: '',
    unidadMedida: ''
  }  

  constructor(  private indicadorService: IndicadorService,
                private _router: ActivatedRoute  ) { }

  ngOnInit(): void {

    let _id = this._router.snapshot.paramMap.get('id');

    console.log(_id, 'id');

    let indicador =  this.indicadores.find(x => x.name == _id);

    if( !indicador ){
      console.log('no se encontró nada');
      return;
    }

    console.log(indicador, 'ind')
    this.op.name = indicador ? indicador.name : '' ;
    this.op.type = indicador ? indicador.type : '' ;
    this.op.category = indicador ? indicador.category : 1 ;
    this.op.unidadMedida = indicador ? indicador.measureUnit : ''

    this.titulo = `${ this.op.name } `;
    this.subtitulo = this.op.category == 1 ? 'Últimos 30 días' : 'Año actual' 


    console.log(this.op, 'op')


    this.getDate(this.op.category);
    // console.log( this.op, 'op' )
    

    this.indicadorService.getDataDetalle( this.op )
        .subscribe( ({data}) => {
          
          this.indicador = data[ this.op.type ];

          console.log( data , 'c-map' )  
          this.loading = false;
        })

  }
  

  
  getDate( option: number ){

    moment.locale('es');
    let today = moment();

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

    console.log(this.op, 'date')

  }  





}
