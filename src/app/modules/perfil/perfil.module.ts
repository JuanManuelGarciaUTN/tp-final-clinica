import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { UsuariosModule } from '../usuarios/usuarios.module';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    UsuariosModule
  ]
})
export class PerfilModule { }
