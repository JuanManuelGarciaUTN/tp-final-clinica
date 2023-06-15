import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estado, Turno } from 'src/app/interfaces/turno';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.component.html',
  styleUrls: ['./historial-turnos.component.scss']
})
export class HistorialTurnosComponent {

  private _turnos?: Turno[];
  public turnos?: Turno[];
  public especialistas?: any[];
  public especialidades?: string[];
  public pacientes?: any[];
  public especialidadSeleccionada: string = "";
  public especialistaSeleccionado: string = "";
  public pacienteSeleccionado: string = "";
  private subTurnos?: Subscription;
  public estados = Estado;
  public mensaje = "";
  public tipoMensaje?: Estado;
  public respuestaUsuario = "";
  private turnoSeleccionado?: Turno;
  public encuesta?: boolean;

  constructor(private usuario: UsuarioService,private db: BaseDeDatosService){
    if(this.usuario.datos?.tipo == "admin"){
      this.subTurnos = this.db.obtenerTurnosAdmin().subscribe(turnos=>{
        this._turnos = turnos;
        this.obtenerOpciones();
        this.filtrarTurnos();
      })
    }
    else if(this.usuario.datos?.tipo == "paciente"){
      this.subTurnos = this.db.obtenerTurnosPaciente(this.usuario.datos.id).subscribe(turnos=>{
        this._turnos = turnos;
        this.obtenerOpciones();
        this.filtrarTurnos();
      })
    }
    else if(this.usuario.datos?.tipo == "especialista"){
      this.subTurnos = this.db.obtenerTurnosEspecialista(this.usuario.datos.id).subscribe(turnos=>{
        this._turnos = turnos;
        this.obtenerOpciones();
        this.filtrarTurnos();
      })
    }
    else{
      this.subTurnos = this.db.obtenerTurnosAdmin().subscribe(turnos=>{
        this._turnos = turnos;
        this.obtenerOpciones();
        this.filtrarTurnos();
      })
    }
  }

  get tipoUser(){
    return this.usuario.datos?.tipo;
  }

  ngDestroy(){
    if(this.subTurnos){
      this.subTurnos.unsubscribe();
    }
  }

  private filtrarTurnos(){
    this.turnos = [];
    if(this._turnos){
      for(let turno of this._turnos){
        if(this.especialidadSeleccionada){
          if(turno.tipo == this.especialidadSeleccionada){
            this.turnos.push(turno);
          }
        }
        else if(this.especialistaSeleccionado){
          if(turno.idEspecialista == this.especialistaSeleccionado){
            this.turnos.push(turno);
          }
        }
        else if(this.pacienteSeleccionado){
          if(turno.idPaciente == this.pacienteSeleccionado){
            this.turnos.push(turno);
          }
        }
        else{
          this.turnos = this._turnos;
          break;
        }
      }
    }
  }

  private obtenerOpciones(){
    this.obtenerEspecialidades();
    if(this.usuario.datos?.tipo == "especialista"){
      this.obtenerPacientes();
    }
    else{
      this.obtenerEspecialistas();
    }
  }

  private obtenerPacientes(){
    this.pacientes = [];
    if(this._turnos){
      for(let turno of this._turnos){
        let paciente = {id: turno.idPaciente, nombre: turno.nombrePaciente};
        if(!this.existe(this.pacientes, paciente.id)){
          this.pacientes.push(paciente);
        }
      }
    }
  }

  private existe(array: any[], id: string){
    for(let item of array){
      if(item.id == id){
        return true;
      }
    }
    return false;
  }

  private obtenerEspecialidades(){
    this.especialidades = [];
    if(this._turnos){
      for(let turno of this._turnos){
        if(!this.especialidades.includes(turno.tipo)){
          this.especialidades.push(turno.tipo);
        }
      }
    }
  }

