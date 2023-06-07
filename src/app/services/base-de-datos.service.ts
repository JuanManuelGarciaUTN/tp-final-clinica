import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad';
import { Usuario } from '../interfaces/usuario';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  obtenerDatosUsuario(id:string){
    return getDoc(doc(this.firestore, "usuarios", id));
  }

  obtenerUsuarios(){
    const coleccion = collection(this.firestore, "usuarios");
    return collectionData(coleccion, {idField: 'id'}) as Observable<Usuario[]>;
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

  async agregarUsuario(datos: Usuario){
    const coleccion = collection(this.firestore, "usuarios");
    datos.imagen1 = await this.subirArchivos(datos.imagen1, datos.id + "-1");
    if(datos.imagen2){
      datos.imagen2 = await this.subirArchivos(datos.imagen2, datos.id + "-2");
    }
    const documentoNuevo = doc(coleccion, datos.id);
    setDoc(documentoNuevo, datos);
  }

  cambiarEstado(id: string, estado: boolean){
    const documento = doc(this.firestore, "usuarios", id);
    return updateDoc(documento, {habilitado: estado});
  }

  async subirArchivos(foto: File, nombre: string) : Promise<string> {
    const storageRef = ref(this.storage, `imagenes/${nombre}`);
    const snapshot = await uploadBytesResumable(storageRef, foto);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }
}
