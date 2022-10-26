import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Task } from "src/app/shared/interfaces";
import { distinct, Observable, tap } from "rxjs";

@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient
  ){}

  create(boardId: string, task: Task) {
    return this.http.post<Task>(
      `${environment.base_url}/boards/${boardId}/columns/${task.columnId}/tasks`,
        {
          title: task.title,
          description: task.description,
          userId: task.userId
        }
      )
  }

  delete(boardId: string, task: Task){
    return this.http.delete(
      `${environment.base_url}/boards/${boardId}/columns/${task.columnId}/tasks/${task.id}`
      )
  }

  edit(boardId: string, task: Task){
    return this.http.put(
      `${environment.base_url}/boards/${boardId}/columns/${task.columnId}/tasks/${task.id}`,
      {
        order: task.order,
        title: task.title,
        description: task.description,
        userId: task.userId,
        boardId: boardId,
        columnId: task.columnId
      }
    )
  }

  getById(boardId: string, task: Task){
    return this.http.delete<Task>(
      `${environment.base_url}/boards/${boardId}/columns/${task.columnId}/tasks/${task.id}`
      )
  }

  getAll(boardId: string, listId: string): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${environment.base_url}/boards/${boardId}/columns/${listId}/tasks`
      )
      .pipe(
        tap(list => {list.sort((a, b) => a.order! - b.order!)})
      )
  }
}