import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IBeacon } from '@ionic-native/ibeacon';
import { OneSignal } from '@ionic-native/onesignal';
import { Geofence } from '@ionic-native/geofence';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { GeofencesProvider } from '../providers/geofences/geofences';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IBeacon,
    OneSignal,
    Geofence,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilitiesProvider,
    GeofencesProvider
  ]
})
export class AppModule {}
