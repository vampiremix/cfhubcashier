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

import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PopOverComponent,
    PreloadImage,
    CalculatePage
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
    CalculatePage
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
    Camera
  ]
})
export class AppModule { }
