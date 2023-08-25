import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {



// Subject
// es un observador manual como un observable
// private debouncer = new Subject<string>();
private debouncer: Subject<string>= new Subject<string>();


private debouncerSuscription?: Subscription;


  //llevar el placeholder a la vista
  //search-box-component.html
@Input()
public placeholder: string= '';


@Input()
public initialValue: string='';


//public onValue: new EventEmitter<string> = new EventEmitter<string>();
//crear un event emitter  myEvent = new EventEmitter();
// para enviar el evento a la vista
@Output()
public onValue = new EventEmitter<string>();

//este es para el observador debouncer para enviar el evento a la vista
@Output()
public onDebounce= new EventEmitter<string>();


//es un obsevable tiene acceso a todos los objetos de rx
//el observador  this.debouncer emite un valor llega al pipe
//el pipe tiene debounceTime que es nuestro operador y este dice que hay que esperar
//un seg para ver sino recibe mas valores para emitirlo al subscribe
//si recibe otro valor espera otros seg hasta que ya no recibe mas valores

ngOnInit(): void {
  this.debouncerSuscription = this.debouncer
  .pipe(
    debounceTime(300)
  )
  .subscribe( value => {
    this.onDebounce.emit(value);
    console.log('debouncer value', value)
  });
}

//hay qu generar un ngOnDestroy para desactivar el sobscribe del ngOnInit()
ngOnDestroy(): void {
 this.debouncerSuscription?.unsubscribe();
 //console.log('eliminar');
}



emitValue(value: string) : void {
this.onValue.emit(value);

}

//next para la emision del observador
onKeyPress(searchTerm: string){
 this.debouncer.next(searchTerm);
  console.log(searchTerm);
}

}
