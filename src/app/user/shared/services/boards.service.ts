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

  create(board: Board) {
    return this.http.post<Board>(`${environment.base_url}/boards`, board)
      // .pipe(
      //   map((response) => {
      //     return {
      //       ...board,
      //       id: response.id
      //     }
      //   })
      // )
  }
  
  delete(id: string) {
    return this.http.delete(`${environment.base_url}/boards/${id}`)
  }

  edit(board: Board) {
    return this.http.put(`${environment.base_url}/boards/${board.id}`, 
      {
        title: board.title,
        description: board.description,
      })
  }

  getById(id: string){
    return this.http.get(`${environment.base_url}/boards/${id}`)
      .pipe(
        tap<any>(
          (board: Board) => board
        )
      )
  }

  getList(){
    return this.http.get(`${environment.base_url}/boards`)
      .pipe(
        tap<any>(
          response => this.listSubject.next(response)
        )
      )
  }
}