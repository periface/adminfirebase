import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoRoutingModule } from './account-info-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AccountInfoComponent],
  imports: [MaterialModule, AccountInfoRoutingModule, CommonModule]
})
export class AccountInfoModule {}
