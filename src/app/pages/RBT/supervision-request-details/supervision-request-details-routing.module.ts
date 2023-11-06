import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisionRequestDetailsPage } from './supervision-request-details.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisionRequestDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisionRequestDetailsPageRoutingModule {}
