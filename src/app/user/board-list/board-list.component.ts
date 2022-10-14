import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { List, User } from 'src/app/shared/interfaces';
import { Task } from "src/app/shared/interfaces";
import { TaskService } from '../shared/services/tasks.service';
import { UserService } from '../shared/services/users.service';

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

  createFormVisibility = false
  
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this._createForm()
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.boardId = params['id']
      }
    )
    this.taskService.getAll(this.boardId, this.list.id!).subscribe()
    // this.tasks$ = this.taskService.listStream
    this.tasks$ = this.taskService.getAll(this.boardId, this.list.id!)
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
      // .pipe(switchMap(() => this.taskService.getAll(this.boardId, this.list.id!)))
      .subscribe(
        () => {
          this.TaskForm.reset()
        }
      )    
  }
}
