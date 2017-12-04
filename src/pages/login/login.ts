import { AuthenticationProvider } from '../../providers/authentication/authentication';
// import { UserModel } from '../../components/user/user.model';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App, Slides, PopoverController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsersModel } from '../../models/users.model';
import { SelectShopComponent } from '../../components/select-shop/select-shop';
// import { HomePage } from "";

/*
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private signindata = {
    /////// Comment when PRD useage //////
    username: 'admincoffeehub',
    password: 'P@ssw0rd1234'
    /////// Comment when PRD useage //////
  };

  private user: UsersModel = new UsersModel();
  public loginForm: any;
  public backgroundImage = 'assets/img/imgnew.jpg';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    private authenPVD: AuthenticationProvider,
    public popoverCtrl: PopoverController,
  ) {
  }


  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  goToLogin() {
    this.slider.slideTo(0);
  }

  goToSignup() {
    this.slider.slideTo(1);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }


  login(ev) {
    // this.navCtrl.push(HomePage);
    const loading = this.loadingCtrl.create({
    });
    loading.present();
    if (this.signindata.username !== ''
      && this.signindata.password !== ''
    ) {
      console.log('Username  ' + this.signindata.username + ' : ' + 'Password  ' + this.signindata.password);
      this.authenPVD.signin(this.signindata).then((res) => {
        console.log('User Login');
        console.log("User : " + JSON.stringify(res));
        this.user = res;
        // this.userComp.userData = res;
        window.localStorage.setItem("user", JSON.stringify(this.user));
        // alert("User Data : " + JSON.stringify(this.user));
        if (this.user.roles[0] == "shopowner" || this.user.roles[0] == "superadmin" || this.user.roles[0] == "operator") {
          if (this.user.shop.length > 1) {
            loading.dismiss();
            let opt = { enableBackdropDismiss: false }
            let popover = this.popoverCtrl.create(SelectShopComponent, this.user.shop, opt);
            popover.present({
              ev: ev
            });
            popover.onDidDismiss((selected) => {
              let loading1 = this.loadingCtrl.create({});
              loading1.present();
              // alert("GET :" + selected);
              if (selected) {
                window.localStorage.setItem("shop", JSON.stringify(selected));
                loading1.dismiss();
                this.navCtrl.push(TabsPage);
                // alert("Shop : " + JSON.stringify(selected));
              }
            });
          } else if (this.user.shop.length == 1) {
            loading.dismiss();
            this.navCtrl.push(TabsPage);
          } else { alert("Error select shop!"); loading.dismiss(); }
        } else { loading.dismiss(); alert("User is not authorize !");}

      }).catch((err) => {
        loading.dismiss();
        alert('Login failed \nPlease check your username or password');
      });
    }

    else if (this.signindata.username !== '') {
      loading.dismiss();
      alert('กรุณาใส่ password ให้ถูกต้อง');
    }

    else if (this.signindata.password !== '') {
      loading.dismiss();
      alert('กรุณาใส่ username ให้ถูกต้อง');
    }

    else {
      loading.dismiss();
      alert('กรุณาใส่ Username และ password');
    }
  }

  signup() {
    this.presentLoading('Thanks for signing up!');
    // this.navCtrl.push(HomePage);
  }
  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotohome() {
    this.navCtrl.push(TabsPage);
  }
}
