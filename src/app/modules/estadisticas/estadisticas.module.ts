import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { LogComponent } from './log/log.component';
import { DiaComponent } from './dia/dia.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { TurnosComponent } from './turnos/turnos.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    EstadisticasComponent,
    LogComponent,
    DiaComponent,
    EspecialidadComponent,
    TurnosComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    DatePipe
  ],
})
export class EstadisticasModule { }
