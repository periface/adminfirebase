import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  userInfo: firebase.User;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userInfo = this.authService.userSnapshot;
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
  logout() {
    this.authService.logout();
    this.onSidenavClose();
    this.router.navigate(['/']);
  }
}
