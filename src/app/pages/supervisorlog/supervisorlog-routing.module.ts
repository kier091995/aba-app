import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorlogPage } from './supervisorlog.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorlogPageRoutingModule {}
