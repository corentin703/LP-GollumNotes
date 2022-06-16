import {NgModule} from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/router/auth-guard.service';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  // },
  {
    canActivate: [AuthGuardService],
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    canActivate: [AuthGuardService],
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    canActivate: [AuthGuardService],
    path: 'notes',
    loadChildren: () => import('./pages/authenticated-layout/authenticated-layout.module')
      .then( m => m.AuthenticatedLayoutPageModule)
  },
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
