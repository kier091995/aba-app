import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkScheduleDetailsPage } from './work-schedule-details.page';

const routes: Routes = [
  {
    path: '',
    component: WorkScheduleDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkScheduleDetailsPageRoutingModule {}
