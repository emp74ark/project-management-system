import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Dictionary } from '../../interfaces';
import { TranslateService } from '../../services/translate.service';

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
  ) { }
  
  locales = this.translate.locales
  
  selectedLocale = this.translate.currentLocale // start value

  dic = ['common_home', 'common_about', 'common_login', 'common_logout']
  i18n: Dictionary = this.translate.get(this.dic)

  ngOnInit(): void {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
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
