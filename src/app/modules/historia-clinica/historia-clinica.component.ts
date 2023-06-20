import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatoVariable, Estado, Turno } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent {

  public turnos: Turno[] = [];
  private sub?: Subscription;
  private _especialista?: Usuario;

  constructor(private db:BaseDeDatosService,private usuario: UsuarioService) { 
    if(this.usuario.datos?.tipo == "paciente"){
      this.paciente = this.usuario.datos.id;
    }
  }

  get datos(){
    return this.usuario.datos;
  }

  @Input() set especialista(value: Usuario | undefined){
    if(value && value.tipo == "especialista"){
      this._especialista = value;
    }
  }

  @Input() set paciente(value: string | undefined){
    if(value){
      this.sub = this.db.obtenerTurnosPaciente(value).subscribe(turnos => {
        this.turnos = [];
        for(let turno of turnos){
          if(turno.estado == Estado.realizado){
            if(this._especialista){
              if(turno.idEspecialista == this._especialista.id){
                this.turnos.push(turno);
              }
            }
            else{
              this.turnos.push(turno);
            }
          }
        }
        this.turnos.sort((a,b)=> {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);
          return dateB.getTime() - dateA.getTime();
        })
      });
    }
  }  

  ngDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  validarDatoOpcional(dato?: DatoVariable){
    return dato != undefined && dato.clave != "" && dato.valor != "";
  }
}
