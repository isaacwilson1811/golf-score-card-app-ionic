import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinueGamePageRoutingModule } from './continue-game-routing.module';

import { ContinueGamePage } from './continue-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinueGamePageRoutingModule
  ],
  declarations: [ContinueGamePage]
})
export class ContinueGamePageModule {}
