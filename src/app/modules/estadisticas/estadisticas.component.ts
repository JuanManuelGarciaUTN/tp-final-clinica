import { Component } from '@angular/core';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {

  public estado?: TipoEstadistica
  public TipoEstadistica = TipoEstadistica;
  constructor(private db: BaseDeDatosService) { }

  setEspecialidad(){
    this.estado = TipoEstadistica.especialidad;
  }

  setLog(){
    this.estado = TipoEstadistica.log;
  }

  setTurnosPorDia(){
    this.estado = TipoEstadistica.dia;
  }

  setTurnosSolicitados(){
    this.estado = TipoEstadistica.turnosSolicitados;
  }

  setTurnosFinalizados(){
    this.estado = TipoEstadistica.turnosFinalizados;
  }
}

export enum TipoEstadistica{
  log,
  dia,
  especialidad,
  turnosSolicitados,
  turnosFinalizados
}
