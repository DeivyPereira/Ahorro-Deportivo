import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailGoalPage } from './detail-goal.page';

const routes: Routes = [
  {
    path: '',
    component: DetailGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailGoalPageRoutingModule {}
