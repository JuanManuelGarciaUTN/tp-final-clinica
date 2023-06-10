import { Component } from '@angular/core';
import { Dia, Horario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestionar-horarios',
  templateUrl: './gestionar-horarios.component.html',
  styleUrls: ['./gestionar-horarios.component.scss']
})
export class GestionarHorariosComponent {
  
  public horario?: Horario;
  public actualizando: boolean = false;
  public mensaje: string = "";

  constructor(private usuario: UsuarioService) { 
    //this.usuario.testingEspecialista();
  }

  get especialidades():Horario[] | undefined{
    return this.usuario.datos ? this.usuario.datos?.horarios : [];
  }

  seleccionarHorario(horario: Horario) {
    this.horario = horario;
    this.horario.dias[0]
  }

  cambiarTiempo(tiempo: number){
    if(this.horario)
      this.horario.tiempo = tiempo;
  }

  cambiarEstado(index: number){
    if(this.horario?.dias)
      this.horario.dias[index].estado = !this.horario.dias[index].estado;
    console.log(this.horario);
    console.log(this.usuario.datos?.horarios);
  }

  validarInicio(dia: Dia) {
    const min = 8;
    let valor = dia.inicio;

    if(dia.inicio < min){
      valor = min;
    }
    if(dia.inicio >= dia.fin){
      valor = dia.fin - 1;
    }
    dia.inicio = valor;
    console.log(this.horario);
  }

  
  validarFin(dia: Dia) {
    const max = dia.nombre == 'sabado' ? 14 : 19;
    let valor = dia.fin;
    if(dia.fin > max){
      valor = max;
    }
    if(dia.fin <= dia.inicio){
      valor = dia.inicio + 1;
    }
    dia.fin = valor;
    console.log(this.horario);
  }

  actualizarHorarios(){
    this.actualizando = true;
    this.usuario.actualizarHorarios()
    .then(()=>{
      this.actualizando = false;
      this.mensaje = "Horarios Actualizados Exitosamente";
    })
    .catch(error => {
      console.log(error);
      this.mensaje = "Error en la base de datos. Intentelo mas tarde";
    });
  }
}
