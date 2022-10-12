import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Board } from "src/app/shared/interfaces";
import { BehaviorSubject, map, Observable, tap } from 'rxjs'
import { environment } from "src/environments/environment";

@Injectable()
export class BoardService {
  
  private listSubject: BehaviorSubject<Board[]> = new BehaviorSubject([] as Board[])
  listStream: Observable<Board[]> = this.listSubject.asObservable()  

  constructor(
    private http: HttpClient,
  ){}

  private headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}` // TODO: move to interceptor https://angular.io/guide/http#http-interceptor-use-cases
    })

  create(board: Board) {
    return this.http.post<Board>(`${environment.base_url}/boards`, board, {headers: this.headers})
      .pipe(
        map((response) => {
          return {
            ...board,
            id: response.id
          }
        })
      )
  }
  
  delete(id: string) {
    return this.http.delete(`${environment.base_url}/boards/${id}`, {headers: this.headers})
  }

  edit(board: Board) {
    return this.http.put(`${environment.base_url}/boards/${board.id}`, 
      {
        title: board.title,
        description: board.description,
      },
      {headers: this.headers})
  }

  getList(){
    return this.http.get(`${environment.base_url}/boards`, {headers: this.headers})
      .pipe(
        tap<any>(
          response => this.listSubject.next(response)
        )
      )
  }
}