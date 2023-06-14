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

  constructor(private usuario: UsuarioService, private db: BaseDeDatosService) {}

  public turnos(){
    return this._turnos;
  }

  ngOnInit(){
    if(this.usuario.datos?.tipo == "admin"){
      this.sub = this.db.obtenerTurnosAdmin().subscribe(turnos=>{
        this._turnos = turnos;
      })
    }
    else if(this.usuario.datos?.tipo == "paciente"){
      this.sub = this.db.obtenerTurnosPaciente(this.usuario.datos.id).subscribe(turnos=>{
        this._turnos = turnos;
      })
    }
    else if(this.usuario.datos){
      this.sub = this.db.obtenerTurnosEspecialista(this.usuario.datos.id).subscribe(turnos=>{
        this._turnos = turnos;
      })
    }
  }

  ngDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
