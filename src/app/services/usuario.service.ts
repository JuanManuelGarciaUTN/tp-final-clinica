import { Injectable } from '@angular/core';
import { BaseDeDatosService } from './base-de-datos.service';
import { Usuario } from '../interfaces/usuario';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public datos?: Usuario = undefined;

  constructor(private db: BaseDeDatosService, private auth: Auth) { }

  obtenerDatos(){
    return new Promise<Usuario>((resolve, reject) => {
    this.db.obtenerDatosUsuario(this.auth.currentUser?.uid!)
    .then(datos=>{
        if(datos.exists()){
          this.datos = datos.data() as Usuario;
          resolve(this.datos);
        }
      })
    .catch(error => 
      reject(error));
    });
  }

  cerrarSesion(){
    this.datos = undefined;
    this.auth.signOut();
  }
}
