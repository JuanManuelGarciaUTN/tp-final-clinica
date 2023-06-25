import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DniFormatoPipe } from './dni-formato.pipe';
import { EstadoTurnoPipe } from './estado-turno.pipe';
import { NombreCompletoPipe } from './nombre-completo.pipe';

@NgModule({
  declarations: [
    DniFormatoPipe,
    EstadoTurnoPipe,
    NombreCompletoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DniFormatoPipe,
    EstadoTurnoPipe,
    NombreCompletoPipe
  ]
})
export class PipesModule { }
