import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Board, Dictionary } from 'src/app/shared/interfaces';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { BoardService } from '../shared/services/boards.service';
import { UserService } from '../shared/services/users.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  DashboardForm!: FormGroup;
  boardList$!: Observable<Board[]>
  boardEditable: { [index: string]: boolean } = {};

  dic = [
    'dashboard_title',
    'dashboard_new',
    "title",
    "description",
    "create",
    "open",
    "close",
    "edit",
    "save",
    "delete",
    "cancel",
    "required",
    'modal_delete'
  ]
  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private boardService: BoardService,
    private userService: UserService,
    private translate: TranslateService,
    private modal: ModalService
  ) { }

  ngOnInit(): void {
    this._createForm()
    this.boardService.getList().subscribe()
    this.boardList$ = this.boardService.listStream
    this.userService.getByLogin(localStorage.getItem('login')!).subscribe(
      user => {
        localStorage.setItem('userId', user.id!)
      }
    )
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
  }

  private _createForm() {
    this.DashboardForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null]
    })
  }

  create() {
    if (this.DashboardForm.invalid) {
      return
    }

    const board: Board = {
      title: this.DashboardForm.value.title,
      description: this.DashboardForm.value.description
    }

    this.boardService.create(board)
      .pipe(switchMap(() => this.boardService.getList()))
      .subscribe(() => {
        this.DashboardForm.reset()
      })
  }

  open(id: string) {
    this.router.navigate(['/user/board', id])
  }

  deletePrompt() {
    this.modal.prompt(this.i18n['modal_delete'], this.delete);
  }

  delete = (id: string) => {
    this.boardService.delete(id)
      .pipe(switchMap(() => this.boardService.getList()))
      .subscribe(() => this.modal.close())
  }

  checkEditableStatus(boardId: string) {
    if (this.boardEditable[boardId] === undefined) {
      return false
    } else {
      return this.boardEditable[boardId]
    }
  }

  edit(boardId: string) {
    this.boardEditable = {
      ...this.boardEditable,
      [boardId]: true
    }
  }

  save(id: string, title: string, description: string) {
    const board: Board = {
      id: id,
      title: title,
      description: description
    }
    this.boardEditable = {
      ...this.boardEditable,
      [id]: false
    }
    this.boardService.edit(board)
      .pipe(switchMap(() => this.boardService.getList()))
      .subscribe()
  }
}
