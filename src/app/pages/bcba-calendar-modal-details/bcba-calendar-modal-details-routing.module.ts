import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BcbaCalendarModalDetailsPage } from './bcba-calendar-modal-details.page';

const routes: Routes = [
  {
    path: '',
    component: BcbaCalendarModalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BcbaCalendarModalDetailsPageRoutingModule {}
