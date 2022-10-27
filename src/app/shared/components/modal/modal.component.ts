import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from '../../interfaces';
import { ModalService } from '../../services/modal.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() id: string

  dic = [
    'close',
    'cancel',
    'delete'
  ]

  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    private translate: TranslateService,
    public modal: ModalService
  ) {
    this.id = ''
  }

  ngOnInit(): void {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
  }

  close() {
    this.modal.close()
  }

}
