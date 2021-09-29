import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinueGamePage } from './continue-game.page';

const routes: Routes = [
  {
    path: '',
    component: ContinueGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinueGamePageRoutingModule {}
