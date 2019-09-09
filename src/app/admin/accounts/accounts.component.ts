import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { UserAccount } from 'src/app/shared/services/account/models/account.models';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'phoneNumber',
    'options'
  ];
  dataSource: MatTableDataSource<UserAccount> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  editableItem: UserAccount;
  subscription: Subscription;
  showEdit: boolean;
  constructor(private accountService: AccountService) {
    this.subscription = this.accountService.items$.subscribe(
      data => {
        console.log('data', data);
        this.dataSource = new MatTableDataSource(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  search(value: string) {
    this.accountService.nameFilter$.next(value);
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  prev() {
    this.accountService.prevPage();
  }
  next() {
    this.accountService.nextPage();
  }
  ngOnDestroy(): void {
    console.log('Destroyed');
    this.subscription.unsubscribe();
  }
  edit(item: UserAccount) {
    this.editableItem = item;
    this.showEdit = true;
  }
  onFinished($event) {
    this.showEdit = false;
    this.editableItem = null;
  }
  createAccount() {
    this.showEdit = true;
  }
}
