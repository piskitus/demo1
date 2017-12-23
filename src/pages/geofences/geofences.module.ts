import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeofencesPage } from './geofences';

@NgModule({
  declarations: [
    GeofencesPage,
  ],
  imports: [
    IonicPageModule.forChild(GeofencesPage),
  ],
})
export class GeofencesPageModule {}
