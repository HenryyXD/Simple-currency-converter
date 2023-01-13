import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { ConversorService } from '../conversor.service';
import moedasJson from './../../../assets/currencies.json';


@Component({
  selector: 'selecionador-moeda',
  templateUrl: './selecionador-moeda.component.html',
  styleUrls: ['./selecionador-moeda.component.scss'],
})
export class SelecionadorMoedaComponent {
  moedas: { [key: string]: any } = moedasJson;
  @Input() moedaSelecionada = '';
  @Input() moedaQtd: number = 0;
  @Input() readonly: boolean = false;
  @Output() moedaSelecionadaChange = new EventEmitter<string>();
  @Output() moedaQtdChange = new EventEmitter<number>();

  objectkeys = Object.keys;

  constructor(private conversorService: ConversorService) {

  }

  emitMoedaSelecionadaChange(moeda: MatSelectChange) {
    this.moedaSelecionadaChange.emit(moeda.toString());
  }

  emitMoedaQtdChange(moedaQtd: Event) {
    this.moedaQtdChange.emit(+(moedaQtd.target as HTMLInputElement).value);
  }
}
