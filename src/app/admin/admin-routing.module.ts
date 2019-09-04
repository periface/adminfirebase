import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'myaccount',
        loadChildren: () =>
          import('./account-info/account-info.module').then(
            m => m.AccountInfoModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
