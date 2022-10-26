import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Dictionary, Task, User } from 'src/app/shared/interfaces';
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

  @Input() task!: Task

  taskEditable = false;

  users$!: Observable<User[]>
  user$!: Observable<User>
  userSelect = 'none'

  boardId!: string

  dic = [
    "edit",
    "save",
    "delete",
    "user_select"
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

  delete() { // TODO: confirmation modal
    this.taskService.delete(this.boardId, this.task)
      .pipe(switchMap(() => this.listService.getAll(this.boardId)))
      .subscribe()
  }

  edit() {
    this.taskEditable = true
  }

  save(id: string, order: number, title: string, description: string, user: string) {
    const task: Task = {
      id: id,
      order: order,
      title: title,
      description: description,
      userId: user,
      columnId: this.task.columnId
    }
    this.taskEditable = false
    this.taskService.edit(this.boardId, task)
      .pipe(
        switchMap(() => this.taskService.getAll(this.boardId, task.columnId!)),
        switchMap(() => this.user$ = this.userService.getUserById(this.userSelect))
      )
      .subscribe()
  }
}
