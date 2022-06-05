import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'rappels',
    loadChildren: () => import('./rappels/rappels.module').then( m => m.RappelsPageModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('./archive/archive.module').then( m => m.ArchivePageModule)
  },
  {
    path: 'corbeille',
    loadChildren: () => import('./corbeille/corbeille.module').then( m => m.CorbeillePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
