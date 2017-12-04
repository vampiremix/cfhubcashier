import { NgModule } from '@angular/core';
import { PopOverComponent } from './pop-over/pop-over';
import { PrintslipComponent } from './printslip/printslip';
import { SelectCupComponent } from './select-cup/select-cup';
import { SelectShopComponent } from './select-shop/select-shop';
@NgModule({
	declarations: [PopOverComponent,
    PrintslipComponent,
    SelectCupComponent,
    SelectShopComponent],
	imports: [],
	exports: [PopOverComponent,
    PrintslipComponent,
    SelectCupComponent,
    SelectShopComponent]
})
export class ComponentsModule {}
