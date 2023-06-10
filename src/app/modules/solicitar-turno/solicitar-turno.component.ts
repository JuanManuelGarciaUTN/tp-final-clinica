import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {

  @Input() private pacienteId = "OwIMOP9NNfZqOTmBCZgZhseKayI2";
  public especialidades: Observable<Especialidad[]>;
  private _especialistas?: Usuario[];
  private subEsp: Subscription
  public especialidad?: string;
  public especialista?: Usuario;
   

  constructor(private usuario: UsuarioService, private db: BaseDeDatosService, private turnos: TurnosService) { 
    if(this.usuario.datos?.tipo == "paciente"){
      this.pacienteId = this.usuario.datos.id;
    }
    this.especialidades = this.db.obtenerEspecialidades();
    this.subEsp = this.db.obtenerEspecialistas().subscribe(datos=>{
      this._especialistas = datos;
    });
  }

  get especialistas(){
    return this._especialistas?.filter(item=> {
      if(item.especialidades && this.especialidad){
        return item.especialidades.includes(this.especialidad);
      }
      return false;
    });
  }

  seleccionarEspecialidad(nombre: string){
    this.especialidad = nombre;
    this.especialista = undefined;
  }

  seleccionarEspecialista(seleccion: Usuario){
    this.especialista = seleccion;
  }
}
