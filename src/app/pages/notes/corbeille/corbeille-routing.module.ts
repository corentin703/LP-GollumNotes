import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorbeillePage } from './corbeille.page';

const routes: Routes = [
  {
    path: '',
    component: CorbeillePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorbeillePageRoutingModule {}
