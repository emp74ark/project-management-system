import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})
export class CommonLayoutComponent implements OnInit {

  SearchForm!: FormGroup;
  
  selectedLocale!: string

  localeList = [
    {label: 'English', code: 'en'},
    {label: 'Русский', code: 'ru'}
  ]

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) { }
    
  ngOnInit(): void {
    this._createForm()
  }

  private _createForm() {
    this.SearchForm = this.fb.group({
      search: [null]
    })
  }

  isAuthenticated(){
    return this.auth.authenticated
  }

  getLogin() {
    return localStorage.getItem('login')
  }

  changeLocale() {
    console.log(this.selectedLocale)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/user', 'login'])
  }
}
