import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent {

  private _usuario?: Usuario;
  public cargando: boolean = false;
  public mensajeEstadoEspecialista = "";

  constructor(private db: BaseDeDatosService) {}

  @Input() set usuario(value: Usuario | undefined){
    this._usuario = value;
    this.mensajeEstadoEspecialista = value?.habilitado ? "Deshabilitar" : "Habilitar";
  }

  get nombre(){
    return this._usuario?.nombre;
  }

  get apellido(){
    return this._usuario?.apellido;
  }

  get dni(){
    return this._usuario?.dni;
  }

  get email(){
    return this._usuario?.email;
  }

  get edad(){
    return this._usuario?.edad;
  }

  get imagen1(){
    return this._usuario?.imagen1;
  }

  get imagen2(){
    return this._usuario?.imagen2;
  }

  get tipo(){
    return this._usuario?.tipo;
  }

  get especialidades(){
    return this._usuario?.especialidades;
  }

  get obraSocial(){
    return this._usuario?.obraSocial;
  }

  get habilitado(){
    return this._usuario?.habilitado;
  }

  get mensaje(){
    if(this._usuario){
      return this._usuario.habilitado ? "Deshabilitar" : "Habilitar";
    }
    return "";
  }

  cambiarEstado(){
    this.cargando = true;
    if(this._usuario != undefined && this._usuario.tipo == "especialista")
    {
      this.db.cambiarEstado(this._usuario.id, !this._usuario.habilitado)
      .then(()=>{
        this.cargando = false;
      })
      .catch(error=>console.log(error));
      this._usuario.habilitado = !this._usuario.habilitado;
    }
  }
}
