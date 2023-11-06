import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisionRequestPage } from './supervision-request.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisionRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisionRequestPageRoutingModule {}
