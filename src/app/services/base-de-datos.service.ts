import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  constructor(private firestore: Firestore) { }

  obtenerDatosUsuario(id:string){
    return getDoc(doc(this.firestore, "usuarios", id));
  }

  obtenerEspecialidades(){
    const coleccion = collection(this.firestore, "especialidades");
    return collectionData(coleccion, {idField: 'id'}) as Observable<Especialidad[]>;
  }

  agregarEspecialidad(valor: string){
    const coleccion = collection(this.firestore, "especialidades");
    const documentoNuevo = doc(coleccion);
    const nuevoId = documentoNuevo.id;

    setDoc(documentoNuevo, {
      id: nuevoId,
      nombre: valor
    });
  }

  agregarUsuario(datos: Usuario){
    const coleccion = collection(this.firestore, "usuarios");
    const documentoNuevo = doc(coleccion, datos.id);
    setDoc(documentoNuevo, datos);
  }
}
