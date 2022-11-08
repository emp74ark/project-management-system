import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from '../../interfaces';
import { ModalService } from '../../services/modal.service';
import { TranslateService } from '../../services/translate.service';
import { dic } from './modal.props';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() id = '';

  i18n: Dictionary = this.translate.get(dic)

  constructor(
    private translate: TranslateService,
    public modal: ModalService
  ) {}
  
  ngOnInit(): void {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang)
      }
    )
  }

  close() {
    this.modal.close()
  }

}
