import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSupervisorsPage } from './create-supervisors.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSupervisorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSupervisorsPageRoutingModule {}
