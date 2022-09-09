import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicadores } from '../interfaces/indicadores';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private apiUrl: string = 'https://api.sbif.cl/api-sbifv3/recursos_api';
  private ApiKey: string = '06fb4e5903bd1cbf9b1f3d63d3553c50efb31ac1';

  constructor( private http: HttpClient ) { }

  getIndicadorDetalle( id: string ): Observable<Indicadores>{

    // ultimos 30 días
    const url = `${ this.apiUrl }/dolar/posteriores/2022/09/dias/01?apikey=${ this.ApiKey }&formato=json`;

    // Año actual
    const urlv2 = `${ this.apiUrl }/ipc/2022?apikey=${ this.ApiKey }&formato=json`; 
    
    return this.http.get<Indicadores>( url );

  }

  getGraficoDetalle( id: string): Observable<Indicadores>{

    // Ultimos 10 días uf (agregar un mes más)
    const url = `${ this.apiUrl }/dolar/posteriores/2022/09/dias/2?apikey=${ this.ApiKey }&formato=json`; 

    //Ultimos 12 mese utm 
    const urlv2 = `${ this.apiUrl }/utm/posteriores/2022/01?apikey=${ this.ApiKey }&formato=json`; 


    return this.http.get<Indicadores>( urlv2 );

  }





}