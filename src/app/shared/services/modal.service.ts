import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public displayModal$: Subject<Modal> = new Subject<Modal>();

  constructor() {}

  close() {
    this.displayModal$.next({show: false, type: null, message: null});
  }

  info(message: string) {
    this.displayModal$.next({show: true, type: 'info', message: message});
  }

  alert(message: string, callback: (id: string) => void) {
    this.displayModal$.next({show: true, type: 'alert', message: message, callback: callback});
  }

  prompt(message: string, callback: (id: string) => void) {
    this.displayModal$.next({show: true, type: 'prompt', message: message, callback: callback});
  }
}
