import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BcbaCalendarPageRoutingModule } from './bcba-calendar-routing.module';

import { BcbaCalendarPage } from './bcba-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BcbaCalendarPageRoutingModule
  ],
  declarations: [BcbaCalendarPage]
})
export class BcbaCalendarPageModule {}
