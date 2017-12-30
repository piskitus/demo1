import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { IBeacon } from '@ionic-native/ibeacon';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { GeofencesProvider } from '../providers/geofences/geofences';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { BeaconProvider } from '../providers/beacon/beacon';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage; //Se escribe sin comillas si viene de un import
  rootPage: any = 'LoadingPage';//si ponemos comillas no necesitamos importarlo, se carga utilizando lazy loaded
  user: any = {};
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public geofencesProvider: GeofencesProvider,
    private auth: AuthProvider,
    public dbFirebase: FirebaseDbProvider,
    public utilitiesProvider: UtilitiesProvider,
    private beaconProvider: BeaconProvider,
    private ibeacon: IBeacon,
) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Presentación evento', component: 'EventPage', icon: 'star' },
      { title: 'Sede', component: 'LocationPage', icon: 'locate' },
      { title: 'Horarios', component: 'TimetablePage', icon: 'time' },
      { title: 'Ponentes', component: 'SpeakersPage', icon: 'people' },
      { title: 'Documentación', component: 'DocumentationPage', icon: 'attach' },
      { title: 'Imágenes', component: 'ImagesPage', icon: 'images' },
      { title: 'Video', component: 'VideoPage', icon: 'logo-youtube' },
      { title: 'Beacons', component: 'BeaconsPage', icon: 'ios-disc-outline' },
      { title: 'Email', component: 'EmailPage', icon: 'mail' },
      { title: 'Chat', component: 'ChatPage', icon: 'chatbubbles' },
      { title: 'List', component: ListPage, icon: 'plane' },
      { title: 'Geofences', component: 'GeofencesPage', icon: 'globe' },
      { title: 'Administración', component: 'AdministracionPage', icon: 'build' }

      
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault(); //no se ve bien
      //this.statusBar.overlaysWebView(false); //se fusiona con el header (en false iOS no se fusiona)
      //this.statusBar.styleDefault()//se ve bien
      this.statusBar.backgroundColorByHexString('#CCC');
      this.splashScreen.hide();
      this.handlerOneSignalNotifications(); //Comentar esta linea para iOS devApp
      this.geofencesProvider.initializeGeofences();
  
      this.auth.Session.subscribe(session => {
        if (session) {

          setTimeout(() => {
            //this.splashScreen.hide();
            this.startBeaconProvider();//Inicializo la búsqueda de beacons y regiones
            this.actualizarUsuarioOneSignal();
            this.rootPage = HomePage;
            

            
          }, 3000);
          this.toastSalutation();
          

        }
        else {
          console.log('➡️ redirect LoginPage');
          setTimeout(() => {
            //this.splashScreen.hide();
            this.rootPage = 'LoginPage';
          }, 3000);
        }
      });



    });
  }


  private handlerOneSignalNotifications() {
    this.oneSignal.startInit('b417fa2e-b728-4e1c-ab53-aac30da8bf3d', '164948729696');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    
    this.sendUserOneSignalTags();//#########DEMO#############
    
    //recibo la notificación
    this.oneSignal.handleNotificationReceived()
      .subscribe(jsonData => {
        console.log('notificationReceived: ' + JSON.stringify(jsonData));
      });

    //si abro la notificación se ejecuta este código
    this.oneSignal.handleNotificationOpened()
      .subscribe(jsonData => {
        // let alert = this.alertCtrl.create({
        //   title: jsonData.notification.payload.title,
        //   subTitle: jsonData.notification.payload.body,
        //   buttons: ['OK']
        // });
        // alert.present();
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      });
    this.oneSignal.endInit();
  }

  //Función para enviar tags de mis usuarios para luego poder hacer segmentación
  sendUserOneSignalTags(){
    this.oneSignal.sendTags({ key1: "value1", key2: "value2" });
    this.oneSignal.getTags().then((tags)=>{
      console.log("tags recibidos: "+JSON.stringify(tags))
    })

  }

  actualizarUsuarioOneSignal() {

    this.oneSignal.getIds().then((ids) => {
      console.log("ids recibidas: " + JSON.stringify(ids))
      let user: any = {
        oneSignalUserId: ids.userId,
        oneSignalPushToken: ids.pushToken
      }
      this.dbFirebase.updateUserLogged(user);
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  //Inicio la búsqueda de beacons
  startBeaconProvider() {
    //Enciendo bluetooth al abrir la aplicación
    this.ibeacon.enableBluetooth();

    //Arranco la búsqueda de beacons pasándole la Región a escanear el valor major y el valor minor
    //BeaconRegion(identifier, uuid, major, minor, notifyEntryStateOnDisplay)
    //this.beaconProvider.start('Estimote','b9407f30-f5f8-466e-aff9-25556b57fe6d');
    this.beaconProvider.start('UPC', '6a1a5d49-a1bd-4ae8-bdcb-f2ee498e609a');
  }
  

  toastSalutation() {
    console.log("toastSalutation")
    this.dbFirebase.getUserData().then((user) => {
      this.user.name = user.val().name;
      this.utilitiesProvider.showToast('👋😀 Bienvenid@  ' + this.user.name, 2000, 'info', false);
    })
  }

}
