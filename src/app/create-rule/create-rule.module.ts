import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRulePageRoutingModule } from './create-rule-routing.module';

import { CreateRulePage } from './create-rule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRulePageRoutingModule
  ],
  declarations: [CreateRulePage]
})
export class CreateRulePageModule {}
