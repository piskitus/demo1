import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer,
    private oneSignal: OneSignal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailPage');


  }


  sendEmail(){
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
        console.log("email composer available")
      }
    });

    let email = {
      to: 'marcalarcon1994@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    // add alias
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');

    // then use alias when sending email
    this.emailComposer.open({
      app: 'gmail',
    });
  }

  sendPushNotification(){
    let parameters:any = {
      app_id: "b417fa2e-b728-4e1c-ab53-aac30da8bf3d",
      include_player_ids: ["c3389bf3-9632-4fd1-847b-bdcd9f2a046f", "c3389bf3-9632-4fd1-847b-bdcd9f2a046f", "c3389bf3-9632-4fd1-847b-bdcd9f2a046f"],
      data: { "foo": "bar" },
      contents: { "en": "English Message" },
      headings: {
        en: "Test Heading"
      }
    }
    this.oneSignal.postNotification(parameters);
  }

  

}
