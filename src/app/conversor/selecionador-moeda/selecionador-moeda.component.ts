import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import moedasJson from './../../../assets/currencies.json';

@Component({
  selector: 'selecionador-moeda',
  templateUrl: './selecionador-moeda.component.html',
  styleUrls: ['./selecionador-moeda.component.scss'],
})
export class SelecionadorMoedaComponent {
  objectkeys = Object.keys;
  private _moedaQtd: string | number = 0;
  moedas: { [key: string]: any } = moedasJson;
  @Input() moedaSelecionada = '';
  @Input() readonly: boolean = false;
  @Output() moedaSelecionadaChange = new EventEmitter<string>();
  @Output() moedaQtdChange = new EventEmitter<number>();

  @Input() get moedaQtd(): (number | string) {
    return this._moedaQtd;
  };

  set moedaQtd(value: string | number) {
    this._moedaQtd = +value.toString().replace(',', '.');
  }

  constructor() {}

  emitMoedaSelecionadaChange(moeda: MatSelectChange) {
    this.moedaSelecionadaChange.emit(moeda.toString());
  }

  emitMoedaQtdChange(moedaQtd: Event) {
    this.moedaQtdChange.emit(+(moedaQtd.target as HTMLInputElement).value);
  }
}
