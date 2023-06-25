import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickAfueraDirective } from './click-afuera.directive';
import { MostrarPasswordDirective } from './mostrar-password.directive';
import { ColorEstadoDirective } from './color-estado.directive';


@NgModule({
  declarations: [
    ClickAfueraDirective,
    MostrarPasswordDirective,
    ColorEstadoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickAfueraDirective,
    MostrarPasswordDirective,
    ColorEstadoDirective
  ]
})
export class DirectivasModule { }
