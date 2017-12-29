import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthProvider, public utilitiesProvider: UtilitiesProvider) {

  }

  cerrarSesion() {
    this.utilitiesProvider.showToast('Hasta pronto!', 2000, 'info', false);
    this.auth.logout();

    //Dejo de buscar beacons
    //this.beaconProvider.stopBeaconMonitoring();
    //this.beaconProvider.stopBeaconRanging();
  }

}
