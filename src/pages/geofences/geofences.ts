import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeofencesProvider } from '../../providers/geofences/geofences';


@IonicPage()
@Component({
  selector: 'page-geofences',
  templateUrl: 'geofences.html',
})
export class GeofencesPage {

  geofences:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geofencesProvider: GeofencesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeofencesPage');
  }

  private getGeofences(){
    this.geofences = this.geofencesProvider.getGeofences();
  }

}
