import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Board } from "src/app/shared/interfaces";
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { environment } from "src/environments/environment";

@Injectable()
export class BoardService {
  
  private listSubject: BehaviorSubject<Board[]> = new BehaviorSubject([] as Board[])
  listStream: Observable<Board[]> = this.listSubject.asObservable()  

  constructor(
    private http: HttpClient,
  ){}

  create(board: Board) {
    return this.http.post<Board>(`${environment.base_url}/boards`, board)
  }
  
  delete(id: string) {
    return this.http.delete<Board>(`${environment.base_url}/boards/${id}`)
  }

  edit(board: Board) {
    return this.http.put<Board>(`${environment.base_url}/boards/${board.id}`, 
      {
        title: board.title,
        description: board.description,
      })
  }

  getById(id: string){
    return this.http.get<Board>(`${environment.base_url}/boards/${id}`)
  }

  getList(){
    return this.http.get<Board[]>(`${environment.base_url}/boards`)
      .pipe(
        tap(
          response => this.listSubject.next(response)
        )
      )
  }
}