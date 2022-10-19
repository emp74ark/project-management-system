import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, filter, find, map, MonoTypeOperatorFunction, Observable, tap } from "rxjs";
import { User } from "src/app/shared/interfaces";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ){}
  
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.base_url}/users/${id}`)
  }

  getAll() {
    return this.http.get<User[]>(`${environment.base_url}/users`)
  }

  getByLogin(login: string) {
    return this.http.get<User>(`${environment.base_url}/users`)
      .pipe(
        map<any, User>(
          (response: User[]) => response.filter(user => user.login === login)[0]
        )
      )
  }
}