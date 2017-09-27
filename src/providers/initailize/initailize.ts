import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { CategoriesProvider } from '../categories/categories';
import { ProductsProvider } from '../products/products';
import { MenuPage } from '../../pages/menu/menu';

/*
  Generated class for the InitailizeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InitailizeProvider {
  public state = 1;
  public loading;

  constructor(public http: Http, public loadingCtrl: LoadingController,
    public categoryPVD: CategoriesProvider,
    public productsPVD: ProductsProvider
  ) {
    console.log('Hello InitailizeProvider Provider');
  }

}

