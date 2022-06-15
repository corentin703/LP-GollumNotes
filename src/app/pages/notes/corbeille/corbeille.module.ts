import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorbeillePageRoutingModule } from './corbeille-routing.module';

import { CorbeillePage } from './corbeille.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorbeillePageRoutingModule
  ],
  declarations: [CorbeillePage]
})
export class CorbeillePageModule {}
