import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dictionary, User } from 'src/app/shared/interfaces';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { AuthService } from '../../shared/services/auth.service';
import { dic } from './login-page.props';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  authMode!: boolean

  LogInForm!: FormGroup
  SignUpForm!: FormGroup;

  i18n: Dictionary = this.translate.get(dic)

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService,
    private modal: ModalService
  ) {
    this._createLoginForm()
    this._createSignUpForm()
    this.authMode = true;
  }

  ngOnInit() {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang)
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

  login() {
    if (this.LogInForm.invalid) {
      return
    }

    this.modal.info(this.i18n['modal_loading'])

    const user: User = {
      login: this.LogInForm.value.loginEmail,
      password: this.LogInForm.value.loginPassword
    }
    this.auth.login(user)
      .subscribe(
        () => {
          this.modal.close();
          this.router.navigate(['/user', 'dashboard'])
        },
        () => {
          this.modal.close();
          this.router.navigate(['/user', 'login'])
        }
      )
  }

  successRegistration = () => {
    this.authMode = true
    this.router.navigate(['/user', 'login'])
  }

  signup() {
    if (this.SignUpForm.invalid) {
      return
    }

    const user: User = {
      name: this.SignUpForm.value.signupName,
      login: this.SignUpForm.value.signupEmail,
      password: this.SignUpForm.value.signupPassword
    }

    this.auth.signup(user).subscribe(() => {
      this.modal.alert(this.i18n['modal_registration'], this.successRegistration)
    })
  }
}