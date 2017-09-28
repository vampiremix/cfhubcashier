import { Component, Input } from '@angular/core';
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
  @Input() order: any;
  text: string;
  dateStr: string;
  constructor() {
    console.log('Hello PrintslipComponent Component');
   let d = new Date();
      this.dateStr =  d.getDate() +'/'+ d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getUTCMinutes();
  }
}
