import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkSchedulePage } from './work-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: WorkSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkSchedulePageRoutingModule {}
