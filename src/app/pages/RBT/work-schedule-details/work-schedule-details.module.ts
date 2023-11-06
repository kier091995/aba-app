import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkScheduleDetailsPageRoutingModule } from './work-schedule-details-routing.module';

import { WorkScheduleDetailsPage } from './work-schedule-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkScheduleDetailsPageRoutingModule
  ],
  declarations: [WorkScheduleDetailsPage]
})
export class WorkScheduleDetailsPageModule {}
