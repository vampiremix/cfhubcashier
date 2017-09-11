import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPromotionsPage } from './news-promotions';

@NgModule({
  declarations: [
    NewsPromotionsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPromotionsPage),
  ],
})
export class NewsPromotionsPageModule {}
