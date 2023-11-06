import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignatureUploadPage } from './signature-upload.page';

const routes: Routes = [
  {
    path: '',
    component: SignatureUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignatureUploadPageRoutingModule {}
