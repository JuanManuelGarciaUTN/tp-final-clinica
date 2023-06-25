import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickAfueraDirective } from './click-afuera.directive';
import { MostrarPasswordDirective } from './mostrar-password.directive';


@NgModule({
  declarations: [
    ClickAfueraDirective,
    MostrarPasswordDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickAfueraDirective,
    MostrarPasswordDirective
  ]
})
export class DirectivasModule { }
