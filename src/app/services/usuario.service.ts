import { Injectable } from '@angular/core';
import { BaseDeDatosService } from './base-de-datos.service';
import { Usuario } from '../interfaces/usuario';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public datos?: Usuario = undefined;
  private sub?: Subscription;
  
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

  vincularDatos(id: string){
    if(!this.sub){
      this.sub = this.db.asignarDatosUsuario(id).subscribe(datos=>{
        this.datos = datos;
      })
    }
  }

  cerrarSesion(){
    this.datos = undefined;
    this.auth.signOut();
    if(this.sub){
      this.sub.unsubscribe();
      this.sub = undefined;
    }
  }

  actualizarHorarios(){
    if(this.datos?.tipo == "especialista" && this.datos.horarios){
      return this.db.actualizarHorarios(this.datos.id, this.datos.horarios);
    }
    throw new Error("no es especialista");
  }

  testingEspecialista(){
    this.vincularDatos("tzQE9Q6yUraoCqA2wi1MA0XFtrz2");
  }

  testingAdmin(){
    this.vincularDatos("X4heTa0MQ1fYZOduOxQDF5j87sA2");
  }

  testingPaciente(){
    this.vincularDatos("OwIMOP9NNfZqOTmBCZgZhseKayI2");
  }
}
