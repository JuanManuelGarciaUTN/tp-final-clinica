import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatoVariable, HistoriaClinica, Turno } from 'src/app/interfaces/turno';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-generar-historia-clinica',
  templateUrl: './generar-historia-clinica.component.html',
  styleUrls: ['./generar-historia-clinica.component.scss']
})
export class GenerarHistoriaClinicaComponent {
  public formularioRegistro: FormGroup;
  public generando = false;
  public respuesta?: string;

  @Output() finalizado = new EventEmitter<boolean>();
  @Input() turno?: Turno;

  constructor(private db: BaseDeDatosService){
    this.formularioRegistro = new FormGroup({
      altura: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(40), Validators.max(240)]),
      peso: new FormControl("", [Validators.required, Validators.pattern("^^[0-9]+(\.[0-9]+)?$"), Validators.min(1), Validators.max(500)]),
      temperatura: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]+)?$"), Validators.min(32), Validators.max(50)]),
      presionMin: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]+)?$"), Validators.min(5), Validators.max(25)]),
      presionMax: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]+)?$"), Validators.min(5), Validators.max(25)]),
      clave1: new FormControl(""),
      clave2: new FormControl(""),
      clave3: new FormControl(""),
      valor1: new FormControl(""),
      valor2: new FormControl(""),
      valor3: new FormControl(""),
    });
  }

  finalizarRegistro(){
    this.finalizado.emit(true);
  }

  generarHistoriaClinica(){
    if(this.turno){
      const datos = this.formularioRegistro.value;
      let claveValor1: DatoVariable = {
        clave: datos.clave1,
        valor: datos.valor1
      }
      let claveValor2: DatoVariable = {
        clave: datos.clave2,
        valor: datos.valor2
      }
      let claveValor3: DatoVariable = {
        clave: datos.clave3,
        valor: datos.valor3
      }
      let historiaNueva: HistoriaClinica ={
        altura: datos.altura,
        peso :datos.peso,
        temperatura :datos.temperatura,
        presionMin :datos.presionMin,
        presionMax :datos.presionMax,
        dato1 :claveValor1,
        dato2 :claveValor2,
        dato3 :claveValor3,
      };

      this.generando = true;
      this.db.agregarHistoriaClinica(this.turno, historiaNueva)
      .then(x=>{
        this.respuesta = "Se genero la nueva historia clinica";
        this.generando = false;
      })
      
    }
  }

  formatearNumeros(control: any){
    const value = control.value || '';
    control.setValue(value.replace(/[^\d.]/g, ''));
  }
}
