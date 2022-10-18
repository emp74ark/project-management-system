import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, filter, find, map, MonoTypeOperatorFunction, Observable, tap } from "rxjs";
import { User } from "src/app/shared/interfaces";

@Injectable()
export class UserService {
  private listSubject: BehaviorSubject<User[]> = new BehaviorSubject([] as User[])
  listStream: Observable<User[]> = this.listSubject.asObservable()

  constructor(
    private http: HttpClient
  ){}
  
  getUserById(id: string) {
    return this.http.get(`${environment.base_url}/users/${id}`)
      // .pipe(
      //   tap<any>(response => console.log('getUserById: ',response))
      // )
  }

  getAll() {
    return this.http.get(`${environment.base_url}/users`)
      .pipe(
        tap<any>(response => this.listSubject.next(response))
      )
  }

  getByLogin(login: string) {
    return this.http.get(`${environment.base_url}/users`)
      .pipe(
        map<any, User>(
          (response: User[]) => response.filter(user => user.login === login)[0]
        )
      )
  }
}