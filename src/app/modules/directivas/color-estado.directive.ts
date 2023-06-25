import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Estado } from 'src/app/interfaces/turno';

@Directive({
  selector: '[colorEstado]',
})
export class ColorEstadoDirective implements OnChanges {
  
  @Input('colorEstado') estado?: number;
  
  constructor(private elementRef: ElementRef) {}

  ngOnChanges(cambios: SimpleChanges) {
    if(cambios['estado']){

      switch(this.estado){
        case Estado.pendiente:
          this.elementRef.nativeElement.style.color = 'black';
          break;

        case Estado.aceptado:
          this.elementRef.nativeElement.style.color = 'blue';
          break;

        case Estado.canceladoPaciente:
        case Estado.canceladoEspecialista:
        case Estado.canceladoAdmin:
        case Estado.rechazado:
          this.elementRef.nativeElement.style.color = 'red';
          break;

        case Estado.realizado:
          this.elementRef.nativeElement.style.color = 'green';
          break;

        default:
          this.elementRef.nativeElement.style.color = 'black';
          break;
      }
    }
  }
}
