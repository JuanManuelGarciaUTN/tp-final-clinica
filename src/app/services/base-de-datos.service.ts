import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  constructor(private firestore: Firestore) { }

  obtenerDatosUsuario(id:string){
    return getDoc(doc(this.firestore, "usuarios", id));
  }
}
