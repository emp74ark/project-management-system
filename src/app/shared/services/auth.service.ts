import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError} from "rxjs";
import { AuthResponse, Dictionary, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";
import { TranslateService } from "./translate.service";

// TODO: If there is an unexpired token, the user should be redirected to the "Main route" of the application automatically.
// TODO: When the token expires - the user should be redirected to the "Welcome page" automatically.

@Injectable({providedIn: 'root'})
export class AuthService {
  dic = ['auth_403', 'auth_409']
  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )
  }

  public authenticated = false

  public authErrorMessage$: Subject<string> = new Subject<string>()
  
  private errorHandle(error: HttpErrorResponse) {
    const { statusCode } = error.error
    switch(statusCode) {
      case 403:
        this.authErrorMessage$.next(this.i18n['auth_403'])
        break;
      case 409:
        this.authErrorMessage$.next(this.i18n['auth_409'])
        break;
    }
    return throwError(error)
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post(`${environment.base_url}/signin`, user)
      .pipe(
        tap<any>(
          response => {
            this.authenticated = true
            localStorage.setItem('login', user.login)
            localStorage.setItem('token', response.token)
          }
        ),
        catchError<any, any>(this.errorHandle.bind(this)),
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