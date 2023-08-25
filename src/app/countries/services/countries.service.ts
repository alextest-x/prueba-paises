import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  constructor(private http: HttpClient ) {
    this.loadFromLocalStorage();
  }


private saveToLocalStorage(){

  localStorage.setItem('cachestore', JSON.stringify(this.cacheStore));

}

private loadFromLocalStorage(){
  if( !localStorage.getItem('cacheStore') ) return;

  this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );

}

private getCountriesRequest(url: string): Observable<Country[]>{
return this.http.get<Country[]>(url)
   .pipe(
      catchError( () => of ( [] ) ),
      // delay(300),
      );

}


//metodo para el country-page.component.ts y country-page.component.Html
searchCountryByAlphaCode( code: string): Observable<Country | null>  {
  //const url= `${ this.apiUrl }/capital/${ term }`;
  const url= `${ this.apiUrl }/alpha/${ code }`;
  return this.http.get<Country[]>( url )
  .pipe(
    //map transfoma la informacion
    //el observador regresa un rreglo de paises
    // countries > 0 entonces hay uno o mas entonces regresa en la posion cero osea el primero
    //sino existe regresa un null
    map( countries => countries.length > 0 ? countries [0]: null),
    catchError( () => of ( null ) )
    //delay(2000),
  );
}

/*
  //se recibe el term y va a regresar un observable con tipo de dato mas de uno un arreglo de country
  //entonces hay que poner en el get el tipo de dato get<Country[]>
  //para escuchar hay que poner un subcribe para que se ejecute la instruccion

  searchCapital ( term: string  ) : Observable <Country[]> {
    const url = `${ this.apiUrl}/capital/${ term }`
    return this.http.get<Country[]>(url);
     }
*/

 //detectar el error catchError utilizando pipe regresando un nuevo observador
 //con el of de rxjs
 //que construye un observador basado en el argumento que le mandamos
 //y regresa un arreglo vacio
searchByCapital ( term: string  ) : Observable <Country[]> {

  const url = `${ this.apiUrl}/capital/${ term }`;
  return this.getCountriesRequest(url)
     .pipe(
       tap( countries => this.cacheStore.byCapital={ term, countries } ),
       tap( () => this.saveToLocalStorage()),
      );
 }


  searchCountry( term: string ): Observable <Country[]>{
   //https://restcountries.com/v3.1/name/{name}?fullText=true
    const url = `${ this.apiUrl}/name/${ term }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries={ term, countries } ),
      tap( () => this.saveToLocalStorage()),
     );

  }

   searchRegion( region: Region): Observable <Country[]>{
    // https://restcountries.com/v3.1/region/{region}

    const url = `${ this.apiUrl}/region/${ region }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion={ region, countries } ),
      tap( () => this.saveToLocalStorage()),
     );
}


}
