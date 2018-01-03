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
import { LocalNotifications } from '@ionic-native/local-notifications';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleMaps } from '@ionic-native/google-maps';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { VideoPlayer } from '@ionic-native/video-player';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated'; //El deprecated es para la v4, v5 no la uso aún
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { BeaconProvider } from '../providers/beacon/beacon';
import { OnesignalProvider } from '../providers/onesignal/onesignal';


export const firebaseConfig = {
  apiKey: "AIzaSyAWas-Z3A2DVGswCM6NuRAYHOldEzb3HyE",
  authDomain: "piskitus-demoseat.firebaseapp.com",
  databaseURL: "https://piskitus-demoseat.firebaseio.com",
  projectId: "piskitus-demoseat",
  storageBucket: "piskitus-demoseat.appspot.com",
  messagingSenderId: "164948729696"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    GeofencesProvider,
    AuthProvider,
    FirebaseDbProvider,
    BeaconProvider,
    LocalNotifications,
    EmailComposer,
    InAppBrowser,
    OnesignalProvider,
    OnesignalProvider,
    GoogleMaps,
    DocumentViewer,
    FileOpener,
    File,
    FileTransfer,
    YoutubeVideoPlayer,
    VideoPlayer
  ]
})
export class AppModule {}
