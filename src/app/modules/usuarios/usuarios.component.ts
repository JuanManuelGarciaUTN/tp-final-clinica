import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  constructor(private router: Router) { }
  public usuario?: Usuario;
  
  onSeleccion(usuario: Usuario) {
    this.usuario = usuario;
  }

  enviarARegistro(){
    this.router.navigate(["/registro"]);
  }
}
