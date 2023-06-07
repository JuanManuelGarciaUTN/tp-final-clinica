import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent {
  @Output() usuarioSeleccionado = new EventEmitter<Usuario>();

  public usuarios: Array<Usuario> = [];
  private subToUsuarios?: Subscription;

  constructor(private db: BaseDeDatosService) {}

  ngOnInit() {
    this.subToUsuarios = this.db.obtenerUsuarios().subscribe(datos=>{
      this.usuarios = datos;
    });
  }

  ngOnDestroy() {
    if (this.subToUsuarios)
      this.subToUsuarios.unsubscribe();
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado.emit(usuario);
  }
}
