import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignatureUploadPageRoutingModule } from './signature-upload-routing.module';

import { SignatureUploadPage } from './signature-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignatureUploadPageRoutingModule
  ],
  declarations: [SignatureUploadPage]
})
export class SignatureUploadPageModule {}
