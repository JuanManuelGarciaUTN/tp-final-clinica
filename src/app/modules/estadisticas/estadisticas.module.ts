import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { LogComponent } from './log/log.component';
import { DiaComponent } from './dia/dia.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { TurnosComponent } from './turnos/turnos.component';



@NgModule({
  declarations: [
    EstadisticasComponent,
    LogComponent,
    DiaComponent,
    EspecialidadComponent,
    TurnosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EstadisticasModule { }
