import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-speaker-view',
  templateUrl: 'speaker-view.html',
})
export class SpeakerViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakerViewPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
