import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RouteProvider } from '../route/route';
import { UsersModel } from '../../models/users.model';
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: Http,private routePVD: RouteProvider) {
    console.log('Hello AuthenticationProvider Provider');
  }
  signin(logindata): Promise<UsersModel> {
    return new Promise((resolve, reject) => {
      this.http.post(this.routePVD.apiUrl + 'api/auth/signin', logindata, this.routePVD.optionsURL).map(res => {
        return res.json();
      }).subscribe(data => {
        resolve(data as Promise<UsersModel>);
      }, (error) => {
        reject(error);
      });
    })
  }
}
