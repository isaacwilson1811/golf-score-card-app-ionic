import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewScoreCardPageRoutingModule } from './new-score-card-routing.module';

import { NewScoreCardPage } from './new-score-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewScoreCardPageRoutingModule
  ],
  declarations: [NewScoreCardPage]
})
export class NewScoreCardPageModule {}
