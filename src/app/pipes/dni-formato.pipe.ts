import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dniFormato'
})
export class DniFormatoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    let dni = value.split('');
    let resultado = [];

    for( let i = 0; i <= dni.length; i++ ) {
      if(i!= 0 && i%3 == 0){
        resultado.unshift(" . ");
      }
      resultado.unshift(dni[dni.length-1-i]);
    }
    return resultado.join('');
  }
}
