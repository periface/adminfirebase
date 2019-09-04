import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoRoutingModule } from './account-info-routing.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AccountInfoComponent],
  imports: [
    MaterialModule,
    AccountInfoRoutingModule,
    CommonModule,
    FlexLayoutModule
  ]
})
export class AccountInfoModule {}
