import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { AuthResponse, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  public authenticated = false

  public authErrorMessage$: Subject<string> = new Subject<string>()
  
  private errorHandle(error: HttpErrorResponse){
    const { statusCode } = error.error
    console.log(statusCode)
    switch(statusCode) {
      case 403:
        this.authErrorMessage$.next('Email or password is wrong') // TODO: add translation
        break;
      case 409:
        this.authErrorMessage$.next('User already exists!')
        break;
    }
    return throwError(error)
  }

  login(user: User): Observable<AuthResponse> { // FIXME check types
    return this.http.post(`${environment.base_url}/signin`, user)
      .pipe(
        tap<any>(
          response => {
            localStorage.setItem('item', response.token)
            this.authenticated = true
          }
        ),
        catchError<any, any>(this.errorHandle.bind(this))
      )
   }

  logout() {
    localStorage.clear()
    this.authenticated = false
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${environment.base_url}/signup`, user)
      .pipe(
        catchError<any, any>(this.errorHandle.bind(this))
      )
  }
}