import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  map: GoogleMap;

  markers: any;
  beacons: any;

  loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps,
    public loadingCtrl: LoadingController, private dbFirebase: FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.presentLoading();//Muestro un "cargando"
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 41.275424, // default location
          lng: 1.987092 // default location
        },
        zoom: 18,
        tilt: 30 //Inclinación en grados de la vista
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY) //Return a Promise<any>
      .then(() => {
        // Now you can use all methods safely.
        this.loader.dismiss();//Quito el cargando
        console.log('Map is ready!');
        //this.getPosition();
        this.getBeaconsMarkers();//Una vez cargado el mapa añado los marcadores de los beacons
      })
      .catch(error => {
        console.log(error);
      });

  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position', //Título del marcador
          icon: 'blue', //Color del icono
          animation: 'BOUNCE', //DROP o BOUNCE (baja o rebotar)
          position: response.latLng,
          snippet: 'Estoy aquí según mi gps 😀' //Descripción del marcador
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Función que coje los marcadores asociados a los beacons para cargarlos en el mapa
  getBeaconsMarkers() {
    this.dbFirebase.getBeacons().subscribe(beacons => {//Cojo los beacons de la base de datos
      this.beacons = beacons;
      for (let i = 0; i < beacons.length; i++) {//Recorro los beacons buscando sus identificadores de marcador
        if (this.beacons[i].marker != 'null') { //Solo entro para los beacons que tengan marcador válido
          this.dbFirebase.getSpecificMarker(this.beacons[i].marker).then((snapshot) => { //cojo de la base de datos el marcador y lo cargo en el mapa
            let title = snapshot.val().title;
            let lat = snapshot.val().lat;
            let lng = snapshot.val().lng;
            let desc = snapshot.val().description;
            this.chargeMarkerIntoMap(title, lat, lng, desc); //Le paso el icono de beacon
          })
        }
        else { }
      }
    })
  }

  //Función para cargar un marcador en el mapa a partir de ciertos parámetros
  chargeMarkerIntoMap(title:string, lat:number, lng:number, desc:string) {
    this.map.addMarker({
      title: title, //Título del marcador
      icon: 'red', //Color del icono
      animation: 'DROP', //DROP o BOUNCE (baja o rebotar)
      position: {lat, lng},
      snippet: desc //Descripción del marcador
    });
  }

  presentLoading() {//Por si tarda el mapa en cargar
    this.loader = this.loadingCtrl.create({
      content: "Cargando mapa...",
      duration: 5000
    });
    this.loader.present();
  }

}
