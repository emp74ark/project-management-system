import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User, Task, Dictionary } from 'src/app/shared/interfaces';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { ListService } from '../shared/services/lists.service';
import { TaskService } from '../shared/services/tasks.service';
import { UserService } from '../shared/services/users.service';

@Component({
  selector: 'app-board-tasks',
  templateUrl: './board-tasks.component.html',
  styleUrls: ['./board-tasks.component.scss']
})
export class BoardTasksComponent implements OnInit {

  @Input()

  task!: Task // get from board-list.component (is, title, order, description, userId)

  taskEditable = false;

  users$!: Observable<User[]> // TODO: add ability to change or assign user
  user$!: Observable<User>

  boardId!: string

  dic = [
    "edit",
    "save",
    "delete"
  ]
  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAll()
    
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.boardId = params['id']
      }
    )
    
    this.user$ = this.userService.getUserById(this.task.userId)

    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
  }

  delete() {
    this.taskService.delete(this.boardId, this.task)
      .pipe(switchMap(() => this.listService.getAll(this.boardId)))
      .subscribe()
  }

  edit() {
    this.taskEditable = true
  }

  save(id: string, title: string, description: string, user: string){
    const task: Task = {
      id: id,
      order: 1, // TODO: task ordering
      title: title,
      description: description,
      userId: user,
      columnId: this.task.columnId
    }
    this.taskEditable = false
    this.taskService.edit(this.boardId, task)
      .pipe(switchMap(() => this.taskService.getAll(this.boardId, task.columnId!)))
      .subscribe()
  }

  taskDragStartHandler(e: DragEvent) {
    e.dataTransfer!.setData('text', JSON.stringify(this.task))
    const dragObject = e.target as HTMLElement
    dragObject.classList.add('task__container_drag')
  }

  taskDragEndHandler(e: DragEvent) {
    e.dataTransfer?.clearData()
  }
}
