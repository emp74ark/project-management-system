import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError} from "rxjs";
import { AuthResponse, Dictionary, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";
import { TranslateService } from "./translate.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  dic = ['auth_403', 'auth_409'];
  i18n: Dictionary = this.translate.get(this.dic);

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang);
      }
    );
  }

  public authenticated = false;

  public authErrorMessage$: Subject<string> = new Subject<string>();
  
  private errorHandle(error: HttpErrorResponse) {
    const { statusCode } = error.error;
    switch(statusCode) {
      case 403:
        this.authErrorMessage$.next(this.i18n['auth_403']);
        break;
      case 409:
        this.authErrorMessage$.next(this.i18n['auth_409']);
        break;
    }
    return throwError(error);
  }

  calcTokenExpireDate() {
    return Date.now() + 86400000;
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.base_url}/signin`, user)
      .pipe(
        tap(
          response => {
            this.authenticated = true;
            localStorage.setItem('login', user.login);
            localStorage.setItem('token', response.token);
            localStorage.setItem('exp', this.calcTokenExpireDate().toString());
          }
        ),
        catchError(this.errorHandle.bind(this))
      );
   }

  logout() {
    localStorage.clear();
    this.authenticated = false;
  }

  signup(user: User): Observable<unknown> {
    return this.http.post(`${environment.base_url}/signup`, user)
      .pipe(
        catchError(this.errorHandle.bind(this))
      );
  }
}