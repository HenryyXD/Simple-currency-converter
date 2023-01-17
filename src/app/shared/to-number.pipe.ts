import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: number | string): number {
    value = +value.toString().replace(',', '.');
    return value;
  }
}
