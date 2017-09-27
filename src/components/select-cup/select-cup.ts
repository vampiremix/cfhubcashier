import { Component, Input } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectCupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-cup',
  templateUrl: 'select-cup.html'
})
export class SelectCupComponent {
public picIcon = ["https://openclipart.org/image/2400px/svg_to_png/104185/1294538687.png","https://cdn0.iconfinder.com/data/icons/travel-line-icons-vol-1/48/015-512.png","https://image.flaticon.com/icons/png/512/112/112406.png"]
public itemCate;
  constructor(private viewCtrl: ViewController, private navParam: NavParams) {
    console.log('Hello SelectCupComponent Component');
    this.itemCate = this.viewCtrl.getNavParams();
    console.log("Com Data : " + JSON.stringify(this.itemCate));
  }
  selectSize(itemSelected){
alert("sel : " + JSON.stringify(itemSelected));
  }
}
