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
      console.log(url, 'url DOLAr')
    }else{
      // Año actual
      // url = `${ this.apiUrl }/ipc/2022?apikey=${ this.ApiKey }&formato=json`; 
      url = `${ this.apiUrl }/${ op.name }/${ op.year }?apikey=${ this.ApiKey }&formato=json`; 
      console.log(url, 'url UTM')

    }

    
    return this.http.get<Indicador>( url );

  }

  getData( op: option ){
    // let id = ''; 
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


  getIndicadorUf( id: string ): Observable<Uf>{

    // ultimos 30 días (añadir un día más)
    const url = `${ this.apiUrl }/uf/posteriores/2010/01/dias/01?apikey=${ this.ApiKey }&formato=json`;
    
    // Año actual
    const urlv2 = `${ this.apiUrl }/ipc/2022?apikey=${ this.ApiKey }&formato=json`; 
    
    return this.http.get<Uf>( url );

  }    

  getGraficoDetalle( id: string): Observable<Dolar>{

    // Ultimos 10 días uf (agregar un mes más)
    const url = `${ this.apiUrl }/dolar/posteriores/2022/09/dias/2?apikey=${ this.ApiKey }&formato=json`; 

    //Ultimos 12 mese utm (Agregar un mes más)
    const urlv2 = `${ this.apiUrl }/utm/posteriores/2022/01?apikey=${ this.ApiKey }&formato=json`; 


    return this.http.get<Dolar>( urlv2 );

  }

  getUnidadActual( id: string ): Observable<Dolar>{

    // Resultado en espcifico
    const url = `${ this.apiUrl }/dolar/2010/01/dias/05?apikey=${ this.ApiKey }&formato=json`; 

    // Resultado en especifico
    const urlv2 = `${ this.apiUrl }/utm/2010/01?apikey=${ this.ApiKey }&formato=json`; 

    return this.http.get<Dolar>( url )

  }




}