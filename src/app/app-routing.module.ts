import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { CommonLayoutComponent } from './shared/components/common-layout/common-layout.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '', component: CommonLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: WelcomePageComponent},
      {path: 'about', component: AboutPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
