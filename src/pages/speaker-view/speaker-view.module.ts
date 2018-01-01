import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerViewPage } from './speaker-view';

@NgModule({
  declarations: [
    SpeakerViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakerViewPage),
  ],
})
export class SpeakerViewPageModule {}
