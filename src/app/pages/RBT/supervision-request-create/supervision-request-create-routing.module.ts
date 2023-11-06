import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisionRequestCreatePage } from './supervision-request-create.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisionRequestCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisionRequestCreatePageRoutingModule {}
