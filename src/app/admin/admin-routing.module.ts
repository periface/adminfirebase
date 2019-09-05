import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,

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
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then(m => m.AccountsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
