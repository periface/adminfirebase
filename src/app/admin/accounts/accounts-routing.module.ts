import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccountsComponent } from './accounts.component';
const routes: Routes = [
  {
    path: '',
    component: AccountsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {}
