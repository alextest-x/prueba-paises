import { Country } from './country';
import { Region } from './region.type';

/*
se hace una interface
se define un objeto TermCountries donde ByCapital tiene un term y countries
*/


export interface CacheStore {
  byCapital:   TermCountries;
  byCountries: TermCountries;
  byRegion:    RegionCountries;
}



export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries{
  //se deja opcional la region para que se muestre al inicio o no con el operador ?
  //pero se puede quitar porque se puso un arreglo vacio en region.type.ts
  //region?: Region;
  region: Region;
  countries: Country[];
}
