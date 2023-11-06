import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkScheduleCreatePageRoutingModule } from './work-schedule-create-routing.module';

import { WorkScheduleCreatePage } from './work-schedule-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkScheduleCreatePageRoutingModule
  ],
  declarations: [WorkScheduleCreatePage]
})
export class WorkScheduleCreatePageModule {}
