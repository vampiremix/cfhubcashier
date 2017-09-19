import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, ModalController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { ProductsViewModel } from '../../models/products.model';
import { OrdersProvider } from '../../providers/orders/orders';
import { PopOverComponent } from "../../components/pop-over/pop-over";
import { CalculatePage } from '../calculate/calculate';
import { CategoriesProvider } from "../../providers/categories/categories";
import { categoriesModel, filterCatergoryModel } from '../../models/categories.model';
import { MyApp } from '../../app/app.component';
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
  public productsData: Array<ProductsViewModel> = new Array<ProductsViewModel>();
  public category = [];
  // public subcate = [];
  public prod_cate: Array<any>;
  public prod_drink: any = [];
  public prod_dessert: any = [];
  public prod_food: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productsPVD: ProductsProvider,
    private ordersPVD: OrdersProvider,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public categoriesPVD: CategoriesProvider
  ) {
    let xx = categoriesPVD.getCategory();
console.log(xx);
  }



  ionViewDidLoad() {

    console.log('ionViewDidLoad MenuPage');
    // this.productsPVD.getDataBycate().then((data) => {
    //   this.productsData.push(data);
    //   console.log(this.productsData);

    for (var indexC = 0; indexC < this.category.length; indexC++) {
      this.productsPVD.getDataBycate(this.category[indexC]._id).then((data) => {
        this.prod_cate[indexC].push(data);
        console.log("data : " + this.prod_cate[indexC]);
      }).catch((err) => { console.log("Error when get productsByID : " + err); });
    }
    //   for (var index = 0; index < this.category[indexC]. length; index++) {
    //     this.prod_cate[indexC].subcate[index].push
    // }

    // this.prod_drink = this.productsData.filter(this.filterProductDrink);
    // this.prod_dessert = this.productsData.filter(this.filterProductDessert);
    // this.prod_food = this.productsData.filter(this.filterProductFood);

    //})
  }
  // filterProduct(list, filter) {
  //   // console.log(list.category[0].name);
  //   return list.category.name == filter;
  // }



  // filterProductDrink(list) {
  //   // console.log(list.category[0].name);
  //   return list.category.name == "Drinks";
  // }
  // filterProductDessert(list) {
  //   return list.category.name == 'Dessert';
  // }
  // filterProductFood(list) {
  //   return list.category.name == 'Food';
  // }
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
    console.log("test : " + item);
    // if (item.price.length > 1 ) {
    //   item.prices = item.price[0].netprice;
    //   item.name = item.name + "(" + item.price[0].type + ")";
    // }
    // this.ordersPVD.order.push(item);
    // console.log(this.ordersPVD.order);
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
