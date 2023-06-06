import { ChangeDetectorRef, Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmarClave, usuarioExiste, confirmarEspecialidad } from 'src/app/validators/validators';
import {DniFormatoPipe} from "src/app/pipes/dni-formato.pipe";
import { EspecialidadesSeleccion } from 'src/app/interfaces/especialidad-seleccion';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  public formularioRegistro: FormGroup;
  public imagen2Control: AbstractControl | null;
  public obraSocialControl: AbstractControl | null;

  public tipo: string = "";
  public especialidades: EspecialidadesSeleccion[] = [];
  public posiblesEspecialidades: Array<any> = [];
  public generando: boolean = false;

  constructor(private db: BaseDeDatosService, 
            private router: Router,
            private auth: Auth,
            private cdr: ChangeDetectorRef) {
    this.formularioRegistro = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email], usuarioExiste(this.auth)),
      nombre: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z\s]+$")]),
      apellido: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z\s]+$")]),
      obraSocial: new FormControl("", [Validators.required]),
      edad: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(120)]),
      dni: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(8), Validators.minLength(7)]),
      password: new FormControl("", [Validators.minLength(16), Validators.required]),
      repetirPassword: new FormControl("", [Validators.minLength(16), Validators.required]),
      imagen1: new FormControl(null, [Validators.required]),
      imagen2: new FormControl(null, [Validators.required]),
    }, [confirmarClave()]);

    this.imagen2Control = this.formularioRegistro.get('imagen2');
    this.obraSocialControl = this.formularioRegistro.get('obraSocial');
  }

  setPaciente() {
    this.tipo = 'paciente';

    this.imagen2Control?.reset();
    this.obraSocialControl?.reset();
    this.imagen2Control?.setValidators([Validators.required]);
    this.obraSocialControl?.setValidators([Validators.required]);

    this.formularioRegistro.updateValueAndValidity();
    this.cdr.detectChanges();
  }
  
  setEspecialista() {
    this.tipo = 'especialista';

    this.obraSocialControl?.clearValidators();
    this.imagen2Control?.clearValidators();

    this.obraSocialControl?.setErrors(null);
    this.imagen2Control?.setErrors(null);

    this.formularioRegistro.updateValueAndValidity();
    this.cdr.detectChanges();
  }
  
  setAdmin() {
    this.tipo = 'admin';

    this.obraSocialControl?.clearValidators();
    this.imagen2Control?.clearValidators();

    this.obraSocialControl?.setErrors(null);
    this.imagen2Control?.setErrors(null);

    this.formularioRegistro.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  onSeleccion(espelialidades: Array<EspecialidadesSeleccion>) {
    this.especialidades = espelialidades;
    if(this.especialidades.length > 0) {
      this.formularioRegistro.setErrors({faltaEspecialidad: null});
    }
    else{
      this.formularioRegistro.setErrors({faltaEspecialidad: true});
    }
  }

  generarUsuario(){
    this.generando = true;
    this.limpiarEspacios();
    let datos = this.formularioRegistro.value;

    createUserWithEmailAndPassword(this.auth, datos.email, datos.password)
    .then((datosUsuario) => {
      datos.id = datosUsuario.user.uid;
      this.guardarEnBaseDatos(datos);
      return sendEmailVerification(datosUsuario.user);
    })
    .then(() => {
      this.generando = false;
    })
    .catch((error) => {
      this.generando = false;
      console.error('Registration failed:', error);
    });
  }

  private guardarEnBaseDatos(datos: Usuario){
    let usuario: Usuario = {
      id: datos.id,
      nombre: datos.nombre,
      apellido: datos.apellido,
      email: datos.email,
      dni: datos.dni,
      edad: datos.edad,
      tipo: this.tipo,
      imagen1: datos.imagen1
    };

    switch(usuario.tipo){
      case "paciente":
        usuario.obraSocial = datos.obraSocial;
        break;

      case "especialista":
        datos.especialidades = this.especialidades.map(datos => datos.especialidad.nombre);
        break;
    }
    this.db.agregarUsuario(usuario);
  }

  private limpiarEspacios(){
    this.formularioRegistro.get('email')?.setValue(this.formularioRegistro.get('email')?.value.trim());
    this.formularioRegistro.get('password')?.setValue(this.formularioRegistro.get('password')?.value.trim());
    this.formularioRegistro.get('repetirPassword')?.setValue(this.formularioRegistro.get('repetirPassword')?.value.trim());
  }

  formatearNumeros(control: any){
    const value = control.value || '';
    control.setValue(value.replace(/\D/g, ''));
  }

  formatearLetras(control: any){
    const value = control.value || '';
    control.setValue(value.replace(/[^A-Za-z\s]/g, ''));
  }

  eliminarEspacios(control: any){
    const value = control.value || '';
    control.setValue(value.replace(/\s/g, ''));
  }

  agregarEspecialidad(valor: string){
    this.db.agregarEspecialidad(valor);
  }
}
