import { Auth, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn, FormGroup, FormControl } from '@angular/forms';
import { Observable, debounce, debounceTime, distinctUntilChanged, finalize, map, switchMap, take } from 'rxjs';
import { EspecialidadesSeleccion } from '../interfaces/especialidad-seleccion';


export function confirmarClave(): ValidatorFn
{
  return (formGroup: AbstractControl): ValidationErrors | null =>
  {
    const password = formGroup.get('password');
    const repetirPassword = formGroup.get('repetirPassword');
    const error = { noCoincide: 'La Contraseña No Coincide'};

    if(password?.value !== repetirPassword?.value)
    {
      formGroup.get('repetirPassword')?.setErrors(error);
      return error;
    }
    else
    {
      formGroup.get('repetirPassword')?.setErrors(null);
      return null;
    }
  }
}

export function validarImagen(): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    const file = formControl.value;
    let extension = file.split(".");
    extension = extension[extension.length-1];
    if ( extension != "png" && extension != "jpeg" && extension != "jpg" && extension != "jfif" && extension != "pjpeg") {
      return { invalidExtension: true };
    }

    return null;
  };
  /*"* Botones de Acceso rápido
 - Debe ser botones favbutton. Este debe tener una animación al mostrar las opciones de usuarios
 - Debe tener la imagen de perfil del usuario
 - Debe estar en la esquina inferior izquierda de la pantalla login. 
      6 usuarios. (3 pacientes, 2 especialistas, 1 admin)

* Registro de usuarios
 - Al ingresar a la página solo se deben ver 2 botones 
      con la imagen que represente un paciente o especialista,
      según esa elección mostrará el formulario correspondiente.
- Estas imagenes tienen que estar en botones rectangulares uno al abajo del otro. 
      Al hacer click el formulario debe aparecer con una aminación.*/
}

