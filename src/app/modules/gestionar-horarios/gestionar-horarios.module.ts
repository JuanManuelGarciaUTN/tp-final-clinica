import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarHorariosComponent } from './gestionar-horarios.component';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';



@NgModule({
  declarations: [
    GestionarHorariosComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule
  ]
})
export class GestionarHorariosModule { }
