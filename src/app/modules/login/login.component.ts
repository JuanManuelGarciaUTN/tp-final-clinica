import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, sendEmailVerification} from '@angular/fire/auth';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
        console.log(datosUsuario);
        if(datosUsuario.user)
        {
          if(datosUsuario.user.emailVerified){
            this.router.navigate(["/home"]);
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
    this.formularioLogin.get('nombre')?.setValue(this.formularioLogin.get('nombre')?.value.trim());
    this.formularioLogin.get('password')?.setValue(this.formularioLogin.get('password')?.value.trim());
  }
}