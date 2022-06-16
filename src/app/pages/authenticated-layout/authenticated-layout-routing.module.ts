import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticatedLayoutPage} from './authenticated-layout.page';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutPage,
    children: [
      {
        path: 'rappels',
        loadChildren: () => import('@app/pages/notes/rappels/rappels.module').then(m => m.RappelsPageModule)
      },
      {
        path: 'archive',
        loadChildren: () => import('@app/pages/notes/archive/archive.module').then(m => m.ArchivePageModule)
      },
      {
        path: 'corbeille',
        loadChildren: () => import('@app/pages/notes/corbeille/corbeille.module').then(m => m.CorbeillePageModule),
      },
      {
        path: '',
        loadChildren: () => import('@app/pages/notes/notes.module').then(m => m.NotesPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedLayoutPageRoutingModule {}
