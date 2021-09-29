import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinueGamePageRoutingModule } from './continue-game-routing.module';

import { ContinueGamePage } from './continue-game.page';

import { RandomMiddleNamePipe } from '../custom-pipes/random-middle-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinueGamePageRoutingModule
  ],
  declarations: [ContinueGamePage, RandomMiddleNamePipe]
})
export class ContinueGamePageModule {}
