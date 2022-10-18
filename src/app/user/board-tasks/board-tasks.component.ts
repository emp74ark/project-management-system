import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { User, Task, List } from 'src/app/shared/interfaces';
import { TaskService } from '../shared/services/tasks.service';
import { UserService } from '../shared/services/users.service';

@Component({
  selector: 'app-board-tasks',
  templateUrl: './board-tasks.component.html',
  styleUrls: ['./board-tasks.component.scss']
})
export class BoardTasksComponent implements OnInit {

  @Input()

  task!: Task
  taskEditable = false;
  users$!: Observable<User[]> // TODO: add ability to change or assign user
  user!: User
  boardId!: string

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.listStream
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.boardId = params['id']
      }
    )

    // this.userService.getUserById(this.task.userId).subscribe(
    //   user => {this.user = user}
    // )
  }

  delete() {
    this.taskService.delete(this.boardId, this.task)
      .pipe(
        switchMap(() => this.taskService.getAll(this.boardId, this.task.columnId!))
      )
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

}
