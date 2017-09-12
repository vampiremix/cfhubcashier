import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';

/**
 * Generated class for the PopOverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pop-over',
  templateUrl: 'pop-over.html'
})
export class PopOverComponent {
  public opts = { degrees: "", sweetness: "" };
  public degrees;
  public sweetness;
  constructor(private viewCtrl: ViewController, private navParam: NavParams,
    private ordersPVD: OrdersProvider,
    private navCtrl: NavController) {
    // let aa = viewCtrl.getNavParams();
    console.log('Hello PopOverComponent Component');
    // this.opts.degrees = aa.data.degrees;
    // this.opts.sweetness = aa.data.sweetness;
    // alert("ss : " + JSON.stringify(aa));
  }
}
