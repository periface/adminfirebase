import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserAccount } from 'src/app/shared/services/account/models/account.models';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MatSnackBar, MatCheckboxChange } from '@angular/material';

@Component({
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  selector: 'app-edit-account'
})
export class EditAccountComponent implements OnInit {
  @Output() finished = new EventEmitter();
  @Input() account: UserAccount;
  permissions = environment.permissions;
  saving: boolean;
  form: FormGroup;
  selectedPermissions: any[] = [];
  /**
   *
   */
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  cancel() {
    this.finished.emit(null);
  }
  ngOnInit(): void {
    this.buildDefaultForm(this.account);
    this.selectedPermissions = this.account.permissions || [];
  }
  async save() {
    try {
      this.saving = true;
      const accountInfo = {
        ...this.form.value,
        permissions: this.selectedPermissions
      };
      await this.accountService.updateAccount({
        id: this.authService.userSnapshot.uid,
        account: accountInfo
      });
      this.saving = false;
      this.snackBar.open('Cambios guardados...', 'OK', {
        duration: 3000
      });
    } catch (error) {
      this.saving = false;
    }
  }
  setPermission(event: MatCheckboxChange, permission: any) {
    if (event.checked) {
      const found = this.selectedPermissions.find(
        a => a === permission.permissionName
      );
      if (found) {
        return;
      }
      this.selectedPermissions.push(permission.permissionName);
    } else {
      const found = this.selectedPermissions.findIndex(
        a => a === permission.permissionName
      );
      console.log(found);
      if (found > -1) {
        this.selectedPermissions.splice(found, 1);
      }
    }
    console.log(this.selectedPermissions);
  }
  private buildDefaultForm(data?: UserAccount) {
    if (data) {
      this.form = this.formBuilder.group({
        name: [data.name, Validators.required],
        surname: [data.surname, Validators.required],
        phoneNumber: [data.phoneNumber]
      });
    } else {
      this.form = this.formBuilder.group({
        name: ['John', Validators.required],
        surname: ['Doe', Validators.required],
        phoneNumber: ['555555']
      });
    }
  }
  checkPermission(permission) {
    if (!this.account.permissions) {
      return false;
    }
    const found = this.account.permissions.find(
      a => a === permission.permissionName
    );
    if (found) {
      return true;
    }
    return false;
  }
}
