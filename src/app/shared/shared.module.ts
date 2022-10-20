import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { TranslatePipe } from './pipes/translate.pipe'

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [
    TranslatePipe
  ]
})

export class SharedModule {
  
}