import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentGamePageRoutingModule } from './current-game-routing.module';

import { CurrentGamePage } from './current-game.page';
import { RandomMiddleNamePipe } from '../custom-pipes/random-middle-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentGamePageRoutingModule
  ],
  declarations: [CurrentGamePage, RandomMiddleNamePipe]
})
export class CurrentGamePageModule {}
