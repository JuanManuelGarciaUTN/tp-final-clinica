import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { UsuariosComponent } from './usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DniFormatoPipe } from 'src/app/pipes/dni-formato.pipe';
import { HistoriaClinicaModule } from '../historia-clinica/historia-clinica.module';



@NgModule({
  declarations: [
    DetalleUsuarioComponent,
    UsuariosComponent,
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaModule
  ],
  exports: [
    DetalleUsuarioComponent
  ]
})
export class UsuariosModule { }
