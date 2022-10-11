import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthResponse, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  authenticated = false

  login(user: User): Observable<AuthResponse> { // FIXME check types
    return this.http.post(`${environment.base_url}/signin`, user)
      .pipe(
        tap<any>(
          response => {
            localStorage.setItem('item', response.token)
            this.authenticated = true
          }
        )
      )
   }

  logout() {
    localStorage.clear()
    this.authenticated = false
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${environment.base_url}/signup`, user)
      .pipe(
        tap<any>(
          data => console.log(data) // FIXME: for debug only
        )
      )
  }
}