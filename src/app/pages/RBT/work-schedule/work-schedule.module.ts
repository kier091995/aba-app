import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkSchedulePageRoutingModule } from './work-schedule-routing.module';

import { WorkSchedulePage } from './work-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkSchedulePageRoutingModule
  ],
  declarations: [WorkSchedulePage]
})
export class WorkSchedulePageModule {}
