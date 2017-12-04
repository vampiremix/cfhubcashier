import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OrdersModel } from '../../models/orders.model';
import { RouteProvider } from '../route/route';
import { UsersModel } from '../../models/users.model';
import { ShopsModel } from '../../models/shops.model';

/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdersProvider {
  public order = [];
  public orderSend: OrdersModel = new OrdersModel();
  public user: UsersModel = new UsersModel();
  public shop: ShopsModel = new ShopsModel();
  constructor(public http: Http, private routePVD: RouteProvider) {
    console.log('Hello OrdersProvider Provider');
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.shop = JSON.parse(window.localStorage.getItem('shop'));
  }


  createOrder(shopId, order): Promise<OrdersModel> {
    return new Promise((resolve, reject) => {
      this.http.post(this.routePVD.apiUrl + 'api/orders/create/' + shopId, order, this.routePVD.optionsURL).map(res => {
        // console.log(res);
        return res.json();
      }).subscribe(data => {
        resolve(data as OrdersModel);
      }, (error) => {
        reject(error);
      });
    })

  }

  preparingOrders(sumProduct, discount, total, cash, change, promotion): Promise<OrdersModel> {
    return new Promise((resolve) => {
      console.log("Start order");

      this.orderSend.shopName = this.shop.name + ' (' + this.shop.shopcode + ')';
      this.orderSend.shop = this.shop._id;
      // this.orderSend.shop = user.shop_id;  // must get shop from local storage when inital stage
      if (promotion) {
        this.orderSend.promotion = promotion;
      }
      this.orderSend.orderStatus = "waiting";
      this.orderSend.date = new Date();
      this.orderSend.amount = sumProduct;
      this.orderSend.netamount = parseInt(total);
      this.orderSend.change = parseInt(change);
      this.orderSend.cash = parseInt(cash);
      this.orderSend.items = this.order;
      this.orderSend.cashier = this.user._id;
      //  user : string; // ref User who sendOrder to save
      //   casheir : string; // ref User roles[admun or operator] 
      this.orderSend.queue = 1;
      this.orderSend.customer = "Walk-in_Customer";


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
      console.log("Calculated : ", this.orderSend);
    })

    // console.log(JSON.stringify(this.order));


  }

  getOrderlist(shop): Promise<OrdersModel>{
    return new Promise((resolve, reject) => {
      this.http.get(this.routePVD.apiUrl + 'api/orders/orderslist/' + shop).map(res => {
        // console.log(res);
        return res.json();
      }).subscribe(data => {
        resolve(data as OrdersModel);
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



