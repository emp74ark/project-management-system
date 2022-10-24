import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { BoardPageComponent } from "./board-page/board-page.component";
import { AuthGuard } from "../shared/services/auth.guard";
import { BoardService } from "./shared/services/boards.service";
import { BoardListComponent } from './board-list/board-list.component';
import { ListService } from "./shared/services/lists.service";
import { TaskService } from "./shared/services/tasks.service";
import { UserService } from "./shared/services/users.service";
import { BoardTasksComponent } from './board-tasks/board-tasks.component';
import { AUTH_INTERCEPTOR } from "./shared/interceptors";
import { CommonLayoutComponent } from "../shared/components/common-layout/common-layout.component";
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from "../shared/components/modal/modal.component";

@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardPageComponent,
    BoardPageComponent,
    BoardListComponent,
    BoardTasksComponent,
    ProfileComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: CommonLayoutComponent, children: [
          {path: '', redirectTo: '/user/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'board/:id', component: BoardPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    BoardService,
    AUTH_INTERCEPTOR,
    ListService,
    TaskService,
    UserService
  ],
})

export class UserModule {
  constructor() {}
}