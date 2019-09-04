import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
