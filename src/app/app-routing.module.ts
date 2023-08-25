import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';

import { TestPageComponent } from './shared/pages/test-page/test-page.component';
//import { CountryPageComponent } from './countries/pages/country-page/country-page.component';


const routes: Routes = [
 //{
 // path: 'home',
 // component: HomePageComponent
 //},
 {
  path: 'about',
  component: AboutPageComponent
 },
 {
  path: 'contact',
  component: ContactPageComponent
 },
 {
  path: 'countries',
  //component: CountryPageComponent
  //no carga en componentes porque esta separado
  //hay que cargar desde loadChildren e importando rl countriesModules
  loadChildren: () => import('./countries/countries.module').then( m=> m.CountriesModule )

 },
 {
  path: 'test',
  component: TestPageComponent
 },


{
 //redirige a la pagina por default
  path: '**',
  //redirectTo: 'home'
  redirectTo: 'countries'
}

];


@NgModule({
  imports:[
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule { }
