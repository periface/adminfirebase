import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/modules/material.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
  exports: []
})
export class AuthModule {}
