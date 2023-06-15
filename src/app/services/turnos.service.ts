import { Injectable } from '@angular/core';
import { Turno } from '../interfaces/turno';
import { UsuarioService } from './usuario.service';
import { BaseDeDatosService } from './base-de-datos.service';
import { Subscription } from 'rxjs';

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

  ngOnInit(){}

  ngDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
