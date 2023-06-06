import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dniFormato'
})
export class DniFormatoPipe implements PipeTransform {

  transform(value: string): string {
    const digitos = value.replace(/\D/g, '');

    const agruparCadaTres = digitos.match(/.{1,3}/g);

    return agruparCadaTres ? agruparCadaTres.join(' . ') : '';
  }

}
