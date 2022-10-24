import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Dictionary, User } from 'src/app/shared/interfaces';
import { TranslateService } from 'src/app/shared/services/translate.service';
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
  
  displayModal: boolean;

  dic = [
    'email',
    'name',
    'password',
    'login',
    'signup',
    'required',
    'short',
    'correct_email',
    'correct_password',
    'close',
    'modal_registration',
    'modal_loading',
  ]

  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this._createLoginForm()
    this._createSignUpForm()
    this.authMode = true;
    this.displayModal = false;
   }
  
  ngOnInit() {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
  }

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

  closeModal(){
    this.displayModal = false;
    this.authMode = true;
    this.router.navigate(['/user', 'login'])
  }

  loginSubmit() {
    if (this.LogInForm.invalid) {
      return
    }

    this.displayModal = true

    const user: User = {
      login: this.LogInForm.value.loginEmail,
      password: this.LogInForm.value.loginPassword
    }
    this.auth.login(user)
      .subscribe(
        () => {
          this.router.navigate(['/user', 'dashboard'])
        },
        () => {
          this.displayModal = false
        }
      )
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
      this.displayModal = true;
    })
  }
}