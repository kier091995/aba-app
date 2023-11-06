import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BcbaCalendarModalPage } from './bcba-calendar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BcbaCalendarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BcbaCalendarModalPageRoutingModule {}
