import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {

  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;

  mode:number = 1; //modo 1 = lista, modo 2 = slides
  autoplayTime:number = null; //para configurar el autoplay


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }

  startPresentation(){
    this.mode = 2;
    this.autoplayTime = 2000;
    //this.slides.startAutoplay();  
  }

  listImages(){
    this.slides.stopAutoplay(); 
    this.mode = 1;
    this.autoplayTime = null;

  }

  scrollUp(){
    this.content.scrollToTop(1000)
  }

}
