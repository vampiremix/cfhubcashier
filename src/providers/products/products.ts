import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductsViewModel } from '../../models/products.model';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  ////////////////////////////////////////////////
  apiUrl: string = 'https://coffeehub.herokuapp.com/';
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  optionsURL = new RequestOptions({
    headers: this.headers
  });
  ////////////////////////////////////////////////

  constructor(public http: Http) {
    console.log('Hello ProductsProvider Provider');
  }

  //Local Data 
  getData(): Promise<ProductsViewModel> {
    return this.http.get('./assets/data/products.json')
      .toPromise()
      .then(response => response.json() as ProductsViewModel)
      .catch(this.handleError);
  }

  // Get Data from  Server
  // getData(): Promise<ProductsViewModel> {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.apiUrl + 'api/products').map(res => {
  //       // console.log(res);
  //       return res.json();
  //     }).subscribe(data => {
  //       resolve(data);
  //     }, (error) => {
  //       reject(error);
  //     });
  //   })
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
