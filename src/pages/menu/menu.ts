import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, ModalController, LoadingController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { ProductsViewModel } from '../../models/products.model';
import { OrdersProvider } from '../../providers/orders/orders';
import { PopOverComponent } from "../../components/pop-over/pop-over";
import { CalculatePage } from '../calculate/calculate';
import { CategoriesProvider } from "../../providers/categories/categories";
import { SelectCupComponent } from '../../components/select-cup/select-cup';
// import { categoriesModel, filterCatergoryModel } from '../../models/categories.model';
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
  public category = "Drink";
  public prod_drink: Array<any> = new Array;
  public prod_dessert: Array<any> = new Array;
  public prod_food: Array<any> = new Array;
  public catlength;
  public state = 1;
  public loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productsPVD: ProductsProvider,
    private ordersPVD: OrdersProvider,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public categoriesPVD: CategoriesProvider,
    public loadingCtrl: LoadingController
  ) {
 
  }

  ionViewDidLoad() {
    this.initailze();
    console.log('ionViewDidLoad MenuPage');
  }

  filterProductDrink(list) {
    return list.category.name == "Drink";
  }
  filterProductDessert(list) {
    return list.category.name == 'Dessert';
  }
  filterProductFood(list) {
    return list.category.name == 'Food';
  }

  gotoCalculate() {
    if (this.ordersPVD.order.length) {
      let profileModal = this.modalCtrl.create(CalculatePage);
      profileModal.present();
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

  addtoOrder(ev, item) {
    if (item.category.name == 'Drink') {
      let popover = this.popoverCtrl.create(SelectCupComponent, item);
      popover.present({
        ev: ev
      });
      popover.onDidDismiss((selected) => {
        // alert("GET :" + selected);
        if (selected) {
          this.ordersPVD.order.push(
            { product: item, qty: 1, selectedPrice: selected}
          )
        }
      });
    } else if (item.price.length == 1 && item.category.name !== 'Drink') {
      
      this.ordersPVD.order.push(
        { product: item, qty: 1, selectedPrice: item.price[0]}
      );
    }

    // console.log("test : " + JSON.stringify(item));
    // let prodItem = { name: '', price: 0 ,prices :0};

    console.log("Result : " + JSON.stringify(this.ordersPVD.order));
  }

  clearList() {
    this.ordersPVD.order = [];
  }

  deleteOrder(index) {
    console.log(index);
    this.ordersPVD.order.splice(index, 1);
  }

  showOption(ev, item) {
    // alert(item);
    let popover = this.popoverCtrl.create(PopOverComponent, item);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((opt1) => {
      alert("GET :" + opt1);
    });
  }


  initailze() {
    this.presentLoadingDefault();
    console.log("Do initialize");

    this.productsPVD.getproduct("WW").then((data) => {

      this.prod_drink = data.filter(this.filterProductDrink);
      this.prod_dessert = data.filter(this.filterProductDessert);
      this.prod_food = data.filter(this.filterProductFood);
    });
    // this.loading.present();
    // this.categoriesPVD.getCategory().then(data2 => {
    //   console.log("cate : " + data2);

    // }
    // ).catch((err) => alert("Error !"));


  }
  
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Initialize state...'
    });
  }


}
