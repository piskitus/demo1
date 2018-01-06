import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';



@IonicPage()
@Component({
  selector: 'page-modal-local-notification',
  templateUrl: 'modal-local-notification.html',
})
export class ModalLocalNotificationPage {

  notification:any = {
    title: null,
    description: null,
    beacons: null
  };
  beacons:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private dbFirebase: FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalLocalNotificationPage');

    this.dbFirebase.getBeacons().subscribe(beacons=>{
      this.beacons = beacons;
    })

  }

  sendNotification(){
    console.log(this.notification.beacons); //["6a1a5d49-a1bd-4ae8-bdcb-f2ee498e609a:1:1", "6a1a5d49-a1bd-4ae8-bdcb-f2ee498e609a:1:5"]
    let timestamp = Date.now();//timestamp en el momento que se crea la notificación es el ID de notificación
    for(let i=0; i<this.notification.beacons.length; i++){
      let beacon = {
        key: this.notification.beacons[i],
        notification: {
          title: this.notification.title,
          description: this.notification.description,
          timestamp: timestamp
        }
      }
      this.dbFirebase.updateBeacon(beacon);
    }
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

}
