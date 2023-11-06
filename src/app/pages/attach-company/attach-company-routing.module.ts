import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachCompanyPage } from './attach-company.page';

const routes: Routes = [
  {
    path: '',
    component: AttachCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachCompanyPageRoutingModule {}
