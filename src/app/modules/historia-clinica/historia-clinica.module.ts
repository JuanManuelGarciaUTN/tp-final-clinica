import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { EspecialistaComponent } from './especialista/especialista.component';



@NgModule({
  declarations: [
    HistoriaClinicaComponent,
    EspecialistaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HistoriaClinicaComponent,
  ]
})
export class HistoriaClinicaModule { }
