import { Component, ViewChild, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { UserAccount } from 'src/app/shared/services/account/models/account.models';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'phoneNumber'];
  dataSource: MatTableDataSource<UserAccount> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private accountService: AccountService) {
    this.accountService.items$.subscribe(data => {
      console.log('data', data);
      this.dataSource = new MatTableDataSource(data);
    });
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
}
