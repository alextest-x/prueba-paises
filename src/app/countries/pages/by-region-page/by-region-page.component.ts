import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';
//import { HttpClient } from '@angular/common/http';

import { Region } from '../../interfaces/region.type';


//se usa type cuando ya no av extenderse
//y es un tipo estricto para que no cambien codigo desde afurera

//se pasa ala interface de region.type.ts
//type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'




@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[]= [];

  public regions:Region[]= ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;



  constructor(private countriesService : CountriesService){}

  ngOnInit(): void {
    this.countries= this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;


  }

  searchByRegion( region: Region ):void  {

    this.selectedRegion = region;
    this.countriesService.searchRegion(region)
    .subscribe(countries => {
       this.countries= countries;

       console.log('Desde ByRegionPage');
       console.log({region});
    });

  }
}
