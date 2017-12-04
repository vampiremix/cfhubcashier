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
  public picIcon = [
    { name: "hot", icon: "./assets/img/hotcup.png" },
    { name: "iced", icon: "./assets/img/icedcup.png" },
    { name: "frappe", icon: "./assets/img/frappecup.png" }];
  public itemCate;
  constructor(private viewCtrl: ViewController, private navParam: NavParams) {
    console.log('Hello SelectCupComponent Component');
    this.itemCate = this.viewCtrl.getNavParams();
    // console.log("Com Data : " + JSON.stringify(this.itemCate));
  }
  selectSize(itemSelected) {
    this.viewCtrl.dismiss(itemSelected);
    // alert("sel : " + JSON.stringify(itemSelected));
  }
}
