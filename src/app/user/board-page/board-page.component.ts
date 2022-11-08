import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Board, Dictionary, List } from 'src/app/shared/interfaces';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { BoardService } from '../shared/services/boards.service';
import { ListService } from '../shared/services/lists.service';
import { dic } from './board-page.props';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  BoardForm!: FormGroup
  board$!: Observable<Board>
  boardEditable = false;
  boardId!: string

  lists$!: Observable<List[]>

  i18n: Dictionary = this.translate.get(dic)

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private listService: ListService,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._createForm()

    this.board$ = this.activeRoute.params
      .pipe(
        switchMap((params: Params) => {
          return this.boardService.getById(params['id'])
        })
      )

    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.boardId = params['id']
      }
    )

    this.listService.getAll(this.boardId).subscribe()
    this.lists$ = this.listService.listStream

    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang)
      }
    )
  }

  private _createForm() {
    this.BoardForm = this.fb.group({
      title: [null, [Validators.required]],
    })
  }

  create() {
    if (this.BoardForm.invalid) {
      return
    }

    const list: List = {
      title: this.BoardForm.value.title
    }

    this.listService.create(this.boardId, list)
      .pipe(switchMap(() => this.listService.getAll(this.boardId)))
      .subscribe()
    this.BoardForm.reset()
  }

  edit() {
    this.boardEditable = true
  }

  save(id: string, title: string, description: string) {
    const board: Board = {
      id: id,
      title: title,
      description: description
    }
    this.boardEditable = false
    this.boardService.edit(board)
      .pipe(switchMap(() => this.boardService.getList()))
      .subscribe()
  }
  drop(event: CdkDragDrop<List[]>) {
    const prev = event.previousContainer.data[event.previousIndex]
    const current: List = { ...prev, order: event.currentIndex + 1 }
    moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex)
    this.listService.edit(this.boardId, current).subscribe()
  }
}
