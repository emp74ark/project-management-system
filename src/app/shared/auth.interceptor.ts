import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from "rxjs";
import { AuthService } from "../user/shared/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.authenticated){
      const authToken = `Bearer ${localStorage.getItem('token')}`
      req = req.clone({setHeaders: {Authorization: authToken}})
    }
    return next.handle(req)
  }

}