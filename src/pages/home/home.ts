import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { InAppBrowser } from '@ionic-native/in-app-browser';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthProvider, public utilitiesProvider: UtilitiesProvider,
    private iab: InAppBrowser) {

  }

  cerrarSesion() {
    this.utilitiesProvider.showToast('Hasta pronto!', 2000, 'info', false);
    this.auth.logout();

    //Dejo de buscar beacons
    //this.beaconProvider.stopBeaconMonitoring();
    //this.beaconProvider.stopBeaconRanging();
  }

  moreInfo(){
    //this.navCtrl.push('EventPage');
    const browser = this.iab.create('https://accuracybeacons.com/es/inicio/', '_self', 'location=yes,zoom=no');
  }

}
