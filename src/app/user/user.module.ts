import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Provider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { SharedModule } from "../shared/shared.module";

import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { BoardPageComponent } from "./board-page/board-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { AuthGuard } from "./shared/services/auth.guard";
import { BoardService } from "./shared/services/boards.service";
import { SignupPageComponent } from './signup-page/signup-page.component';
import { BoardListComponent } from './board-list/board-list.component';
import { ListService } from "./shared/services/lists.service";
import { TaskService } from "./shared/services/tasks.service";
import { UserService } from "./shared/services/users.service";
import { BoardTasksComponent } from './board-tasks/board-tasks.component';

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
    BoardPageComponent,
    BoardListComponent,
    BoardTasksComponent,
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
          {path: 'board/:id', component: BoardPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard, 
    BoardService,
    AUTH_INTERCEPTOR,
    ListService,
    TaskService,
    UserService
  ],
})

export class UserModule {
  constructor() {
    
  }
}