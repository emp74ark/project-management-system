import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CommonLayoutComponent } from './shared/components/common-layout/common-layout.component';
import { SharedModule } from './shared/shared.module';
import { UserService } from './user/shared/services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    AboutPageComponent,
    CommonLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
