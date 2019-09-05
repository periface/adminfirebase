import { Component } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { UserAccount } from 'src/app/shared/services/account/models/account.models';
@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  displayedColumns: string[] = ['name', 'surname', 'phoneNumber'];
  dataSource: UserAccount[] = [];
  /**
   *
   */
  constructor(private accountService: AccountService) {
    this.accountService.items$.subscribe(data => {
      console.log('data', data);
      this.dataSource = data;
    });
  }
  search(value) {
    this.accountService.nameFilter$.next(value);
  }
}
