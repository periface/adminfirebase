import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountsComponent } from './accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    AccountsRoutingModule,
    CommonModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountsModule {}
