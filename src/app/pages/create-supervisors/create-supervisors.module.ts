import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSupervisorsPageRoutingModule } from './create-supervisors-routing.module';

import { CreateSupervisorsPage } from './create-supervisors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSupervisorsPageRoutingModule
  ],
  declarations: [CreateSupervisorsPage]
})
export class CreateSupervisorsPageModule {}
