import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPushNotificationPage } from './modal-push-notification';

@NgModule({
  declarations: [
    ModalPushNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPushNotificationPage),
  ],
})
export class ModalPushNotificationPageModule {}
