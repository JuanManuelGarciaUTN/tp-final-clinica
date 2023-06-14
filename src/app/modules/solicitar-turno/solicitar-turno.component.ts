import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Turno } from 'src/app/interfaces/turno';
import { Horario, Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { TurnosDisponiblesService } from 'src/app/services/turnos-disponibles.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {

  private _paciente?: Usuario;
  public especialidades: Observable<Especialidad[]>;
  private _especialistas?: Usuario[];
  private subEsp: Subscription;
  public especialidadSeleccionada?: string;
  public especialistaSeleccionado?: Usuario;
  public diasDisponibles?: Date[];
  public diaSeleccionado?: Date;
  public mensaje = "";
   

  constructor(private usuario: UsuarioService, 
              private db: BaseDeDatosService, 
              private turnos: TurnosService,
              private generarTurnos: TurnosDisponiblesService,
              private router: Router) { 
    if(this.usuario.datos?.tipo == "paciente"){
      this._paciente = this.usuario.datos;
    }
    this.especialidades = this.db.obtenerEspecialidades();
    this.subEsp = this.db.obtenerEspecialistas().subscribe(datos=>{
      this._especialistas = datos;
    });
  }

  @Input() set paciente(value: Usuario){
    this._paciente = value;
    this.especialidadSeleccionada = undefined;
    this.especialistaSeleccionado = undefined;
    this.diaSeleccionado = undefined;
    this.diasDisponibles = undefined;
  }

  ngDestroy(){
    this.terminarSub();
  }

  get especialistas(){
    return this._especialistas?.filter(item=> {
      if(item.especialidades && this.especialidadSeleccionada){
        return item.especialidades.includes(this.especialidadSeleccionada);
      }
      return false;
    });
  }

  seleccionarEspecialidad(nombre: string){
    this.especialidadSeleccionada = nombre;
    this.especialistaSeleccionado = undefined;
    this.diaSeleccionado = undefined;
    this.diasDisponibles = undefined;
  }

  seleccionarEspecialista(seleccion: Usuario){
    this.especialistaSeleccionado = seleccion;
    this.diaSeleccionado = undefined;
    this.diasDisponibles = undefined;
    if(seleccion.horarios){
      let horario = seleccion.horarios.find(h=>h.especialidad ==this.especialidadSeleccionada);

      this.terminarSub();
      this.subEsp = this.db.obtenerTurnosEspecialista(seleccion.id).subscribe(turnos=>{
        if(horario){
          let horariosBase = this.generarDiasDisponibles(horario);
          this.diasDisponibles = this.filtrarDisponibles(horariosBase, turnos, horario.tiempo);
        }
      })    
    }
  }

  private terminarSub(){
    if(this.subEsp){
      this.subEsp.unsubscribe();
    }
  }

  seleccionarDia(dia: Date){
    this.diaSeleccionado = dia;
  }

  sacarTurno(){
    if(this._paciente && this.especialidadSeleccionada && this.especialistaSeleccionado && this.diaSeleccionado){
      this.db.agregarTurno(this._paciente, this.especialistaSeleccionado, this.especialidadSeleccionada, this.diaSeleccionado);
      this.mensaje = "Turno Generado Exitosamente";
    }
  }

  finalizarRegistro(){
     this.router.navigate(["/perfil"]);
  }

  private generarDiasDisponibles(horario?: Horario) {
    const turnosDisponibles = [];
    if(horario){
      const diaActual = new Date();
      diaActual.setHours(3, 0, 0, 1);

      const nombreDias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
      
      for (let i = 0; i < 15; i++) {
        diaActual.setDate(diaActual.getDate() + 1);
        const diaAnalizado = nombreDias[diaActual.getDay()];

        const dia = horario.dias.find(d => d.nombre.toLowerCase() === diaAnalizado.toLowerCase());
        
        if (dia && dia.estado) {
          const inicioHora = new Date(diaActual);
          inicioHora.setHours(dia.inicio+3, 0, 0, 0);
    
          const finHora = new Date(diaActual);
          finHora.setHours(dia.fin+3, 0, 0, 0);

          let horaActual = new Date(inicioHora);

          while (horaActual < finHora) {
            
            turnosDisponibles.push(new Date(horaActual));
            horaActual.setMinutes(horaActual.getMinutes() + horario.tiempo);
          }
        }
      }
    }

    return turnosDisponibles;
  }

  private filtrarDisponibles(base: Date[], turnos: Turno[], duracion: number){
    const turnosDisponibles: Date[] = [];
    for(let dia of base){
      let disponible = true;
      for(let turno of turnos){
        if(this.compararTurnoFecha(dia, turno, duracion)){
          console.log("ACA");
          disponible = false;
          break;
        }
      }
      if(disponible){
        turnosDisponibles.push(dia);
      }
    }

    return turnosDisponibles;
  }

  private compararTurnoFecha(fecha: Date, turno: Turno, duracion: number){
    turno.fecha = new Date(turno.fecha);
    if(fecha.getDay() == turno.fecha.getDay() && fecha.getMonth() == turno.fecha.getMonth() && fecha.getFullYear() == turno.fecha.getFullYear()){
      let finFecha = new Date(fecha);
      finFecha.setMinutes(fecha.getMinutes()+duracion);
      let finTurno = new Date(turno.fecha);
      finTurno.setMinutes(turno.fecha.getMinutes()+turno.duracion);

      return !(finTurno <= fecha || turno.fecha >= finFecha);
    }
    return false;
  }
}
