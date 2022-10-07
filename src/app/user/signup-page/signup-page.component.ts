import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  
  SignUpForm!: FormGroup
  
  constructor(
    private fb: FormBuilder
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
  }
}
