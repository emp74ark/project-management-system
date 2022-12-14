import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpHeaders } from 'src/app/shared/interfaces';
import { AuthService } from "../../../shared/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<HttpHeaders>, next: HttpHandler): Observable<HttpEvent<HttpHeaders>> {
    if (this.auth.authenticated) {
      const authToken = `Bearer ${localStorage.getItem('token')}`;
      const authExp = localStorage.getItem('exp')!;
      if (Date.now() > Number(authExp)) {
        this.auth.logout();
        this.router.navigate(['/user', 'login']);
      }
      req = req.clone({ setHeaders: { Authorization: authToken } });
    }
    return next.handle(req);
  }

}