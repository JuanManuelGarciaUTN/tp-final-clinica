import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docSnapshots, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad';
import { Horario, Usuario } from '../interfaces/usuario';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { DocumentData, DocumentReference, getDocs, or, orderBy, query, where } from 'firebase/firestore';
import { Estado, Turno } from '../interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  obtenerDatosUsuario(id:string){
    return getDoc(doc(this.firestore, "usuarios", id));
  }

  asignarDatosUsuario(id: string): Observable<Usuario|undefined> {
    const docRef = doc(this.firestore, 'usuarios', id);
    return docSnapshots(docRef).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data() as Usuario;
        }
        return undefined;
      })
    );
  }

  obtenerUsuarios(){
    const coleccion = collection(this.firestore, "usuarios");
    const q = query(coleccion, orderBy("tipo", "desc"))
    return collectionData(q, {idField: 'id'}) as Observable<Usuario[]>;
  }

  obtenerEspecialistas(){
    const coleccion = collection(this.firestore, "usuarios");
    const q = query(coleccion, where("tipo", "==", "especialista"))
    return collectionData(q, {idField: 'id'}) as Observable<Usuario[]>;
  }

  obtenerPacientes(){
    const coleccion = collection(this.firestore, "usuarios");
    const q = query(coleccion, where("tipo", "==", "paciente"))
    return collectionData(q, {idField: 'id'}) as Observable<Usuario[]>;
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

  actualizarHorarios(id: string, nuevoHorario: Horario[]){
    const documento = doc(this.firestore, "usuarios", id);
    return updateDoc(documento, {horarios: nuevoHorario});
  }

  async subirArchivos(foto: File, nombre: string) : Promise<string> {
    const storageRef = ref(this.storage, `imagenes/${nombre}`);
    const snapshot = await uploadBytesResumable(storageRef, foto);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }

  async usuarioExiste(email: string): Promise<boolean> {
    const coleccion = collection(this.firestore, "usuarios");
    const q = query(coleccion, where("email", "==", email));
    const datos = await getDocs(q);
    return datos.size !== 0;
  }

  obtenerTurnosAdmin(){
    const coleccion = collection(this.firestore, "turnos");
    return collectionData(coleccion, {idField: 'id'}) as Observable<Turno[]>;
  }

  obtenerTurnosPaciente(id: string){
    const now = new Date();
    const utcString = now.toUTCString();
    const coleccion = collection(this.firestore, "turnos");
    const q = query(coleccion, or(where("paciente", "==", id), where("fecha", ">=", utcString)));
    return collectionData(coleccion, {idField: 'id'}) as Observable<Turno[]>;
  }

  obtenerTurnosEspecialista(id: string){
    const coleccion = collection(this.firestore, "turnos");
    const q = query(coleccion, where("especialista", "==", id));
    return collectionData(coleccion, {idField: 'id'}) as Observable<Turno[]>;
  }

  agregarTurno(paciente: Usuario, especialista: Usuario, especialidad: string, fecha: Date){
    const coleccion = collection(this.firestore, "turnos");
    const documentoNuevo = doc(coleccion);
    const nuevoId = documentoNuevo.id;
    const duracion = especialista.horarios?.find(d => d.especialidad === especialidad);

    setDoc(documentoNuevo, {
      id: nuevoId,
      idPaciente: paciente.id,
      nombrePaciente: paciente.nombre + " " + paciente.apellido,
      idEspecialista: especialista.id,
      nombreEspecialista: especialista.nombre + " " + especialista.apellido,
      tipo: especialidad,
      fecha: fecha.toUTCString(),
      duracion: duracion?.tiempo,
      estado: Estado.pendiente
    });
  }
}



