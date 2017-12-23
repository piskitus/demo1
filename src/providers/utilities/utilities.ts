import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular'

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {

  constructor(public toastCtrl: ToastController) {
    console.log('Hello UtilitiesProvider Provider');
  }

  // TOAST genérico de notificación
  showToast(message: string, duration: number, color: string, close: boolean) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: duration,
      showCloseButton: close,
      closeButtonText: 'x',
      cssClass: color
    });
    toast.present();
  }

}
