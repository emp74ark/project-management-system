import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";
import { List } from "src/app/shared/interfaces";
import { BehaviorSubject, map, Observable, tap } from "rxjs";

@Injectable()
export class ListService {
  private listSubject: BehaviorSubject<List[]> = new BehaviorSubject([] as List[])
  listStream: Observable<List[]> = this.listSubject.asObservable()

  constructor(
    private http: HttpClient
  ){}

  create(boardId: string, list: List) {
    return this.http.post<List>(`${environment.base_url}/boards/${boardId}/columns`, list)
      .pipe(
        map((response) => {
          return {
            ...list,
            id: response.id
          }
        }),
        tap<any>((response) => console.log(response)) // TODO: remove
      )
  }

  delete(boardId: string, listId: string){
    return this.http.delete(`${environment.base_url}/boards/${boardId}/${listId}`)
  }

  edit(boardId: string, list: List){
    return this.http.put(`${environment.base_url}/boards/${boardId}/${list.id}`,
      {
        title: list.title,
        order: list.order
      })
  }

  getById(boardId: string, listId: string){
    return this.http.delete(`${environment.base_url}/boards/${boardId}/${listId}`)
      .pipe(
        tap<any>(
          (list: List) => list
        )
      )
  }

  getAll(boardId: string) {
    return this.http.get(`${environment.base_url}/boards/${boardId}/columns`)
    .pipe(
      tap<any>(
        response => this.listSubject.next(response)
      )
    )
  }
}