import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { promoArray } from '../../models/promotions.model';
import { PromotionsProvider } from '../../providers/promotions/promotions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { OrdersModel } from '../../models/orders.model';

import { Printer, PrintOptions } from '@ionic-native/printer';

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
  public sumProduct = 0;
  public total = 0;
  public discount = 0;
  private cashReceive: string = "0";
  private cashReceiveShow: string = "0";
  // public useOrder: OrdersModel = new OrdersModel() ;
  public useOrder;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private ordersPVD: OrdersProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public alertCtrl: AlertController,
    private promotionsPVD: PromotionsProvider,
    private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController,
    public slipmodalCtrl: ModalController,
    private printer: Printer,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatePage');
    this.calculate();
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
    let productItems;
    loading.present();
    if (this.cashReceive == '0') {
      loading.dismiss();
      alert('Please recieve money from customer!');
    } else if (parseInt(this.cashReceive) < this.total) {
      alert('Cash is not enough for pay!');
      loading.dismiss();
    } else {
      // Send Total amount , cash from cus , cash change
      let cashChange = parseInt(this.cashReceive) - this.total;
      // console.log("total : " + this.total + "\n cash : " + this.cashReceive + "\n cashChange : " + cashChange);
      let shop = JSON.parse(window.localStorage.getItem('shop'));
      this.ordersPVD.preparingOrders(this.sumProduct, this.discount, this.total, this.cashReceive, cashChange, this.getpromotion).then((OrderData) => {
        // Send param 4 set 1.sumProduct(not include vat and promotion), 2. total(sumproduct include vat and promotion),
        // 3.cashReceive(money from customer), 4.cashChange(summery of total- cash), 5. promotion
        this.ordersPVD.createOrder(shop._id, OrderData).then((data) => {
          loading.dismiss();
          this.useOrder = data;
          // alert("Slip : " + JSON.stringify(this.useOrder.items));
          let d = new Date(this.useOrder.date);
          let dateOrder = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
          for (var i = 0; i < this.useOrder.items.length; i++) {
            let theme = `<tr>
            <td style="width:70%">`+ this.useOrder.items[i].product.name + `</td>
            <td style="width:5%; text-align:center;">`+ this.useOrder.items[i].qty + `</td>
            <td style="width:25%; text-align:right;">`+ this.useOrder.items[i].selectedPrice.netprice + `</td>
          </tr>`
            productItems += theme
          }
          // alert("Product item : " + productItems);
          let printSlip = `<table style="width:40%" border="0" cellspacing="0" cellpadding="0">
          <tr><td colspan="3" style="text-align:center;"><img src="`+ shop.logo + `" style="width:40%; height:auto; filter: grayscale(100%);"></td></tr>
<tr>
  <th colspan="3" style="text-align:center;">Receipt</th>
</tr>
<tr>
  <td colspan="3" style="text-align:center;">`+ this.useOrder.shopName + `</td>
</tr>
<tr>
<td colspan="3" style="text-align:center;">Queue : `+ this.useOrder.queue + `</td>
</tr>
<tr>
  <td colspan="2">Receipt No. : `+ this.useOrder.receiptNo + `</td>
  <td></td>
</tr>
<tr>
  <td colspan="2">Date : `+ dateOrder + `</td>
  <td></td>
</tr>
<tr>
  <td colspan="2">Customer : `+ this.useOrder.customer + `</td>
  <td></td>
</tr>
<tr>
<td colspan="3" style="text-align:center;">=================================</td>
</tr>
<tr>
<td style="width:70%"><b>Products :</b></td>
<td style="width:5%;text-align:center;"><b>Qty</b></td>
<td style="width:25%;text-align:right;"><b>Price</b></td>
</tr>
`+
            productItems
            + `
<tr>
<td colspan="3" style="text-align:center;">=================================</td>
</tr>
<tr>
  <td>Sub total : </td>
  <td></td>
  <td style="text-align:right">`+ this.useOrder.amount + `</td>
</tr>
<tr>
  <td>Discount : </td>
  <td></td>
  <td style="text-align:right">`+ (this.useOrder.discount || 0) + `</td>
</tr>
<tr>
  <td>Total : </td>
  <td></td>
  <td style="text-align:right">`+ this.useOrder.netamount + `</td>
</tr>
<tr>
  <td colspan="2">Receive : Cash : `+ this.useOrder.cash + `</td>
  <td style="text-align:right">`+ this.useOrder.change + `</td>
</tr>
<tr>
  <td colspan="3" style="text-align:center;">=================================</td>
</tr>
<tr>
  <td colspan="3" style="text-align:center;">Thank you.</td>
</tr>
</table>`;

          // this.printSlipOrder(printSlip);
          this.printSlipOrder(printSlip);
        }, (err) => { alert("Error create order : " + err); loading.dismiss(); });
      });
    }
  }

  cancelOrder() {
    this.ordersPVD.order = [];
    this.navCtrl.pop();
  }

  calculate() {
    this.total = parseInt('0');
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      // let totalsum = parseInt(this.ordersPVD.order[i].qty) * parseInt(this.ordersPVD.order[i].price);
      this.total += parseInt(this.ordersPVD.order[i].selectedPrice.netprice);
      this.sumProduct += parseInt(this.ordersPVD.order[i].selectedPrice.netprice);
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
    this.sumProduct = this.addcomma(this.sumProduct);
    this.total = this.addcomma(this.total);
  }

  clickNum(num) {
    if (this.cashReceive == "0" && num !== "0" && num !== "00" && this.cashReceive.length == 1) {
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

  // printSlipOrder(slip) {

  //   this.printer.check().then((data) => {
  //     // this.printer.pick().then((select) => {
  //     //   alert("Printer Selected : " + select);
  //     // }), (err) => { alert("Pick printer Error : " + err); }
  //     if (data) {
  //       // alert("OK : " + JSON.stringify(data));
  //       let options: PrintOptions = {
  //         name: 'Slip',
  //         printerId: '',
  //         duplex: true,
  //         landscape: false,
  //         grayscale: true
  //       };
  //       this.printer.print(slip, options).then((onSuccess) => {
  //         let toast = this.toastCtrl.create({
  //           message: 'Slip printed!',
  //           duration: 3000,
  //           position: 'middle',
  //           cssClass: 'toasttextcenter'
  //         });
  //         toast.present();
  //       }, (onError) => {
  //         // alert("PRINT : " + printSlip);
  //         alert("Error printing slip! : " + onError);
  //       });
  //     } else { alert("Print slip erro : No print data.") }

  //   }, (error) => {
  //     alert('Error! : ' + JSON.stringify(error));
  //   });
  // }


  printSlipOrder(slip) {
    
        this.printer.check().then((data) => {
          // this.printer.pick().then((select) => {
          //   alert("Printer Selected : " + select);
          // }), (err) => { alert("Pick printer Error : " + err); }
          if (data) {
            // alert("OK : " + JSON.stringify(data));
            let options: PrintOptions = {
              name: 'Slip',
              printerId: 'http://192.168.3.56:9100',
              duplex: true,
              landscape: false,
              grayscale: true
            };
            this.printer.print(slip, options).then((onSuccess) => {
              let toast = this.toastCtrl.create({
                message: 'Slip printed!',
                duration: 3000,
                position: 'middle',
                cssClass: 'toasttextcenter'
              });
              toast.present();
            }, (onError) => {
              // alert("PRINT : " + printSlip);
              alert("Error printing slip! : " + onError);
            });
          } else { alert("Print slip erro : No print data.") }
    
        }, (error) => {
          alert('Error! : ' + JSON.stringify(error));
        });
      }
}
