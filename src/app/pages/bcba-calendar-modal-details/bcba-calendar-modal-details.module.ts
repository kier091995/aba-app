import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BcbaCalendarModalDetailsPageRoutingModule } from './bcba-calendar-modal-details-routing.module';

import { BcbaCalendarModalDetailsPage } from './bcba-calendar-modal-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BcbaCalendarModalDetailsPageRoutingModule
  ],
  declarations: [BcbaCalendarModalDetailsPage]
})
export class BcbaCalendarModalDetailsPageModule {}
