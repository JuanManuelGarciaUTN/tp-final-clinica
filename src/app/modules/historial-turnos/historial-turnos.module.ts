import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistorialTurnosComponent } from './historial-turnos.component';
import { PipesModule } from "src/app/pipes/pipes.module";
import { ReactiveFormsModule } from '@angular/forms';
import { GenerarHistoriaClinicaComponent } from './generar-historia-clinica/generar-historia-clinica.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { DirectivasModule } from '../directivas/directivas.module';

@NgModule({
    declarations: [
        HistorialTurnosComponent,
        GenerarHistoriaClinicaComponent
    ],
    imports: [
        CommonModule,
        SpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        PipesModule,
        DirectivasModule
    ]
})
export class HistorialTurnosModule { }
