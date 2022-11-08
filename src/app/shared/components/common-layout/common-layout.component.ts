import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Dictionary } from '../../interfaces';
import { TranslateService } from '../../services/translate.service';
import { dic } from './common-layout.props';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})

export class CommonLayoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}
  
  locales = this.translate.locales
  
  selectedLocale = this.translate.currentLocale

  i18n: Dictionary = this.translate.get(dic)

  ngOnInit(): void {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang)
      }
    )
  }

  isAuthenticated(){
    return this.auth.authenticated
  }

  getLogin() {
    return localStorage.getItem('login')
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/user', 'login'])
  }

  changeLocale() {
    this.translate.currentLocale = this.selectedLocale
    this.translate.locale.next(this.selectedLocale)
  }
}
