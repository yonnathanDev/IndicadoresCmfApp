import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe, tap, delay, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Indicador, option } from '../interfaces/indicadores';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private apiUrl: string = environment.apiUrl;
  private ApiKey: string = environment.apiKey;
  
  constructor( private http: HttpClient ) { }

  // Obtiene los datos para el detalle
  getIndicadorDetalle( op: option ): Observable<Indicador>{
    console.log('url-detalle')
    let url = '';

    if( op.category === 1 ){
      // ultimos 30 días (añadir un día más)
      url = `${ this.apiUrl }/${ op.name }/posteriores/${ op.year }/${ op.month}/dias/${ op.day}?apikey=${ this.ApiKey }&formato=json`;

    }else{
      // Año actual
      url = `${ this.apiUrl }/${ op.name }/${ op.year }?apikey=${ this.ApiKey }&formato=json`; 

    }
    
    return this.http.get<Indicador>( url );
  }

  // Manipula los datos para el detalle
  getDataDetalle( op: option ){
    
    return this.getIndicadorDetalle( op )
        .pipe(
          delay(1500),
          map(  resp =>  {

            const  data = Object( resp );

            return {data};
          }),
          catchError( err => of(err.error.msg) )
        )
  }


  // Obtiene los datos para el grafico
  getIndicadoresGrafico( option: option  ): Observable<Indicador>{
    // console.log('url-grafico')
    let url = '';

    if( option.category === 1){
      // Ultimos 10 días para UF, Dolar, Euro / parte desde el día posterior del indicado
      console.log('10-dias')
      url = `${ this.apiUrl }/${ option.name }/posteriores/${ option.year }/${ option.month}/dias/${ option.day}?apikey=${ this.ApiKey }&formato=json`;

    }else{
      // Ultimos 12 meses para UT; he IPC / parte desde el mes posterior del indicado
      console.log('12-meses')
      url = `${ this.apiUrl }/${ option.name }/posteriores/${ option.year }/${ option.month }?apikey=${ this.ApiKey }&formato=json`; 
    }    

    return this.http.get<Indicador>( url );
  }

  // Manipula los datos el gráfico
  getDataGrafico( option: option ){
    
    return this.getIndicadoresGrafico( option )
        .pipe(
          // delay(1500),
          map(  resp =>  {

            const  data = Object( resp );

            return {data};
          }),
          catchError( err => of(err.error.msg) )
        )
  }



}