import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
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
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    @Inject(LOCALE_ID) private localeId: string
  ) { }
  
  public selectedLocale: string=this.localeId
  public locales: any = [
    {name: "English", code: "en-US"},
    {name: "Russian", code: "ru-RU"},
  ]
    
  ngOnInit(): void {
    console.log(this.selectedLocale)
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

  changePath(code: string) {
    location.replace(`/${code}/`)
    console.log(code)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/user', 'login'])
  }
}
