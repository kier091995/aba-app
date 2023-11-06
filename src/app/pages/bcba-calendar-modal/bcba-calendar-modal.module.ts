import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BcbaCalendarModalPageRoutingModule } from './bcba-calendar-modal-routing.module';

import { BcbaCalendarModalPage } from './bcba-calendar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BcbaCalendarModalPageRoutingModule
  ],
  declarations: [BcbaCalendarModalPage]
})
export class BcbaCalendarModalPageModule {}
