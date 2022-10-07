import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProjectCreateComponent } from "./project-create/project-create.component";
import { ProjectPageComponent } from "./project-page/project-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { SignupPageComponent } from './signup-page/signup-page.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: UserLayoutComponent, children: [
          {path: '', redirectTo: '/user/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'signup', component: SignupPageComponent},
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'create', component: ProjectCreateComponent},
          {path: 'project/:id', component: ProjectPageComponent}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class UserModule {
  constructor() {
    
  }
}