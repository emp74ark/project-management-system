import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

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

  edit(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${environment.base_url}/users/${id}`, user)
  }

  delete(id: string) {
    return this.http.delete(`${environment.base_url}/users/${id}`)
  }
}