import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachCompanyPageRoutingModule } from './attach-company-routing.module';

import { AttachCompanyPage } from './attach-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachCompanyPageRoutingModule
  ],
  declarations: [AttachCompanyPage]
})
export class AttachCompanyPageModule {}
