import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public pacienteSeleccionado?: Usuario;
  public pacientes: Observable<Usuario[]>;

  constructor(private db: BaseDeDatosService){
    this.pacientes = db.obtenerPacientes();
  }

  seleccionarPaciente(item: Usuario){
    this.pacienteSeleccionado = item;
  }

  volver(){
    this.pacienteSeleccionado = undefined;
  }
}
