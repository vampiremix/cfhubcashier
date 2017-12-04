import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Printer, PrintOptions } from '@ionic-native/printer';
import 'rxjs/add/operator/map';

/*
  Generated class for the PrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrintProvider {

  constructor(public http: Http) {
    console.log('Hello PrintProvider Provider');
  }


 
}
