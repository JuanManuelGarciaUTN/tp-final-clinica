import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estado } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent {

  public pacientes: any[] = [];
  public pacienteSeleccionado?: any;
  private subPacientes?: Subscription;
  private subTurnos?: Subscription;

  constructor(private db: BaseDeDatosService, private usuario: UsuarioService) {

    if(this.usuario.datos && this.usuario.datos.tipo == "especialista"){
      this.subTurnos = this.db.obtenerTurnosEspecialista(this.usuario.datos.id).subscribe(turnos=>{
        this.pacientes = [];
        for(let item of turnos){
          if(item.estado == Estado.realizado && !this.existePaciente(this.pacientes, item.idPaciente)){
            this.pacientes.push({id: item.idPaciente, nombre: item.nombrePaciente, dni: item.dniPaciente});
          }
        }
      });
    }
  }

  get especialista(){
    return this.usuario.datos;
  }

  ngDestroy(){
    if(this.subPacientes){
      this.subPacientes.unsubscribe();
    }
    if(this.subTurnos){
      this.subTurnos.unsubscribe();
    }
  }

  seleccionarPaciente(item: any){
    this.pacienteSeleccionado = item;
  }

  volver(){
    this.pacienteSeleccionado = undefined;
  }

  private existePaciente(pacientes: any[], paciente: any){
    for(let item of pacientes){
      console.log(item," | ", paciente);
      if(item.id == paciente){
        return true;
      }
    }
    return false;
  }
}