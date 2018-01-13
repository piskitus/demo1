import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { BeaconProvider } from '../../providers/beacon/beacon';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as moment from 'moment'




@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  infoShow: boolean = false;//Card de información principal visible al entrar
  cardInfoShow: boolean = true;//Card de información
  nearBeaconKey: any = null;
  newsID: any = null;
  news: any = {};

  // news: any = { //Vista por defecto
  //   title: 'Bienvenido al evento',
  //   description: 'En esta vista irán apareciendo las noticias asociadas al beacon más cercano en el que te encuentres 😜 ',
  //   color: 'white',
  //   marker: 'null'
  //   //url: 'https://github.com/piskitus/beaconsUPC/blob/master/README.md'
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbFirebase: FirebaseDbProvider,
    public beaconProvider: BeaconProvider, public utilitiesProvider: UtilitiesProvider, public platform: Platform,
    private iab: InAppBrowser) {

    platform.ready().then(() => {
      //Miro si la localización está activada
      //this.settingsProvider.isLocationEnabled();

      //TODO: hacer que se llame solo cuando cambie (suscribe)
      setInterval(() => { //Para definir un intervalo
        this.infoShow = this.beaconProvider.getRegionStatus();
      }, 1000);//Cada 5 segundos

      //TODO: que si salgo de la región me vuelva a mostrar la card principal

      setInterval(() => { //Para definir un intervalo
        //Miro si tengo que notificar una clase
        this.beaconProvider.classesDisplayNotifications();

        //Miro si hay un beacon cercano
        let nearBeaconKey = this.beaconProvider.getNearBeaconKey();

        if (nearBeaconKey != null && (nearBeaconKey != this.nearBeaconKey)) {//Compruebo que no sean iguales para entrar (xq si son el mismo no necesito actualizar la noticia)
          console.log("💚LOS BEACONSKEY SON DIFERENTES")
          this.nearBeaconKey = nearBeaconKey;

          if (this.nearBeaconKey != null) {//Busco la noticia asociada al beacon
            console.log("💚Entro al bucle xq detecto nearBeaconKey", this.nearBeaconKey)
            this.dbFirebase.getNewsId(this.nearBeaconKey).then((snapshot) => { //cojo de la base de datos el valor que hay en "news" para obtener el id de la noticia
              //console.log("news snapshot", snapshot.val().news)
              let newsID = snapshot.val().news
              //console.log("this.newsID", this.newsID)

              if (newsID != null && (newsID != this.newsID)) {//Cojo la noticia de la base de datos y le actualizo los campos (compruebo que la noticia sea diferente xq puede ser que muchos beacons tengan la misma y así me ahorro un acceso a la bbdd)
                this.newsID = newsID;
                console.log("💚Entro a newsID", this.newsID)
                this.dbFirebase.getSpecificNews(this.newsID).then((snapshot) => {
                  this.news.title = snapshot.val().title;
                  this.news.description = snapshot.val().description;
                  this.news.color = snapshot.val().color;
                  this.news.id = snapshot.val().id;
                  this.news.url = snapshot.val().url;
                  // this.news.startNews = snapshot.val().startNews;
                  this.news.startNews = moment(snapshot.val().startNews).utcOffset(0).format('DD/MM/YYYY - kk:mm');
                  this.news.marker = snapshot.val().marker;
                  this.news.img = snapshot.val().img;
                  this.news.saveTime = Date.now(); //timestamp del momento en el que el usuario guardó la noticia para luego poder ordenarla en la vista
                  //console.log("DATAAAAAA:", this.news.title, this.news.description, this.news.img)
                })
              }
            })
          }
        }
      }, 2000);//Cada 2 segundos

    });//Cierro platformReady

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  //Cierro la card informativa
  closeCardInfo() {
    this.cardInfoShow = false;
  }

  saveUserNews() {
    this.dbFirebase.saveUserNews(this.news).then(res => {
      this.utilitiesProvider.showToast('Noticia guardada en la pestaña de avisos', 2000, 'success', false)
    })
  }

  openURL(newsURL) {
    const browser = this.iab.create(newsURL, '_self', 'location=yes,zoom=no');
  }

}
