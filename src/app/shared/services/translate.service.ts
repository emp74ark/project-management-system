import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as english from '../../../assets/i18n/en.json';
import * as russian from '../../../assets/i18n/ru.json';
import { Dictionary } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class TranslateService {
  
  private en: Dictionary = english
  private ru: Dictionary = russian

  public currentLocale = 'en'

  public locale = new Subject<string>()

  public locales = [
    {label: 'English', code: 'en'},
    {label: 'Русский', code: 'ru'}
  ]

  constructor(
    private http: HttpClient
  ) { }

  get(dict: string[], lang=this.currentLocale) {
    const result: Dictionary = {}
    for (const phrase of dict) {
      result[phrase] = lang === 'ru' ? this.ru[phrase] : this.en[phrase]
    }
    return result
  }
}
