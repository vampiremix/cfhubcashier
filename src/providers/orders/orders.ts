import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OrdersModel } from '../../models/orders.model';
import { RouteProvider } from '../route/route';

/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdersProvider {
  public order = [];
  public orderSend: OrdersModel = new OrdersModel();
  constructor(public http: Http, private routePVD: RouteProvider) {
    console.log('Hello OrdersProvider Provider');
  }



  preparingOrders(total, cash, change) {
    console.log("Start order");
    // console.log(JSON.stringify(this.order));
    let user = JSON.parse(window.localStorage.getItem('user'));
    this.orderSend.shop = "SSSSS";
    // this.orderSend.shop = user.shop_id;  // must get shop from local storage when inital stage
    this.orderSend.date = Date();
    this.orderSend.net_amount = total;
    this.orderSend.change = change;
    this.orderSend.cash = cash;
    let items = [];

    for (let _i = 0; _i < this.order.length; _i++) {
      items.push({
        product_id: this.order[_i]._id,
        amount: this.order[_i].price,
        qty: this.order[_i].qty,
        // sweetness: this.order[_i].category[.subcate == "coffee" ? this.order[_i].sweetness : null,
        // degrees: this.order[_i].category[0].subcate == "coffee" ? this.order[_i].degrees : null
      });

    }
    this.orderSend.items = items;
    console.log(">>>>>>>>" + JSON.stringify(this.orderSend));
  }
}
