import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.handlerNotifications();
    });
  }

  private handlerNotifications() {
    this.oneSignal.startInit('b417fa2e-b728-4e1c-ab53-aac30da8bf3d', '164948729696');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    
    this.sendUserOneSignalTags();//#########DEMO#############
    
    //recibo la notificación
    this.oneSignal.handleNotificationReceived()
      .subscribe(jsonData => {
        console.log('notificationReceived: ' + JSON.stringify(jsonData));
      });

    //si abro la notificación se ejecuta este código
    this.oneSignal.handleNotificationOpened()
      .subscribe(jsonData => {
        let alert = this.alertCtrl.create({
          title: jsonData.notification.payload.title,
          subTitle: jsonData.notification.payload.body,
          buttons: ['OK']
        });
        alert.present();
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      });
    this.oneSignal.endInit();
  }

  //Función para enviar tags de mis usuarios para luego poder hacer segmentación
  sendUserOneSignalTags(){
    this.oneSignal.sendTags({ key1: "value1", key2: "value2" });
    alert("tags sent")
    this.oneSignal.getTags().then((tags)=>{
      console.log("tags recibidos: "+JSON.stringify(tags))
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
