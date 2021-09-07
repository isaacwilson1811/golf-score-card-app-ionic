import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentGamePageRoutingModule } from './current-game-routing.module';

import { CurrentGamePage } from './current-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentGamePageRoutingModule
  ],
  declarations: [CurrentGamePage]
})
export class CurrentGamePageModule {}
