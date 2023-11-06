import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorlogPageRoutingModule } from './supervisorlog-routing.module';

import { SupervisorlogPage } from './supervisorlog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorlogPageRoutingModule
  ],
  declarations: [SupervisorlogPage]
})
export class SupervisorlogPageModule {}
