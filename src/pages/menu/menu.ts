import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController,ModalController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { ProductsViewModel } from '../../models/products.model';
import { OrdersProvider } from '../../providers/orders/orders';
import { PopOverComponent } from "../../components/pop-over/pop-over";
import { CalculatePage } from '../calculate/calculate';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public productsData: ProductsViewModel = new ProductsViewModel();
  public category = "Drink";
  public prod_drink: any = [];
  public prod_dessert: any = [];
  public prod_food: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productsPVD: ProductsProvider,
    private ordersPVD: OrdersProvider,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.productsPVD.getData().then((data) => {
      this.productsData = data;

      this.prod_drink = this.productsData.products.filter(this.filterProductDrink);
      this.prod_dessert = this.productsData.products.filter(this.filterProductDessert);
      this.prod_food = this.productsData.products.filter(this.filterProductFood);

    })
  }
  filterProductDrink(list) {
    // console.log(list.category[0].name);
    return list.category[0].name == "Drinks";

  }
  filterProductDessert(list) {
    return list.category[0].name == 'Dessert';
  }
  filterProductFood(list) {
    return list.category[0].name == 'Food';
  }
  gotoCalculate() {
    
  
    if (this.ordersPVD.order.length) {
      let profileModal = this.modalCtrl.create(CalculatePage);
      profileModal.present();

      // this.navCtrl.push(CalculatePage);
    } else {
      let toast = this.toastCtrl.create({
        message: 'No order to calculate',
        duration: 3000,
        position: 'middle',
        cssClass: 'toasttextcenter'
      });
      toast.present();
    }
  }
  addtoOrder(item) {
    if (item.category[0].subcate == "coffee") {
      item.sweetness = "medium";
      item.degrees = "half";
      item.size = "M";
    }
    this.ordersPVD.order.push(item);
    console.log(this.ordersPVD.order);
  }
  clearList() {
    this.ordersPVD.order = [];
  }
  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      if (this.ordersPVD.order[i]._id == orderID) {
        this.ordersPVD.order.splice(i, 1);
        break;
      }
    }
  }
  showOption(ev, item) {

    alert(item);
   
    if (item.category[0].subcate == 'coffee') {
      let popover = this.popoverCtrl.create(PopOverComponent, item);
      popover.present({
        ev: ev
      });
      popover.onDidDismiss((opt1) => {
        alert("GET :" + opt1);

      });
    }
  }
}
