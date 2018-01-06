import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLocalNotificationPage } from './modal-local-notification';

@NgModule({
  declarations: [
    ModalLocalNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalLocalNotificationPage),
  ],
})
export class ModalLocalNotificationPageModule {}
