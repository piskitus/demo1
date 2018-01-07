import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { OneSignal } from '@ionic-native/onesignal';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-modal-push-notification',
  templateUrl: 'modal-push-notification.html',
})
export class ModalPushNotificationPage {

  notification: any = {
    title: null,
    description: null,
    users: null
  };
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private dbFirebase: FirebaseDbProvider, private oneSignal: OneSignal, public utilitiesProvider: UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPushNotificationPage');

    this.dbFirebase.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  sendNotification() {
    let parameters: any = {
      app_id: "b417fa2e-b728-4e1c-ab53-aac30da8bf3d",
      //include_player_ids: ["c3389bf3-9632-4fd1-847b-bdcd9f2a046f", "c3389bf3-9632-4fd1-847b-bdcd9f2a046f", "c3389bf3-9632-4fd1-847b-bdcd9f2a046f"],
      include_player_ids: this.notification.users,
      data: { "foo": "bar" },
      contents: { "en": this.notification.description },
      headings: {
        en: this.notification.title
      }
    }
    this.oneSignal.postNotification(parameters).then((success) => {
      // handle received here how you wish.
      //alert('Enviado')
      console.log('correcto: '+JSON.stringify(success));
      this.utilitiesProvider.showToast('Notificación enviada', 2000, 'success', false);
    }).catch((error) => {
      //alert('error')
      console.log('Error: '+JSON.stringify(error));
      this.utilitiesProvider.showToast('Error al enviar notificación', 2000, 'error', false);
    })
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

}
