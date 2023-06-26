import { Pipe, PipeTransform } from '@angular/core';
import { Estado } from '../interfaces/turno';

@Pipe({
  name: 'estadoTurno'
})
export class EstadoTurnoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    switch(value){
      case Estado.pendiente:
        return "pendiente";

      case Estado.aceptado:
        return "aceptado";

      case Estado.canceladoAdmin:
        return "cancelado";

      case Estado.canceladoEspecialista:
        return "cancelado";

      case Estado.canceladoPaciente:
        return "cancelado";

        case Estado.rechazado:
          return "rechazado";

      case Estado.aceptado:
        return "aceptado";

      case Estado.realizado:
        return "realizado";
      
      default:
        return "tipo dato invalido";
    }
  }

}
