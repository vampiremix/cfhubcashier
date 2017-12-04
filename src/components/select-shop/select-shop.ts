import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ShopsModel } from '../../models/shops.model';

/**
 * Generated class for the SelectShopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-shop',
  templateUrl: 'select-shop.html'
})
export class SelectShopComponent {
  public shops: Array<ShopsModel> = new Array<ShopsModel>();

  constructor(private viewCtrl: ViewController, private navParam: NavParams) {
    console.log('Hello SelectShopComponent Component');
    this.shops = this.viewCtrl.getNavParams().data;
  }
  selectShop(shopSelected) {
    this.viewCtrl.dismiss(shopSelected);
  }
}
