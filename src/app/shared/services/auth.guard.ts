import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canActivate(
    ): Promise<boolean> | boolean{
    if (this.auth.authenticated) {
      return true
    } else {
      this.router.navigate(['user', 'login'])
    }
    return false
  }

}