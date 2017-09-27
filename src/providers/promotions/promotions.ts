import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { PromotionsModel } from '../../models/promotions.model';
import { RouteProvider } from '../route/route';

/*
  Generated class for the PromotionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionsProvider {
  public promotionsData: PromotionsModel = new PromotionsModel();
  constructor(public http: Http,
  public events : Events,
  private routePVD: RouteProvider
  ) {
    console.log('Hello PromotionsProvider Provider');
  }



  // get promotion from JSON
  getData(): Promise<PromotionsModel> {
    return this.http.get('./assets/data/promotions.json')
      .toPromise()
      .then(response => response.json() as PromotionsModel)
      .catch();
  }





  validatePromotion(promocode) {
    this.getData().then((res) => {
      this.promotionsData = res;
      let today: Date = new Date;
      // console.log(this.promotiondata);
      // let dataaa = res.promotions.find(promocode);
      // console.log("LOG : " + dataaa);
      let getpromo = this.promotionsData.promotions.find(data2 => { return data2.code == promocode; });
      if (!getpromo) {
        alert("Promoion code not found");
      } else if (getpromo) {
        this.events.publish('getpro', getpromo);
        // console.log("Send Promo / Promotions.ts " + JSON.stringify(getpromo));
      }
      // res.promotions.forEach(function (data) {
      //   if (data.code === promocode) {
      //     console.log("Today : " + today + "\n StartDate : " + data.startdate);
      //     // if (today > data.startdate) {

      //     // }
      //     // return data;
      //   } else {
      //     alert("Promoion code not found");
      //   }

      // });
      // alert("YEAH!!! : " + promocode + " : " + this.promotiondata.promotions.find();
      // if (this.promotiondata2["code"] == promocode) {
      //   alert("ssss");
      // } else {
      //   alert("NOOOOOOO!!!");
      // }
      // console.log("PROMOTION DATA : " + res);
    }
    ).catch((err) => {
      console.log("Error Promotion : " + err);
    });


  }
}
