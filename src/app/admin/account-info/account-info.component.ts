import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { UserAccount } from 'src/app/shared/services/account/models/account.models';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  /**
   *
   */
  form: FormGroup;
  saving: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.accountService.getAccount(this.authService.userSnapshot.uid).subscribe(
      accountInfo => {
        if (accountInfo) {
          this.buildDefaultForm(accountInfo);
        } else {
          this.buildDefaultForm();
        }
      },
      () => {
        this.buildDefaultForm();
      }
    );
  }
  async save() {
    try {
      this.saving = true;
      const accounInfo = {
        ...this.form.value,
        email: this.authService.userSnapshot.email
      };
      await this.accountService.updateAccount({
        id: this.authService.userSnapshot.uid,
        account: accounInfo
      });
      this.saving = false;
      this.snackBar.open('Cambios guardados...', 'OK', {
        duration: 3000
      });
      await this.authService.userSnapshot.updateProfile({
        displayName: `${this.form.value.name} ${this.form.value.surname}`,
        photoURL:
          'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      this.saving = false;
    }
  }
  private buildDefaultForm(data?: UserAccount) {
    if (data) {
      this.form = this.formBuilder.group({
        name: [data.name, Validators.required],
        surname: [data.surname, Validators.required],
        phoneNumber: [data.phoneNumber],
        permissions: [data.permissions]
      });
    } else {
      this.form = this.formBuilder.group({
        name: ['John', Validators.required],
        surname: ['Doe', Validators.required],
        phoneNumber: ['555555']
      });
    }
  }
}
