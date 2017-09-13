import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';

/**
 * Generated class for the CalculatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ordersPVD: OrdersProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatePage');
  }

  clearList() {
    this.ordersPVD.order = [];
    this.navCtrl.pop();
  }
  numclick(num) {
    if (num == 'del') {
      console.log("Del - ");
    }
  }
  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      if (this.ordersPVD.order[i]._id == orderID) {
        this.ordersPVD.order.splice(i, 1);
        if (!this.ordersPVD.order.length) {
          this.navCtrl.pop();
        }
        break;
      }
    }
  }

  usePromotion() {

  }
}
