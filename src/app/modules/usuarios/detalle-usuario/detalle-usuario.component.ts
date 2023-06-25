import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estado, Turno } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent {

  private _usuario?: Usuario;
  public cargando: boolean = false;
  public mensajeEstadoEspecialista = "";

  @Output() mostrarHistoria = new EventEmitter<Usuario>();

  constructor(private db: BaseDeDatosService, private permisos: UsuarioService) {}

  @Input() set usuario(value: Usuario | undefined){
    this._usuario = value;
    this.mensajeEstadoEspecialista = value?.habilitado ? "Deshabilitar" : "Habilitar";
  }

  get id(){
    return this._usuario?.id;
  }
  get esAdmin(){
    return this.permisos.datos?.tipo == "admin";
  }

  get nombre(){
    return this._usuario?.nombre;
  }

  get apellido(){
    return this._usuario?.apellido;
  }

  get dni(){
    return this._usuario?.dni;
  }

  get email(){
    return this._usuario?.email;
  }

  get edad(){
    return this._usuario?.edad;
  }

  get imagen1(){
    return this._usuario?.imagen1;
  }

  get imagen2(){
    return this._usuario?.imagen2;
  }

  get tipo(){
    return this._usuario?.tipo;
  }

  get especialidades(){
    return this._usuario?.especialidades;
  }

  get obraSocial(){
    return this._usuario?.obraSocial;
  }

  get habilitado(){
    return this._usuario?.habilitado;
  }

  get mensaje(){
    if(this._usuario){
      return this._usuario.habilitado ? "Deshabilitar" : "Habilitar";
    }
    return "";
  }

  cambiarEstado(){
    this.cargando = true;
    if(this._usuario != undefined && this._usuario.tipo == "especialista")
    {
      this.db.cambiarEstado(this._usuario.id, !this._usuario.habilitado)
      .then(()=>{
        this.cargando = false;
      })
      .catch(error=>console.log(error));
      this._usuario.habilitado = !this._usuario.habilitado;
    }
  }

  mostrarHistoriaClinica(){
    this.mostrarHistoria.emit(this._usuario);
  }

  descargarDatosTurnos(){
    if(this._usuario){
      this.cargando = true;
      const nombre = "turnos-" + this.dni;
      let sub = this.db.obtenerTurnosPaciente(this._usuario.id).subscribe(turnos=>{
        const datosFormateados = this.formatearDatos(turnos);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosFormateados);
        const workbook: XLSX.WorkBook = { Sheets: { [nombre]: worksheet }, SheetNames: [nombre] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.generarArchivoExcel(excelBuffer, `${nombre}.xlsx`);
        this.cargando = false;
        sub.unsubscribe();
      })
    }
  }

  private formatearDatos(lista: Turno[]) {
    return lista.map((turno) => ({
      id: turno.id,
      tipo: turno.tipo,
      fecha: new Date(new Date(turno.fecha).getTime() - 3 * 60 * 60 * 1000).toISOString(),
      duracion: turno.duracion,
      estado: Estado[turno.estado],
      idPaciente: turno.idPaciente,
      nombrePaciente: turno.nombrePaciente,
      dniPaciente: turno.dniPaciente,
      idEspecialista: turno.idEspecialista,
      nombreEspecialista: turno.nombreEspecialista,
      reseña: turno.resenia,
      encuesta: turno.encuesta,
      calificacion: turno.calificacion,
      mensajeCancelacion: turno.mensajeCancelacion,
      altura: turno.historiaClinica?.altura,
      peso: turno.historiaClinica?.peso,
      temperatura: turno.historiaClinica?.temperatura,
      presionMin: turno.historiaClinica?.presionMin,
      presionMax: turno.historiaClinica?.presionMax,
      clave1: turno.historiaClinica?.dato1?.clave,
      valor1: turno.historiaClinica?.dato1?.valor,
      clave2: turno.historiaClinica?.dato2?.clave,
      valor2: turno.historiaClinica?.dato2?.valor,
      clave3: turno.historiaClinica?.dato3?.clave,
      valor3: turno.historiaClinica?.dato3?.valor
    }));
  }

  private generarArchivoExcel(buffer: any, nombre: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const link: HTMLAnchorElement = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = nombre;
    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
    }, 100);
  }
}
