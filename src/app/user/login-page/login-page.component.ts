import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  LogInForm!: FormGroup

  constructor(
    private fb: FormBuilder
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
  }
}
