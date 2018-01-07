import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  openLocalNotification() {
    let modal = this.modalCtrl.create('ModalLocalNotificationPage');
    modal.present();
  }

  openPushNotification() {
    let modal = this.modalCtrl.create('ModalPushNotificationPage');
    modal.present();
  }

}
