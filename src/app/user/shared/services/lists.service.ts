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

  create(boardId: string, list: List): Observable<List> {
    return this.http.post<List>(`${environment.base_url}/boards/${boardId}/columns`, list)
      .pipe(
        map((response) => {
          return {
            ...list,
            id: response.id
          }
        })
      )
  }

  delete(boardId: string, listId: string) {
    return this.http.delete(`${environment.base_url}/boards/${boardId}/columns/${listId}`)
  }

  edit(boardId: string, list: List) {
    return this.http.put(`${environment.base_url}/boards/${boardId}/columns/${list.id}`,
      {
        title: list.title,
        order: list.order
      })
  }

  getById(boardId: string, listId: string): Observable<List>{
    return this.http.delete(`${environment.base_url}/boards/${boardId}/${listId}`)
      .pipe(
        tap<any>(
          (list: List) => list
        )
      )
  }

  getAll(boardId: string): Observable<List[]> {
    return this.http.get(`${environment.base_url}/boards/${boardId}/columns`)
    .pipe(
      tap<any>(
        response => this.listSubject.next(response)
      )
    )
  }
}