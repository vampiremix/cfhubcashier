import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController, ToastController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { promoArray } from '../../models/promotions.model';
import { PromotionsProvider } from '../../providers/promotions/promotions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { OrdersModel } from '../../models/orders.model';

/**
 * Generated class for the CalculatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {
  public getpromotion: promoArray;
  public total = 0;
  private cashReceive: string = "0";
  private cashReceiveShow: string = "0";
  public useOrder: OrdersModel = new OrdersModel();
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ordersPVD: OrdersProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public alertCtrl: AlertController,
    private promotionsPVD: PromotionsProvider,
    private barcodeScanner: BarcodeScanner,
    private printer: Printer,
    public toastCtrl: ToastController,

  ) {
    this.useOrder = this.ordersPVD.orderSend;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatePage');
  }

  clearList() {
    this.ordersPVD.order = [];
    this.navCtrl.pop();
  }
  numclick(num) {
    if (num == 'del') {
      if (this.cashReceive !== null && this.cashReceive.length > 1) {
        this.cashReceive = this.cashReceive.substring(0, this.cashReceive.length - 1);
        this.cashReceiveShow = this.addcomma(this.cashReceive);
      } else {
        console.log("click");
        this.cashReceive = "0"; this.cashReceiveShow = "0";
        this.cashReceiveShow = this.addcomma(this.cashReceive);
      }
    }
    if (num !== 'del') {
      if (this.cashReceive == "0" && num !== "0" && num !== "00" && this.cashReceive.length == 1) {
        this.cashReceive = num;
      } else if (this.cashReceive == "0" && num == "0" && num == "00" && this.cashReceive.length == 1) {
        this.cashReceive = '0';
      }
      else if (this.cashReceive.length >= 1) {
        this.cashReceive += num;
      }
      this.cashReceiveShow = this.addcomma(this.cashReceive);
    }
  }
  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      if (this.ordersPVD.order[i]._id == orderID) {
        this.ordersPVD.order.splice(i, 1);
        if (!this.ordersPVD.order.length) {
          this.navCtrl.pop();
        }
        break;
      }
    }
  }


  calculatePayment() {
    let loading = this.loadingCtrl.create();
    if (this.cashReceive == '0') {
      loading.dismiss();
      alert('Please recieve money from customer!');
    } else if (parseInt(this.cashReceive) < this.total) {
      alert('Cash is not enough for pay!');
    } else {
      // Send Total amount , cash from cus , cash change
      let cashChange = parseInt(this.cashReceive) - this.total;
      console.log("total : " + this.total + "\n cash : " + this.cashReceive + "\n cashChange : " + cashChange);
      this.ordersPVD.preparingOrders(this.total, this.cashReceive, cashChange);


      // this.navCtrl.push(ReceiptPage);
    }

  }

  cancelOrder() {
    this.ordersPVD.order = [];
    this.navCtrl.pop();
  }

  calculate() {
    this.total = parseInt('0');
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      console.log("Qty. : " + parseInt(this.ordersPVD.order[i].qty));
      // let totalsum = parseInt(this.ordersPVD.order[i].qty) * parseInt(this.ordersPVD.order[i].price);
      this.total += parseInt(this.ordersPVD.order[i].price);
      // this.total += totalsum;
      // console.log("this.summary.total : " + this.total);
      console.log("totalsum : " + this.total);
    }
    if (this.getpromotion) {
      // this.getpromotion.startdate = this.getpromotion.startdate.toLocaleDateString();

      // console.log("++++ TEST  :  " + JSON.stringify(this.getpromotion));
      if (this.getpromotion.discountType == "Percent") {
        // console.log("+++++++xxxxxxxxxxxxxxxxxxx+");
        this.total = this.total - ((this.total / 100) * this.getpromotion.discountValue);
      } else if (this.getpromotion.discountType == "Baht") {
        this.total = this.total - this.getpromotion.discountValue;
      }
    }
    this.total = this.addcomma(this.total);
  }

  clickNum(num) {
    if (this.cashReceive == "0" && num != "0" && num != "00" && this.cashReceive.length == 1) {
      this.cashReceive = num;
    } else if (this.cashReceive.length >= 1) {
      this.cashReceive += num;
    }
    this.cashReceiveShow = this.addcomma(this.cashReceive);
  }
  addcomma(cashReceive) {
    return cashReceive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  inputPromotion() {
    let options = {
      preferFrontCamera: true,
      showFlipCameraButton: true
    }
    this.barcodeScanner.scan(options).then((barcodeData) => {
      // Success! Barcode data is here
      let data = barcodeData.text;
      alert("CODE : " + JSON.stringify(data));
    }, (err) => {
      // An error occurred
      alert("Error : " + err);
    });




    // this.events.subscribe('getpro', (pro) => {
    //   console.log('Show pro : ', pro);
    //   this.getpromotion = pro;
    //   // console.log("++++++++++++++++ " + this.getpromotion.discountType);
    //   this.calculate();
    // });
    // let alert = this.alertCtrl.create({
    //   title: 'Promotion Code',
    //   enableBackdropDismiss: true,
    //   inputs: [
    //     {
    //       name: 'code',
    //       placeholder: 'Fill Promotion Code'

    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'OK',
    //       handler: data => {
    //         this.promotionsPVD.validatePromotion(data.code);
    //         console.log("CODE : " + data.code);
    //         // if (User.isValid(data.username, data.password)) {
    //         //   // logged in!
    //         // } else {
    //         //   // invalid login
    //         //   return false;
    //         // }
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

  print() {
    this.ordersPVD.preparingOrders(600, 222, 33);

    let printSlip = document.getElementById('print');
    // console.log(test);
    let options: PrintOptions = {
      name: 'Slip',
      printerId: '',
      duplex: true,
      landscape: false,
      grayscale: true
    };

    this.printer.check().then((data) => {
      alert("OK : " + JSON.stringify(data));
      this.printer.print(printSlip, options).then((onSuccess) => {
        let toast = this.toastCtrl.create({
          message: 'Slip printed!',
          duration: 3000,
          position: 'middle',
          cssClass: 'toasttextcenter'
        });
        toast.present();
      }
        , (onError) => {
          alert("Error printing slip!");
        });
    }, (error) => {
      alert('Error ' + JSON.stringify(error));
    });
    // this.printer.isAvailable().then((isOK)=>{alert("OK" + isOK)},(not)=>{alert("NOT! : " + not) });
    // this.printer.check().then((OnSuc) => {
    // alert("WWW");
    // this.printer.pick().then((PickSuc) => { alert("SSS :" + PickSuc) }, (Error) => { alert("Error :" + Error) })
    // }, (OnRej) => { alert("Err : " + OnRej) });
    // this.printer.isAvailable().then((onSuccess) => {




    // }, (onError) => { alert("Cannot find printter" + onError) });




  }
}
