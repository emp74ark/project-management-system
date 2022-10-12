import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { AuthService } from "../user/shared/services/auth.service";
import {tap} from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
  ){}

  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}` // TODO: move to auth.interceptor.ts
  })

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (this.auth.authenticated){
      //   req = req.clone({setHeaders: {Authorization: authToken}})
    // }
    // return next.handle(req)
    //   .pipe(
    //     tap<any>(() => {console.log(11111)})
    //   )
    const authToken = localStorage.getItem('token')!
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });
    return next.handle(authReq)
  }

}