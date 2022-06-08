import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticatedLayoutPageRoutingModule } from './authenticated-layout-routing.module';

import { AuthenticatedLayoutPage } from './authenticated-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticatedLayoutPageRoutingModule
  ],
  declarations: [AuthenticatedLayoutPage]
})
export class AuthenticatedLayoutPageModule {}
