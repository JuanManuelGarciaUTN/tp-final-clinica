import { Injectable } from '@angular/core';
import { Turno } from '../interfaces/turno';
import { UsuarioService } from './usuario.service';
import { BaseDeDatosService } from './base-de-datos.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private _turnos: Turno[] = [];
  private sub?: Subscription;
  private _especialista?: Usuario;

  constructor(private usuario: UsuarioService, private db: BaseDeDatosService) {
    this.usuario.testingPaciente();
  }

  set especialista(value: Usuario){
    if(value.tipo == "especialista"){
      this._especialista = value;
      this.filtrarPorDisponibilidadEspecialista();
    }
  }

  public turnos(){
    return this._turnos;
  }

  private filtrarPorDisponibilidadEspecialista(){
    if(this._especialista){

    }
  }

  ngOnInit(){
    if(true || this.usuario.datos?.tipo == "admin"){
      this.sub = this.db.obtenerTurnosAdmin().subscribe(turnos=>{
        this._turnos = turnos;
        this.filtrarPorDisponibilidadEspecialista();
      })
    }
    /*else if(this.usuario.datos?.tipo == "paciente"){
      this.sub = this.db.obtenerTurnosPaciente(this.usuario.datos.id).subscribe(turnos=>{
        this._turnos = turnos;
        this.filtrarPorDisponibilidadEspecialista();
      })
    }
    else if(this.usuario.datos){
      this.sub = this.db.obtenerTurnosEspecialista(this.usuario.datos.id).subscribe(turnos=>{
        this._turnos = turnos;
      })
    }*/
  }

  ngDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
