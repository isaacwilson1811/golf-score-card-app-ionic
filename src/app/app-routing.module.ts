import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'new',
    canActivate: [AuthGuard],
    loadChildren: () => import('./new-score-card/new-score-card.module').then( m => m.NewScoreCardPageModule)
  },
  {
    path: 'current-game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./current-game/current-game.module').then( m => m.CurrentGamePageModule)
  },
  {
    path: 'continue-game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./continue-game/continue-game.module').then( m => m.ContinueGamePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
