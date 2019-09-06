import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  /**
   *
   */
  form: FormGroup;
  message: any;
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private account: AccountService
  ) {}
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  getErrorMessage(value: string) {
    if (value === 'password') {
      return 'Contraseña no valida';
    }
    return 'Correo no valido';
  }
  async login() {
    try {
      const result = await this.authService.login({
        email: this.form.value.email,
        password: this.form.value.password
      });
      if (result.user) {
        this.router.navigate(['admin']);
      }
    } catch (error) {
      this.message = this.getAuthErrorMessage(error.code);
    }
  }
  getAuthErrorMessage(code: string) {
    if (code === 'auth/user-not-found') {
      return 'Error de inicio de sesión';
    }
    return 'Error de inicio de sesión';
  }
}
