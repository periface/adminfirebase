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
      await this.accountService.updateAccount({
        id: this.authService.userSnapshot.uid,
        account: this.form.value
      });
      this.saving = false;
      this.snackBar.open('Cambios guardados...', 'OK', {
        duration: 3000
      });
    } catch (error) {
      this.saving = false;
    }
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
}
