import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../shared/interfaces';
import { TranslateService } from '../shared/services/translate.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  dic = ['about_title', 'about_text1', 'about_text2']
  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    private translate: TranslateService
  ) {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
   }

  ngOnInit(): void {
  }

}
