import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisionRequestDetailsPageRoutingModule } from './supervision-request-details-routing.module';

import { SupervisionRequestDetailsPage } from './supervision-request-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisionRequestDetailsPageRoutingModule
  ],
  declarations: [SupervisionRequestDetailsPage]
})
export class SupervisionRequestDetailsPageModule {}
