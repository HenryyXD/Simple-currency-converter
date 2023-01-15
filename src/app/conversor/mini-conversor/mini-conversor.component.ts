import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ConversorService } from '../conversor.service';
import moedasJson from './../../../assets/currencies.json';

@Component({
  selector: 'mini-conversor',
  templateUrl: './mini-conversor.component.html',
  styleUrls: ['./mini-conversor.component.scss'],
})
export class MiniConversorComponent {
  formControl = new FormControl('');
  moedasSelecionadas: string[] = [];
  @Input() moedaFrom: string = 'USD';
  moedas = moedasJson;
  objectkeys = Object.keys;

  constructor(private conversorService: ConversorService) {
  }


  moedaSelecionadaChange({ value }: any) {
    this.moedasSelecionadas = value;
  }
}
