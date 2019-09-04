import { NgModule } from '@angular/core';
import {
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class MaterialModule {}
