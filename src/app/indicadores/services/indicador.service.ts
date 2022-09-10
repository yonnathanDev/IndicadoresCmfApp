import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe, tap, delay, catchError, of } from 'rxjs';

import { Dolar, Indicador, Uf } from '../interfaces/indicadores';
import { option } from '../pages/detalle/detalle.component';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private apiUrl: string = 'https://api.cmfchile.cl/api-sbifv3/recursos_api';
  private ApiKey: string = '06fb4e5903bd1cbf9b1f3d63d3553c50efb31ac1';
  
  constructor( private http: HttpClient ) { }

  getIndicadorDetalle( op: option ): Observable<Indicador>{

    let url = '';
    console.log( op, 'aray-op');

    if( op.category === 1 ){
      // ultimos 30 días (añadir un día más)
      // url = `${ this.apiUrl }/dolar/posteriores/2022/08/dias/10?apikey=${ this.ApiKey }&formato=json`;
      url = `${ this.apiUrl }/${ op.name }/posteriores/${ op.year }/${ op.month}/dias/${ op.day}?apikey=${ this.ApiKey }&formato=json`;
      console.log(url, 'url Dolar')
    }else if( op.category === 2){
      // Año actual
      // https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/posteriores/2021/09?
      url = `${ this.apiUrl }/${ op.name }/posteriores/${ op.year }/${ op.month }?apikey=${ this.ApiKey }&formato=json`; 
      console.log(url, 'url UTM')
    }else{
      // 
      url = `${ this.apiUrl }/${ op.name }/${ op.year }?apikey=${ this.ApiKey }&formato=json`; 
      console.log(url, 'url UTM')

    }

    
    return this.http.get<Indicador>( url );

  }


  getData( op: option ){
    
    return this.getIndicadorDetalle( op )
        .pipe(
          // delay(100),
          map(  resp =>  {

            const  data = Object( resp )
            console.log(data, 's-map')

            return {data};
          }),
          catchError( err => of(err.error.msg) )
        )
  }






}