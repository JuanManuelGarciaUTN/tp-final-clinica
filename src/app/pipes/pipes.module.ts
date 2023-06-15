import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DniFormatoPipe } from './dni-formato.pipe';
import { EstadoTurnoPipe } from './estado-turno.pipe';

@NgModule({
  declarations: [
    DniFormatoPipe,
    EstadoTurnoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DniFormatoPipe,
    EstadoTurnoPipe
  ]
})
export class PipesModule { }
