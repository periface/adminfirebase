import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../shared/modules/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AdminComponent, HeaderComponent, SidenavListComponent],
  imports: [MaterialModule, AdminRoutingModule, CommonModule]
})
export class AdminModule {}
