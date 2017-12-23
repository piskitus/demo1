import { Injectable } from '@angular/core';
import { Geofence } from '@ionic-native/geofence';


/*
  Generated class for the GeofencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeofencesProvider {

  geofences:any;

  constructor(private geofence: Geofence) {
    console.log('Hello GeofencesProvider Provider');
  }

  initializeGeofences() {
    // initialize the plugin of geofence
    this.geofence.initialize().then(
      // resolved promise does not return a value
      () => {
        console.log('💛Geofence Plugin Ready')
        this.whatchedGeofences();
        
      },
      (err) => console.log(err)
    )
  }

  // TODO: se puede automatizar la creación de geofencias integrando una funcion que conecte con la bbdd (desestimado para el TFG)
  //AÑADO LA ZONA A INTEGRAR EN GOOGLE SERVICES PARA QUE VAYA VIENDO SI ENTRO EN EL PERÍMETRO ESTABLECIDO
  addGeofences() {//EN android se pueden añadir 100 en iOS 20
    //options describing
    let geofence_casa_Marc = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude: 41.319147, //center of geofence radius
      longitude: 2.020015,
      radius: 50, //radius to edge of geofence in meters
      transitionType: 1, //1: Enter, 2: Leave, 3: Both
      notification: { //notification settings
        id: 1, //any unique ID (La notificación anula la anterior si tiene la misma id)
        title: 'Estás cerca de casa del creador 😯', //notification title
        text: 'Ten cuidado... Te vigila 😈', //notification body
        openAppOnClick: true, //open app when notification is tapped
        // smallIcon: 'assets/img/icon.png',
        //icon: 'assets/img/icon.png'
      }
    }

    let geofence_EETAC = {
      id: '6a1a5d49-a1bd-4ae8-bdcb-f2ee498e609a', //ID inventada
      latitude: 41.275737, //center of geofence radius
      longitude: 1.986996,
      radius: 350, //radius to edge of geofence in meters
      transitionType: 1, //1: Enter, 2: Leave, 3: Both
      notification: { //notification settings
        id: 2, //any unique ID
        title: 'Bienvenida/o al campus UPC 🎓', //notification title
        text: 'Abre la app para enterarte de todo', //notification body
        openAppOnClick: true, //open app when notification is tapped
        // smallIcon: 'assets/img/icon.png',
        //icon: 'assets/img/icon.png'
      }
    }

    let geofence_NAMASTECH = {
      id: '6a1a5d49-a1bd-4ae8-bdcb-f2ee498e609b', //ID inventada
      latitude: 41.279658, //center of geofence radius
      longitude: 1.976536,
      radius: 250, //radius to edge of geofence in meters
      transitionType: 1, //1: Enter, 2: Leave, 3: Both
      notification: { //notification settings
        id: 2, //any unique ID
        title: 'Bienvenida/o a Namastech 😎', //notification title
        text: 'Servicios Informáticos de Barcelona', //notification body
        openAppOnClick: true, //open app when notification is tapped
        // smallIcon: 'assets/img/icon.png',
        //icon: 'assets/img/icon.png'
      }
    }
    
    //función del plugin que añade las geovallas
    this.geofence.addOrUpdate([geofence_casa_Marc, geofence_EETAC, geofence_NAMASTECH]).then(
      () => {
        console.log('💛Geofences  añadidas correctamente')
        this.suscribeToGeofenceNotifications();//me suscribo a las transiciones de notificación para leer si alguien hace click
    },
      (err) => console.log('💛Geofence failed to add')
    );
  }


  //Miro si ya tengo añadidas las geofences para no añadirlas 2 veces
  whatchedGeofences() {
    this.geofence.getWatched().then(
      (data) => {
        this.geofences = JSON.parse(data);//Leo las geofences que tiene activas el dispositivo
        //EN data veo los geofences que estoy viendo
        console.log("💛DATA GEOFENCE: ", this.geofences)
        if (this.geofences.length > 0) {//REVIEW: Si detecto alguna geofence no hago nada xq quiere decir que ya están registradas
          console.log("💛Detectadas Geofences, así q no hago nada")
          //Si ya tengo mi geofence activa no la vuelvo a inicializar
        }
        else {//Si no detecto ninguna geofence, las inicializo
          console.log("💛No se han detectado geogences, las añado")
          this.addGeofences();

        }
      },
      (err) => {

      }
    )
  }

  deleteGeofences(){
      this.geofence.removeAll().then( //Borrar todas las Geofences
        () => { console.log("💛 Geofences borradas")},
        (err) => { console.log("💛Error al borrar geofences")}
      )
  }

  suscribeToGeofenceNotifications(){
    this.geofence.onTransitionReceived().subscribe(res => {
      console.log("💛 Me suscribo a onTransitionReceived")
      res.forEach(function (geo) {
        console.log("💛Geofences",geo);
      });

      this.geofenceNotificationClicked();
      

    },
      (err) => console.log(err),
      () => {
        console.log("💛 Geofence Transition Received suscribed")
        
    }
    );
  }

  //Se suscribe para saber cuando un usuario ha clicado en la notificación de geofence
  //No funciona porque la app se reinicia al dar click
  geofenceNotificationClicked(){
    this.geofence.onNotificationClicked().subscribe(res => {
      console.log("🔵🔵🔵🔵💛App opened from Geo Notification!");
    },
      (err) => console.log("🔴💛error"),
      () => console.log("🔴💛DONE"));
  }

  getGeofences(){
    return this.geofences;
  }

}
