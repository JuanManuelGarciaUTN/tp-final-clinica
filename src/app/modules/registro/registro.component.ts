import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmarClave, usuarioExiste } from 'src/app/validators/validators';
import {DniFormatoPipe} from "src/app/pipes/dni-formato.pipe";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  public formularioRegistro: FormGroup;
  public tipo: string = "";
  public especialidad: string = "";
  public especialidades: string[] = ["Clinico", "Pediatra", "Dentista"];
  public posiblesEspecialidades: Array<any> = [];

  constructor(//private dbUsuarios: DbUsuariosService, 
            //private login: UsuarioService,
            private router: Router,
            private auth: Auth) {
    this.formularioRegistro = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email], usuarioExiste(this.auth)),
      nombre: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z\s]+$")]),
      apellido: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z\s]+$")]),
      obraSocial: new FormControl("", [Validators.required]),
      edad: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(1), Validators.max(120)]),
      dni: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(8), Validators.minLength(7)]),
      password: new FormControl("", [Validators.minLength(16), Validators.required]),
      repetirPassword: new FormControl("", [Validators.minLength(16), Validators.required]),
      imagen1: new FormControl("", [Validators.required]),
      imagen2: new FormControl("", [Validators.required]),
    }, [confirmarClave()]);
  }

  setPaciente() {
    this.tipo = 'paciente';
  }
  
  setEspecialista() {
    this.tipo = 'especialista';
  }
  
  setAdmin() {
    this.tipo = 'admin';
  }

  seleccionarEspecialidad(nombre: string) {
    this.especialidad = nombre;
  }

  generarUsuario(){
    this.limpiarEspacios();
    /*let usuario: Usuario = {nombre: this.formularioRegistro.value.nombre,
                           password: this.formularioRegistro.value.password,
                           puntajeMaxAhorcado: 0,
                           puntajeMaxMayorMenor: 0,
                           puntajeMaxPreguntados: 0,
                           puntajeMaxBlackjack: 0};

    this.dbUsuarios.guardarUsuario(usuario);
    this.login.iniciar(usuario)
    this.dbUsuarios.generarLogUsuario(usuario);
    this.router.navigate(["/home"]);*/
  }

  private limpiarEspacios(){
    this.formularioRegistro.get('nombre')?.setValue(this.formularioRegistro.get('nombre')?.value.trim());
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
    this.especialidades.push(valor);
  }
}
