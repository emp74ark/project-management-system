import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [
  ]
})

export class SharedModule {
  
}