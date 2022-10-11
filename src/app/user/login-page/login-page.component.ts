import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  LogInForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this._createForm()
   }
  
  ngOnInit() {}

  private _createForm() {
    this.LogInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {
    if (this.LogInForm.invalid) {
      return
    }

    const user: User = {
      login: this.LogInForm.value.email,
      password: this.LogInForm.value.password
    }
    this.auth.login(user).subscribe(() => {
      this.router.navigate(['/user', 'dashboard'])
    })
  }
}