import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisionRequestPageRoutingModule } from './supervision-request-routing.module';

import { SupervisionRequestPage } from './supervision-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisionRequestPageRoutingModule
  ],
  declarations: [SupervisionRequestPage]
})
export class SupervisionRequestPageModule {}
