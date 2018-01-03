import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { VideoPlayer } from '@ionic-native/video-player';


@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private youtube: YoutubeVideoPlayer,
    private videoPlayer: VideoPlayer) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  youtubeVideo(){
    this.youtube.openVideo('d5POkffRHiI'); //https://www.youtube.com/watch?v=d5POkffRHiI <-- videoID
  }

  mp4Video(){
    let options: any = {
      volume: 0.5,
      scalingMode: 2
    }

    this.videoPlayer.play('file:///android_asset/www/assets/vid/pantalla_congelada.mp4', options).then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
  

}
