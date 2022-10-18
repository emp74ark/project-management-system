import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board, List } from 'src/app/shared/interfaces';
import { ListService } from '../shared/services/lists.service';
import { BoardService } from '../shared/services/boards.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { TaskService } from '../shared/services/tasks.service';

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

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private listService: ListService,
    private taskService: TaskService,
    private activeRoute: ActivatedRoute
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

    /* // this.listService.getAll(this.boardId)
    this.listService.listStream
      .pipe(
        tap(pre => {
          pre.map(
            el => {
              // this.taskService.getAll(this.boardId, el.id!)
              this.taskService.listStream
                .pipe(
                  tap(res => console.log(res))
                )
                .subscribe()
            }
          )
        })
      )
      .subscribe() */
  }

  private _createForm() {
    this.BoardForm = this.fb.group({
      title: [null, [Validators.required]],
    })
  }

  create() {
    if(this.BoardForm.invalid) {
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

  edit(){
    this.boardEditable = true
  }

  save(id: string, title: string, description: string){
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

}
