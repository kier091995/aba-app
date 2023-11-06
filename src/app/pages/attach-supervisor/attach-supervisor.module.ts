import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachSupervisorPageRoutingModule } from './attach-supervisor-routing.module';

import { AttachSupervisorPage } from './attach-supervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachSupervisorPageRoutingModule
  ],
  declarations: [AttachSupervisorPage]
})
export class AttachSupervisorPageModule {}
