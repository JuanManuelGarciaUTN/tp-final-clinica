import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistorialTurnosComponent } from './historial-turnos.component';
import { PipesModule } from "src/app/pipes/pipes.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HistorialTurnosComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PipesModule
    ]
})
export class HistorialTurnosModule { }
