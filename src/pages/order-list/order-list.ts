import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  // public arr = ['1', 2];
  public shop = JSON.parse(window.localStorage.getItem("shop"));
  public orderslist;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ordersPVD: OrdersProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');

  }
  ionViewDidEnter() {
    this.ordersPVD.getOrderlist(this.shop._id).then((data) => {
      // alert("Orderslist : " + JSON.stringify(data));
      this.orderslist = data;
      // console.log(JSON.stringify(data));
    }, (err) => {
      alert("Error orderlist : " + JSON.stringify(err));
    });
  }


  doRefresh(refresher) {
    this.ordersPVD.getOrderlist(this.shop._id).then((data) => {
      // alert("Orderslist : " + JSON.stringify(data));
      this.orderslist = data;
      // console.log(JSON.stringify(data));
    }, (err) => {
      alert("Error orderlist : " + JSON.stringify(err));
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
