import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    HttpClientModule,
    MatIconModule
  ],
  exports: [
    HttpClientModule,
    MatIconModule
  ],
  declarations: [
  ]
})

export class SharedModule {

}