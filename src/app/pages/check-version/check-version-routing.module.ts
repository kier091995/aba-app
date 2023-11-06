import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckVersionPage } from './check-version.page';

const routes: Routes = [
  {
    path: '',
    component: CheckVersionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckVersionPageRoutingModule {}
