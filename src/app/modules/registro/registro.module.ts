import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaEspecialidadesComponent } from './lista-especialidades/lista-especialidades.component';
import { SpinnerModule } from "../spinner/spinner.module";



@NgModule({
    declarations: [
        RegistroComponent,
        ListaEspecialidadesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule
    ]
})
export class RegistroModule { }
