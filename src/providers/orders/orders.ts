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



  preparingOrders(sumProduct, discount, total, cash, change, promotion): Promise<OrdersModel> {
    return new Promise((resolve) => {
      console.log("Start order");
      let user = JSON.parse(window.localStorage.getItem('user'));
      this.orderSend.shop = "ละมุนภัณฑ์";
      // this.orderSend.shop = user.shop_id;  // must get shop from local storage when inital stage
      if (promotion) {
        this.orderSend.promotion = promotion;
      }
      this.orderSend.date = new Date();
      this.orderSend.amount = sumProduct;
      this.orderSend.net_amount = parseInt(total);
      this.orderSend.change = parseInt(change);
      this.orderSend.cash = parseInt(cash);
      this.orderSend.items = this.order;


      this.orderSend.receiptNo = "TESTreceiptXXXXXXX";
      //  user : string; // ref User who sendOrder to save
      //   casheir : string; // ref User roles[admun or operator] 
      this.orderSend.queue = 1;
      this.orderSend.customer = "Cus_TEST";


      // for (let _i = 0; _i < this.order.length; _i++) {
      //   items.push({
      //     product_id: this.order[_i]._id,
      //     amount: this.order[_i].price,
      //     qty: this.order[_i].qty,
      //     // sweetness: this.order[_i].category[.subcate == "coffee" ? this.order[_i].sweetness : null,
      //     // degrees: this.order[_i].category[0].subcate == "coffee" ? this.order[_i].degrees : null
      //   });

      // }
      resolve(this.orderSend);
      console.log("Calculated : " , this.orderSend);
    })

    // console.log(JSON.stringify(this.order));


  }
}
