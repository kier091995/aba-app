import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkScheduleCreatePage } from './work-schedule-create.page';

const routes: Routes = [
  {
    path: '',
    component: WorkScheduleCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkScheduleCreatePageRoutingModule {}
