import { Injectable } from '@angular/core';
import { BaseDeDatosService } from './base-de-datos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: BaseDeDatosService) { }

  obtenerDatos(id:string){
    this.db.obtenerDatosUsuario(id)
    .then(datos=>{
      if(datos.exists()){
        console.log("Datos:", datos.data());
      }
    })
    .catch(error => {throw new Error(error)});
  }
}
