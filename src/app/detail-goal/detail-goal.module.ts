import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailGoalPageRoutingModule } from './detail-goal-routing.module';

import { DetailGoalPage } from './detail-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailGoalPageRoutingModule
  ],
  declarations: [DetailGoalPage]
})
export class DetailGoalPageModule {}
