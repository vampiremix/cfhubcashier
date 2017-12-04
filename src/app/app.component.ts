import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { CategoriesProvider } from '../providers/categories/categories';
import { LoginPage } from '../pages/login/login';
import { OneSignal } from '@ionic-native/onesignal';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
     catePVD: CategoriesProvider,
     private oneSignal: OneSignal) {
    platform.ready().then(() => {
      let user = window.localStorage.getItem("user");
      if(user){
        // this.rootPage = TabsPage;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // catePVD.getCategory();


      this.oneSignal.startInit('4c618e76-fe84-4d1d-9101-8f791df2d0aa', 'coffee-hub-cashier');
      
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.handleNotificationReceived().subscribe(() => {
       // do something when notification is received
      });
      
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      
      this.oneSignal.endInit();
    });
  }

  
}

