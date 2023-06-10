import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DetalleUsuarioComponent } from '../usuarios/detalle-usuario/detalle-usuario.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  constructor(private usuario: UsuarioService, private router: Router) { }

  get datos(){
    return this.usuario.datos;
  }

  enviarAGestionarHorarios(){
    this.router.navigate(["gestionar-horarios"]);
  }
}