  private obtenerEspecialistas(){
    this.especialistas = [];
    if(this._turnos){
      for(let turno of this._turnos){
        let especialista = {id: turno.idEspecialista, nombre: turno.nombreEspecialista};
        if(!this.existe(this.especialistas, especialista.id)){
          this.especialistas.push(especialista);
        }
      }
    }
  }

  seleccionarEspecialidad(nombre: string){
    if(this.especialidadSeleccionada == nombre){
      this.especialidadSeleccionada = "";
    }
    else{
      this.especialidadSeleccionada = nombre;
      this.especialistaSeleccionado = "";
      this.pacienteSeleccionado = "";
    }
    this.filtrarTurnos();
  }

  seleccionarPaciente(id: string){
    if(this.pacienteSeleccionado == id){
      this.pacienteSeleccionado = "";
    }
    else{
      this.pacienteSeleccionado = id;
      this.especialistaSeleccionado = "";
      this.especialidadSeleccionada = "";
    }
    this.filtrarTurnos();
  }

  seleccionarEspecialista(id: string){
    if(this.especialistaSeleccionado == id){
      this.especialistaSeleccionado = "";
    }
    else{
      this.especialistaSeleccionado = id;
      this.especialidadSeleccionada = "";
      this.pacienteSeleccionado = "";
    }
    this.filtrarTurnos();
  }

  cancelarTurno(turno: Turno){
    this.mensaje = "Ingrese motivo de la cancelacion";
    if(this.tipoUser == "paciente"){
      this.tipoMensaje = Estado.canceladoPaciente;
    }
    else if(this.tipoUser == "especialista"){
      this.tipoMensaje = Estado.canceladoEspecialista;
    }
    else{
      this.tipoMensaje = Estado.canceladoAdmin;
    }
    this.turnoSeleccionado = turno;
  }

  rechazarTurno(turno: Turno){
    this.mensaje = "Ingrese motivo del rechazo";
    this.tipoMensaje = Estado.rechazado;
    this.turnoSeleccionado = turno;
  }

  aceptarTurno(turno: Turno){
    this.db.actualizarEstadoTurno(turno, Estado.aceptado);
  }

  finalizarTurno(turno: Turno){
    this.mensaje = "Ingrese reseña para el paciente";
    this.tipoMensaje = Estado.realizado;
    this.turnoSeleccionado = turno;
  }

  cancelarMensaje(){
    this.mensaje = "";
    this.tipoMensaje = undefined;
  }

  finalizarMensaje(){
    if(this.turnoSeleccionado ){
      if(this.tipoMensaje && this.encuesta === undefined){
        this.db.actualizarEstadoTurno(this.turnoSeleccionado, this.tipoMensaje);
        if(this.tipoMensaje == Estado.realizado){
          this.db.agregarMensajeReseniaTurno(this.turnoSeleccionado, this.respuestaUsuario);
        }
      }
      else if(this.encuesta){
        this.db.agregarMensajeEncuestaTurno(this.turnoSeleccionado, this.respuestaUsuario);
      }
      else{
        this.db.agregarMensajeCalificacionTurno(this.turnoSeleccionado, this.respuestaUsuario);
      }
    }
    this.mensaje = "";
    this.respuestaUsuario = "";
    this.tipoMensaje = undefined;
    this.encuesta = undefined;
  }

  verResenia(turno: Turno){
    this.mensaje = turno.resenia ? turno.resenia : "";
  }

  verCalificacion(turno: Turno){
    this.mensaje = turno.calificacion ? turno.calificacion : "";
  }

  verEncuesta(turno: Turno){
    this.mensaje = turno.encuesta ? turno.encuesta : "";
  }

  calificarAtencion(turno: Turno){
    this.mensaje = "Ingrese calificacion de la Atencion";
    this.turnoSeleccionado = turno;
    this.encuesta = false;
  }

  completarEncuesta(turno: Turno){
    this.mensaje = "Ingrese encuesta";
    this.turnoSeleccionado = turno;
    this.encuesta = true;
  }
}
