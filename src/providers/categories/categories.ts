import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { categoriesModel } from "../../models/categories.model";
/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {
  public category = [];

  ////////////////////////////////////////////////
  apiUrl: string = 'https://coffeehubserver.herokuapp.com/';
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  optionsURL = new RequestOptions({
    headers: this.headers
  });
  ////////////////////////////////////////////////

  constructor(public http: Http) {
    console.log('Hello CategoriesProvider Provider');
  }

  //Local Data 
  // getData(): Promise<Array<categoriesModel>> {
  //   return this.http.get('./assets/data/categories.json')
  //     .toPromise()
  //     .then(response => response.json() as Array<categoriesModel>)
  //     .catch(this.handleError);
  // }

  // Get Data from  Server
  getData(): Promise<Array<categoriesModel>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'api/categories').map(res => {
        // console.log(res);
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  }

  // Get Server category
  getCategory() {
    this.getData().then((data) => {
      // console.log("CATE : " + JSON.stringify(data));
      let cat, sub: Array<any> = new Array, put: object, subid;
      for (var index = 0; index < data.length; index++) {
        cat = data[index].name;
        for (var index1 = 0; index1 < data[index].subcate.length; index1++) {
          sub.push({ subcate: data[index].subcate[index1].subname, _id: data[index].subcate[index1]._id });
        }
        put = { cate: cat, subcate: sub };
        this.category.push(put);
      }
      console.log("Cate : " + JSON.stringify(this.category));
    }).catch((err) => {
      console.log("Error get Cate : " + err);
    });
    return this.category;
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
