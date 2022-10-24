import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CommonLayoutComponent } from './shared/components/common-layout/common-layout.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/services/auth.guard';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    AboutPageComponent,
    CommonLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthGuard, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
