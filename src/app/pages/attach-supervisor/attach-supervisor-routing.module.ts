import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachSupervisorPage } from './attach-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: AttachSupervisorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachSupervisorPageRoutingModule {}
