import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskTrackerPageRoutingModule } from './task-tracker-routing.module';

import { TaskTrackerPage } from './task-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskTrackerPageRoutingModule
  ],
  declarations: [TaskTrackerPage]
})
export class TaskTrackerPageModule {}
