import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ProductsProvider } from '../providers/products/products';
import { HttpModule } from '@angular/http';
import { OrdersProvider } from '../providers/orders/orders';
import { PopOverComponent } from '../components/pop-over/pop-over';
import { PreloadImage } from '../components/preload-image/preload-image';
import { CalculatePage } from '../pages/calculate/calculate';
import { PromotionsProvider } from '../providers/promotions/promotions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CategoriesProvider } from '../providers/categories/categories';
import { CameraProvider } from '../providers/camera/camera';


import { Camera } from '@ionic-native/camera';
import { Printer, PrintOptions } from '@ionic-native/printer';

import { RouteProvider } from '../providers/route/route';
import { InitailizeProvider } from '../providers/initailize/initailize';

import { PrintslipComponent } from "../components/printslip/printslip";
import { SelectCupComponent } from '../components/select-cup/select-cup';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PopOverComponent,
    PreloadImage,
    CalculatePage,
    PrintslipComponent,
    SelectCupComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PopOverComponent,
    CalculatePage,
    PrintslipComponent,
    SelectCupComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductsProvider,
    OrdersProvider,
    PromotionsProvider,
    BarcodeScanner,
    CategoriesProvider,
    CameraProvider,
    Camera,
    RouteProvider,
    InitailizeProvider,
    Printer
  ]
})
export class AppModule { }
