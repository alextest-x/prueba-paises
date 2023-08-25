//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
//import { CountriesModule } from '../../countries.module';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  //inicializamos el arrglo para mostrarlo en Html
  //que lo usamos en el subscribe
  public countries: Country[]=[];
  public isLoading: boolean= false;
  public initialValue: string= '';

  //hay que inyectar el servicio para llamar el servicio desde aqui
  constructor (private countriesService: CountriesService){}


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

 //hay que poner el subscribe para que llegen las notificaciones
 //y countries muestre los paises

  searchByCapital( term: string): void {

    this.isLoading = true;

    this.countriesService.searchByCapital( term )
    .subscribe(countries => {
      this.countries= countries;
      this.isLoading = false;

      console.log('Desde ByCapitalPage');
      console.log({term});


  });
}


}
