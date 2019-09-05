import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  /**
   *
   */
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.accountService.getAccount(this.authService.userSnapshot.uid).subscribe(
      accountInfo => {
        console.log(accountInfo);
        if (accountInfo) {
          this.form = this.formBuilder.group({
            name: [accountInfo.name, Validators.required],
            surname: [accountInfo.surname, Validators.required],
            phoneNumber: [accountInfo.phoneNumber]
          });
        } else {
          this.form = this.formBuilder.group({
            name: ['John', Validators.required],
            surname: ['Doe', Validators.required],
            phoneNumber: ['555555']
          });
        }
      },
      error => {
        this.form = this.formBuilder.group({
          name: ['John', Validators.required],
          surname: ['Doe', Validators.required],
          phoneNumber: ['555555']
        });
      }
    );
  }
  save() {}
}
