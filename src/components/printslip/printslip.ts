import { Component, Input } from '@angular/core';
import { OrdersModel } from '../../models/orders.model';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the PrintslipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'printslip',
  templateUrl: 'printslip.html'
})
export class PrintslipComponent {
  @Input() order: OrdersModel;
  dateStr: string;
  constructor(
    private printer: Printer,
    public toastCtrl: ToastController

  ) {
    console.log('Hello PrintslipComponent Component');
    let d = new Date();
    this.dateStr = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getUTCMinutes();
    alert("order in print slip : " + this.order);
  }
  printSlipOrder() {
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
      // alert("OK : " + JSON.stringify(data));
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
          alert("PRINT : " + printSlip);
          alert("Error printing slip! : " + onError);
        });
    }, (error) => {
      alert('Error! : ' + JSON.stringify(error));
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
