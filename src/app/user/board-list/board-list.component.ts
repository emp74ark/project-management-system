import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Dictionary, List, Task } from 'src/app/shared/interfaces';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { ListService } from '../shared/services/lists.service';
import { TaskService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})

export class BoardListComponent implements OnInit {
  @Input()
  list!: List

  tasks$!: Observable<Task[]>
  boardId!: string

  TaskForm!: FormGroup

  listEditable = false

  createFormVisibility = false

  dic = [
    'task_new',
    'title',
    'description',
    'edit',
    'create',
    'save',
    'delete',
    'cancel',
    'modal_delete'
  ]
  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private listService: ListService,
    private taskService: TaskService,
    private translate: TranslateService,
    private modal: ModalService
  ) { }

  ngOnInit(): void {
    this._createForm()
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.boardId = params['id']
      }
    )

    this.taskService.getAll(this.boardId, this.list.id!).subscribe()
    this.tasks$ = this.taskService.getAll(this.boardId, this.list.id!)

    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
  }

  private _createForm() {
    this.TaskForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  createFormOpen() {
    this.createFormVisibility = true
  }

  createFormClose() {
    this.createFormVisibility = false
    this.TaskForm.reset()
  }

  create() {
    this.createFormVisibility = false

    if (this.TaskForm.invalid) {
      return
    }

    const task: Task = {
      title: this.TaskForm.value.title,
      description: this.TaskForm.value.description,
      userId: localStorage.getItem('userId')!,
      boardId: this.boardId,
      columnId: this.list.id!
    }

    this.taskService.create(this.boardId, task)
      .pipe(switchMap(() => this.tasks$ = this.taskService.getAll(this.boardId, this.list.id!)))
      .subscribe(
        () => {
          this.TaskForm.reset()
        }
      )
  }

  prompt() {
    this.modal.prompt(this.i18n['modal_delete'], this.delete);
  }

  delete = () => {
    this.listService.delete(this.boardId, this.list.id!)
      .pipe(switchMap(() => this.listService.getAll(this.boardId)))
      .subscribe()
  }

  edit() {
    this.listEditable = true
  }

  save(title: string, order: number) {
    const list: List = {
      id: this.list.id,
      order: order,
      title: title,
    }
    this.listService.edit(this.boardId, list)
      .pipe(switchMap(() => this.listService.getAll(this.boardId)))
      .subscribe()
    this.listEditable = false
  }

  drop(event: CdkDragDrop<Task[]>) {
    const prev = event.previousContainer.data[event.previousIndex]
    const current: Task = { ...prev, order: event.currentIndex + 1, columnId: event.container.id }
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
      this.taskService.edit(this.boardId, current).subscribe()
    } else {
      event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      this.taskService.create(this.boardId, current)
        .pipe(
          switchMap(() => this.taskService.delete(this.boardId, prev)),
          switchMap(() => this.tasks$ = this.taskService.getAll(this.boardId, prev.columnId!)),
          switchMap(() => this.listService.getAll(this.boardId))
        )
        .subscribe()
    }
  }

}
