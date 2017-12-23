import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeofencesProvider } from '../../providers/geofences/geofences';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public geofencesProvider: GeofencesProvider) {

  }

  deleteGeofences(){
    this.geofencesProvider.deleteGeofences();
  }

}
