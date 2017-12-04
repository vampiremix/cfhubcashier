import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductsViewModel } from '../../models/products.model';
import 'rxjs/add/operator/toPromise';
import { RouteProvider } from '../route/route';
/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  constructor(public http: Http, private routePVD: RouteProvider) {
    console.log('Hello ProductsProvider Provider');
  }

  //Local Data 
  // getData(): Promise<ProductsViewModel> {
  //   return this.http.get('./assets/data/products.json')
  //     .toPromise()
  //     .then(response => response.json() as ProductsViewModel)
  //     .catch(this.handleError);
  // }

  // Get Data from  Server
  getDataBycate(cateID): Promise<ProductsViewModel> {
    return new Promise((resolve, reject) => {
      this.http.get(this.routePVD.apiUrl + 'api/products/cate/' + cateID).map(res => {
        // console.log(res);
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  }

  getproduct(shopid): Promise<Array<ProductsViewModel>> {
    return new Promise((resolve, reject) => {
      // this.http.get(this.routePVD.apiUrl + 'api/products/').map(res => {
      this.http.get(this.routePVD.apiUrl + 'api/products/shop/' + shopid).map(res => {
        // console.log(res);
        return res.json();
      }).subscribe(data => {
        resolve(data as Array<ProductsViewModel>);
      }, (error) => {
        reject(error);
      });
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
