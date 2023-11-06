import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BcbaCalendarPage } from './bcba-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: BcbaCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BcbaCalendarPageRoutingModule {}
