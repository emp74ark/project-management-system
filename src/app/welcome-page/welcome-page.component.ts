import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../shared/interfaces';
import { TranslateService } from '../shared/services/translate.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  dic = ['welcome_title', 'welcome_text1', 'welcome_text2']
  i18n: Dictionary = this.translate.get(this.dic)

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
  }


}
