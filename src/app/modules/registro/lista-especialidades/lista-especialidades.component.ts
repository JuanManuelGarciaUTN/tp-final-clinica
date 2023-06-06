import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { EspecialidadesSeleccion } from 'src/app/interfaces/especialidad-seleccion';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.scss']
})
export class ListaEspecialidadesComponent {
  @Output() onEspecialidadesSeleccionados = new EventEmitter<Array<EspecialidadesSeleccion>>();
  @Output() onSeleccionarUnEspecialidad = new EventEmitter<Especialidad>();

  public especialidades: Array<EspecialidadesSeleccion> = [];
  public especialidadesSeleccionadas: Array<EspecialidadesSeleccion> = [];
  private subcripcion?: Subscription;

  constructor(private db: BaseDeDatosService){}

  ngOnInit(){
    this.subcripcion = this.db.obtenerEspecialidades().subscribe(datos=>{
      this.especialidades = [];
      for( let especialidad of datos ){
        this.especialidades.push({seleccionado: false, especialidad: especialidad});
      }
    });
  }

  ngOnDestroy(){
    if(this.subcripcion)
      this.subcripcion.unsubscribe();
  }

  actulizarSeleccion() {
    this.especialidadesSeleccionadas = this.especialidades.filter(item => item.seleccionado);
    this.emitirListadoSeleccionado();
  }

  private emitirListadoSeleccionado(){
    this.onEspecialidadesSeleccionados.emit(this.especialidadesSeleccionadas);
  }

  seleccionar(especialidad: EspecialidadesSeleccion){
    especialidad.seleccionado = !especialidad.seleccionado;
    this.especialidadesSeleccionadas = this.especialidades.filter(item => item.seleccionado);
    this.emitirListadoSeleccionado();
  }
}
