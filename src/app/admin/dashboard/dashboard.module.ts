import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [MaterialModule, CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
