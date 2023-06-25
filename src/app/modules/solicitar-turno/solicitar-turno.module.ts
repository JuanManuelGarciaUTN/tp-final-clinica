import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitarTurnoComponent } from './solicitar-turno.component';
import { AdminComponent } from './admin/admin.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    SolicitarTurnoComponent,
    AdminComponent
  ],
  imports: [
    PipesModule,
    CommonModule
  ]
})
export class SolicitarTurnoModule { }
