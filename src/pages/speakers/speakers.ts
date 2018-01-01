import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UtilitiesProvider } from '../../providers/utilities/utilities';


@IonicPage()
@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class SpeakersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private iab: InAppBrowser, public utilitiesProvider: UtilitiesProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakersPage');
  }

  openView(){
    let modal = this.modalCtrl.create('SpeakerViewPage');
    modal.present();
  }

  moreInfo() {
    //this.navCtrl.push('EventPage');
    const browser = this.iab.create('https://www.linkedin.com/in/marc-cabezas/', '_self', 'location=yes,zoom=no');
  }

  viewInfo(){
    this.utilitiesProvider.showToast('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, ', null, 'info', true);
  }

}
