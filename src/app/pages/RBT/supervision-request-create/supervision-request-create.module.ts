import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisionRequestCreatePageRoutingModule } from './supervision-request-create-routing.module';

import { SupervisionRequestCreatePage } from './supervision-request-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisionRequestCreatePageRoutingModule
  ],
  declarations: [SupervisionRequestCreatePage]
})
export class SupervisionRequestCreatePageModule {}
