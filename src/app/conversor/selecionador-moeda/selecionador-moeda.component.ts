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
  @Output() moedaSelecionadaOnChange = new EventEmitter<string>();

  objectkeys = Object.keys;

  constructor(private conversorService: ConversorService) {

  }

  emitMoedaSelecionadaChange(moeda: MatSelectChange) {
    this.moedaSelecionadaOnChange.emit(moeda.toString());
  }
}
