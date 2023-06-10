import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickAfueraDirective } from './click-afuera.directive';



@NgModule({
  declarations: [
    ClickAfueraDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickAfueraDirective
  ]
})
export class DirectivasModule { }
