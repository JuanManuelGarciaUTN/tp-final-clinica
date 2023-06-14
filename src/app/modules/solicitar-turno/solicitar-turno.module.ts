import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitarTurnoComponent } from './solicitar-turno.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    SolicitarTurnoComponent,
    AdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SolicitarTurnoModule { }
