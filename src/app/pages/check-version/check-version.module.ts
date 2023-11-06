import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckVersionPageRoutingModule } from './check-version-routing.module';

import { CheckVersionPage } from './check-version.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckVersionPageRoutingModule
  ],
  declarations: [CheckVersionPage]
})
export class CheckVersionPageModule {}
