import { UnicornDisplayComponent } from './components/unicorn-display/unicorn-display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UnicornDisplayComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UnicornDisplayComponent
  ]
})
export class SharedModule { }
