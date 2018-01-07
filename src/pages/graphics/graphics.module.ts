import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphicsPage } from './graphics';

@NgModule({
  declarations: [
    GraphicsPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphicsPage),
  ],
})
export class GraphicsPageModule {}
