import { Auth, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn, FormGroup, FormControl } from '@angular/forms';
import { Observable, debounce, debounceTime, map, take } from 'rxjs';
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

export function confirmarEspecialidad(especialidades: EspecialidadesSeleccion[]): ValidatorFn
{
  return (formGroup: AbstractControl): ValidationErrors | null =>
  {
    const error = { faltaEspecialidad: 'Debe Seleccionar Una Especialidad'};
    console.log(especialidades);
    if(especialidades.length == 0)
    {
      formGroup.get('faltaEspecialidad')?.setErrors(error);
      return error;
    }
    else
    {
      formGroup.get('faltaEspecialidad')?.setErrors(null);
      return null;
    }
  }
}

export function usuarioExiste(auth: Auth, espera: number = 2000): AsyncValidatorFn
{
  return (control: AbstractControl) =>{
    let timer: NodeJS.Timeout | null = null;

    return new Promise<ValidationErrors | null>((resolve, reject) => {
      control.valueChanges.subscribe(() => {
        if (timer) {
          clearTimeout(timer);
        }
    
        timer = setTimeout(() => {
          const email = control.value.toLowerCase();
    
          fetchSignInMethodsForEmail(auth, email)
          .then((listaEmails) => {
              if (listaEmails.length > 0) {
                resolve({ usuarioExiste: true });
              } else {
                resolve(null);
              }
            })
          .catch((error) => {
              reject({ error: error });
            });
        }, espera);
      });
    });
  };
}

export function validarImagen(): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    const file = formControl.value;

    if (file && !/\.(jpe?g|png)$/i.test(file.name)) {
      return { invalidExtension: true };
    }

    return null;
  };
}