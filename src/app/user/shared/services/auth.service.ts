import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "src/app/shared/interfaces";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  authenticated!: false

  get token(): string {
    return '' // TODO: get token from server & check it
  }

  private setToken() {
    // TODO: modify token
  }

  login(user: User): Observable<any> {
    return this.http.post('', user)
      .pipe(
        tap<any>(
          data => console.log(data)
        )
      )
   }

  logout() {}

  signup(user: User): Observable<any> {
    return this.http.post('', user)
      .pipe(
        tap<any>(
          data => console.log(data)
        )
      )
  }

  authenticatedToggle(): boolean {
    return !this.authenticated //TODO: replace by !!this.token
  }
}