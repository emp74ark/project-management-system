import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../shared/interfaces';
import { TranslateService } from '../shared/services/translate.service';
import { dic } from './welcome-page.props';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  i18n: Dictionary = this.translate.get(dic);

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang);
      }
    );
  }


}
