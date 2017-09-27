import { NgModule } from '@angular/core';
import { PopOverComponent } from './pop-over/pop-over';
import { PrintslipComponent } from './printslip/printslip';
import { SelectCupComponent } from './select-cup/select-cup';
@NgModule({
	declarations: [PopOverComponent,
    PrintslipComponent,
    SelectCupComponent],
	imports: [],
	exports: [PopOverComponent,
    PrintslipComponent,
    SelectCupComponent]
})
export class ComponentsModule {}
