import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';


@Injectable()
export class OnesignalProvider {

  constructor(private oneSignal: OneSignal) {
    console.log('Hello OnesignalProvider Provider');
  }

  // start(){

  // }

  sendPushNotification(userId:string, title:string, desc:string) {
    let parameters: any = {
      app_id: "b417fa2e-b728-4e1c-ab53-aac30da8bf3d",
      //include_player_ids: ["c3389bf3-9632-4fd1-847b-bdcd9f2a046f", "c3389bf3-9632-4fd1-847b-bdcd9f2a046f", "c3389bf3-9632-4fd1-847b-bdcd9f2a046f"],
      include_player_ids: [userId],
      data: { "foo": "bar" },
      contents: { "en": desc },
      headings: {
        en: title
      }
    }
    this.oneSignal.postNotification(parameters);
  }

}
