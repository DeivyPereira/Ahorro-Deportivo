import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create-goal',
    loadChildren: () => import('./create-goal/create-goal.module').then( m => m.CreateGoalPageModule)
  },
  {
    path: 'detail-goal',
    loadChildren: () => import('./detail-goal/detail-goal.module').then( m => m.DetailGoalPageModule)
  },
  {
    path: 'create-rule',
    loadChildren: () => import('./create-rule/create-rule.module').then( m => m.CreateRulePageModule)
  },
  {
    path: 'simulate',
    loadChildren: () => import('./simulate/simulate.module').then( m => m.SimulatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
