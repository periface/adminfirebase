import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccountInfoComponent } from './account-info.component';

const routes: Routes = [{ path: '', component: AccountInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountInfoRoutingModule {}
