import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

// import { MenuPage } from "../menu/menu";
// import { OrderListPage } from '../order-list/order-list';
// import { AccountPage } from '../account/account';
// import { NewsPromotionsPage } from "../news-promotions/news-promotions";
/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  menuRoot = 'MenuPage';
  orderListRoot = 'OrderListPage';
  newsPromotionsRoot = 'NewsPromotionsPage';
  accountRoot = 'AccountPage';


  constructor(public navCtrl: NavController) {}

}
