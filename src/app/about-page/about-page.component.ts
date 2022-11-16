import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../shared/interfaces';
import { TranslateService } from '../shared/services/translate.service';
import { dic } from './about-page.props';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  i18n: Dictionary = this.translate.get(dic);

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang);
      }
    );
  }

}
