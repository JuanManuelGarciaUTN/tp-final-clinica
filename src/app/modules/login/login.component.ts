import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, sendEmailVerification} from '@angular/fire/auth';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formularioLogin: FormGroup;
  public validando: boolean = false;
  public error: string = "";

  constructor(
    private router: Router,
    private usuario: UsuarioService,
    private auth: Auth) {
    this.formularioLogin = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.minLength(16), Validators.required])
    })
  }

  logear(){
      this.limpiarEspacios();
      this.error = "";
      this.validando = true;
      const usuario = this.formularioLogin.value;

      signInWithEmailAndPassword(this.auth, usuario.email, usuario.password)
      .then((datosUsuario) =>{
        if(datosUsuario.user)
        {
          if(datosUsuario.user.emailVerified){
            this.usuario.obtenerDatos()
            .then(datos=>{
              if(datos.tipo == "especialista" && !datos.habilitado){
                this.validando=false;
                this.error = "Cuenta NO Verificado Por Administracion. Contacte a la Clinica";
                this.usuario.cerrarSesion();
              }
              else{
                this.router.navigate(["/perfil"]);
              }
            })  
          }
          else{
            this.validando=false;
            this.error = "Debe verificar su email antes de iniciar sesion";
            sendEmailVerification(datosUsuario.user);
            this.auth.signOut();
          }
        }
        else
        {
          this.validando=false;
          this.error = "Credenciales Invalidas";
        }
      })
      .catch((errors)=>{
        this.validando=false;
        this.error = "Credenciales Invalidas";
      })
  }

  private limpiarEspacios(){
    this.formularioLogin.get('email')?.setValue(this.formularioLogin.get('email')?.value.trim());
    this.formularioLogin.get('password')?.setValue(this.formularioLogin.get('password')?.value.trim());
  }

  registro(){
    this.router.navigate(["/registro"]);
  }

  completarPaciente(){
    this.formularioLogin.get('email')?.setValue("artlixutn@gmail.com");
    this.formularioLogin.get('password')?.setValue("4566547845665478");
  }

  completarAdmin(){
    this.formularioLogin.get('email')?.setValue("se4k07+cx4gqeska4yys@guerrillamailblock.com");
    this.formularioLogin.get('password')?.setValue("rootrootrootroot");
  }

  completarEspecialista(){
    this.formularioLogin.get('email')?.setValue("se64tk+1crusdetf44ak@sharklasers.com");
    this.formularioLogin.get('password')?.setValue("medicomedicomedico");
  }
}