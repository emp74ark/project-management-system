import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Project } from "src/app/shared/interfaces";
import { map, tap } from 'rxjs'
import { environment } from "src/environments/environment";

@Injectable()
export class BoardService {
  constructor(
    private http: HttpClient,
  ){}

  private headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // TODO: move to auth.interceptor.ts
    })

  create(project: Project) {
    return this.http.post<Project>(`${environment.base_url}/boards`, project, {headers: this.headers})
      .pipe(
        map((response) => {
          return {
            ...project,
            id: response.id
          }
        }),
        tap<any>(
          response => {
            console.log(response)
          }
        )
      )
  }
  
  delete(id: string) {
    this.getList();
    return this.http.delete(`${environment.base_url}/boards/${id}`, {headers: this.headers})
    .pipe(
      tap<any>(
        response => {
          console.log(response)
        }
      )
    )
  }

  getList(){
    return this.http.get(`${environment.base_url}/boards`, {headers: this.headers})
      .pipe(
        tap<any>(
          response => console.log(response)
        )
      )
  }
}