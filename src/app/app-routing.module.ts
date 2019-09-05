import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  redirectLoggedInTo,
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['admin']);
const redirectToLogin = () => redirectUnauthorizedTo(['auth']);
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
