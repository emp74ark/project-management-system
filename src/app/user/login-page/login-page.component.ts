import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  authMode!: boolean

  LogInForm!: FormGroup
  SignUpForm!: FormGroup;
  
  displayGreeting: boolean;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {
    this._createLoginForm()
    this._createSignUpForm()
    this.authMode = true;
    this.displayGreeting = false;
   }
  
  ngOnInit() {}

  private _createLoginForm() {
    this.LogInForm = this.fb.group({
      loginEmail: [null, [Validators.required, Validators.email]],
      loginPassword: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  private _createSignUpForm() {
    this.SignUpForm = this.fb.group({
      signupName: [null, [Validators.required, Validators.minLength(2)]],
      signupEmail: [null, [Validators.required, Validators.email]],
      signupPassword: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  authModeToggle() {
    this.authMode = !this.authMode
  }

  hideGreeting(){
    this.displayGreeting = false;
    this.authMode = true;
    this.router.navigate(['/user', 'login'])
  }

  loginSubmit() {
    if (this.LogInForm.invalid) {
      return
    }

    this.displayGreeting = true

    const user: User = {
      login: this.LogInForm.value.loginEmail,
      password: this.LogInForm.value.loginPassword
    }
    this.auth.login(user).subscribe(() => {
      this.displayGreeting = false
      this.router.navigate(['/user', 'dashboard'])
    })
  }

  signUpSubmit() {
    if (this.SignUpForm.invalid) {
      return
    }

    const user: User = {
      name: this.SignUpForm.value.signupName,
      login: this.SignUpForm.value.signupEmail,
      password: this.SignUpForm.value.signupPassword
    }

    this.auth.signup(user).subscribe(() => {
      this.displayGreeting = true;
    })
  }
}