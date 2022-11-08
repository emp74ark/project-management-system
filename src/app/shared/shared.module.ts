import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    HttpClientModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    HttpClientModule,
    MatIconModule,
    MatSelectModule
  ],
  declarations: [
  ]
})

export class SharedModule {

}