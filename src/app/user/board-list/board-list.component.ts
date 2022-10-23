import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Dictionary, List } from 'src/app/shared/interfaces';
import { Task } from "src/app/shared/interfaces";
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
    "task_new",
    "title",
    "description",
    "edit",
    "create",
    "save",
    "delete",
    "cancel",
  ]
  i18n: Dictionary = this.translate.get(this.dic)
  
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private listService: ListService,
    private taskService: TaskService,
    private translate: TranslateService
  ) {}

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
    
    if(this.TaskForm.invalid){
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

  deleteList() {
    this.listService.delete(this.boardId, this.list.id!)
      .pipe(switchMap(() => this.listService.getAll(this.boardId)))
      .subscribe()
  }

  editList() {
    this.listEditable = true
  }

  saveList(title: string, order: number) {
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

  taskDragOverHandler(e: DragEvent) {
    e.preventDefault();
  }

  taskDragEnterHandler(e: DragEvent) {
    const dropZone = e.currentTarget as HTMLDivElement
    dropZone.classList.add('board__list_drop')
  }

  taskDragLeaveHandler(e: DragEvent) {
    const dropZone = e.currentTarget as HTMLDivElement
    dropZone.classList.remove('board__list_drop')
  }

  taskDropHandler(e: DragEvent) {
    e.preventDefault();
    const oldTask: Task = JSON.parse(e.dataTransfer!.getData('text'))
    const dropZone = e.currentTarget as HTMLDivElement
    const dragObject = e.target as HTMLElement
    dragObject.classList.remove('task__container_drag')
    const newTask: Task = {
      ...oldTask,
      columnId: dropZone.id,
    }
    this.taskService.delete(this.boardId, oldTask)
      .subscribe(() => console.log('delete old'))
    this.taskService.create(this.boardId, newTask)
      .pipe(switchMap(() => this.listService.getAll(this.boardId)))
      .subscribe(() => console.log('create new'))
  }
}
