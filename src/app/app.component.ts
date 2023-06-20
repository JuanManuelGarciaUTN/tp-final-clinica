import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tp-clinica-final';
}

  /*
  SPRINT 1
* Botones de Acceso rápido
 - Debe ser botones favbutton. Este debe tener una animación al mostrar las opciones de usuarios
 - Debe tener la imagen de perfil del usuario
 - Debe estar en la esquina inferior izquierda de la pantalla login. 
      6 usuarios. (3 pacientes, 2 especialistas, 1 admin)

*Registro de usuarios
 - Al ingresar a la página solo se deben ver 2 botones 
      con la imagen que represente un paciente o especialista,
      según esa elección mostrará el formulario correspondiente.
- Estas imagenes tienen que estar en botones rectangulares uno al abajo del otro. 
      Al hacer click el formulario debe aparecer con una aminación.
      
  SPRINT 2

  * Sacar un turno
 - Comienza mostrando las ESPECIALIDADES en botones con la imagen de la especialidad, 
      en caso de no tener muesra imagen por default.
      Deben ser botones rectangulares sin el nombre de la especialidad
 - Una vez seleccionada mostrará los PROFESIONALES, 
      en botones con la imagen de perfil de cada profesional y
      su nombre arriba de la foto. Estos botones deben ser rectangulares.
- Una vez seleccionado el profesional, aparecerán los días y
      horarios con turnos disponibles para ese PROFESIONAL. 
      Estos botones deben ser rectangulares. Formato (09/09 13:15)
  */


