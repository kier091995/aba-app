import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskTrackerPage } from './task-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: TaskTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskTrackerPageRoutingModule {}
