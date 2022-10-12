import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Provider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { SharedModule } from "../shared/shared.module";

import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProjectPageComponent } from "./project-page/project-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { AuthGuard } from "./shared/services/auth.guard";
import { BoardService } from "./shared/services/boards.service";
import { SignupPageComponent } from './signup-page/signup-page.component';

const AUTH_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    SignupPageComponent,
    DashboardPageComponent,
    ProjectPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: UserLayoutComponent, children: [
          {path: '', redirectTo: '/user/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'signup', component: SignupPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'project/:id', component: ProjectPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard, 
    BoardService,
    AUTH_INTERCEPTOR
  ],
})

export class UserModule {
  constructor() {
    
  }
}