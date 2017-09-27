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
  // public subcate = [];
  public prod_cate: Array<any> = new Array;
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
    // this.catlength = this.categoriesPVD.category.length;
    // console.log("DD : " + this.catlength);

    // this.productsPVD.getDataBycate(this.categoriesPVD.category[0]._id).then((data) => {
    //   console.log("!1111");
    //   this.prod_cate[0].push(data);
    //   console.log("data : " + this.prod_cate[0]);
    // }).catch((err) => { console.log("Error when get productsByID : " + err); });




    // for (var indexC = 0; indexC < this.categoriesPVD.category.length; indexC++) {
    //   console.log("2222");
    //   this.productsPVD.getDataBycate(this.categoriesPVD.category[indexC]._id).then((data) => {
    //     console.log("!1111");
    //     this.prod_cate[indexC].push(data);
    //     console.log("data : " + this.prod_cate[indexC]);
    //   }).catch((err) => { console.log("Error when get productsByID : " + err); });
    // }
  }



  ionViewDidLoad() {
    this.initailze();
    console.log('ionViewDidLoad MenuPage');
    // this.productsPVD.getDataBycate().then((data) => {
    //   this.productsData.push(data);
    //   console.log(this.productsData);


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



  filterProductDrink(list) {
    // console.log(list.category[0].name);
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
            { product: item, qyt: 1, selectedPrice: selected}
          )
        }
      });
    } else if (item.price.length == 1 && item.category.name !== 'Drink') {
      this.ordersPVD.order.push(
        { product: item, qyt: 1, selectedPrice: item.price[0]}
      );
    }

    // console.log("test : " + JSON.stringify(item));
    // let prodItem = { name: '', price: 0 ,prices :0};

    console.log("Result : " + JSON.stringify(this.ordersPVD.order));
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
