import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private usuario: UsuarioService) { }

  get tipoUsuario(){
    return this.usuario.datos?.tipo;
  }

  cerrarSesion(){
    this.usuario.cerrarSesion();
  }
}
