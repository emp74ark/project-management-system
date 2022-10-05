import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { DashboardPageComponent } from './user/dashboard-page/dashboard-page.component';
import { ProjectPageComponent } from './user/project-page/project-page.component';
import { CommonLayoutComponent } from './shared/components/common-layout/common-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    AboutPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    ProjectPageComponent,
    CommonLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
