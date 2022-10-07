import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  
  SignUpForm!: FormGroup
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) {
      this._createForm()
    }
  
  ngOnInit(): void {}
  
  private _createForm() {
    this.SignUpForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }
  
  submit() {
    if (this.SignUpForm.invalid) {
      return
    }

    const user: User = {
      email: this.SignUpForm.value.email,
      password: this.SignUpForm.value.password
    }

    this.auth.signup(user).subscribe(() => {
      this.router.navigate(['dashboard'])
    })
  }
}
