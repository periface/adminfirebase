import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  /**
   *
   */
  form: FormGroup;
  constructor(private formbuilder: FormBuilder) {}
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
}
