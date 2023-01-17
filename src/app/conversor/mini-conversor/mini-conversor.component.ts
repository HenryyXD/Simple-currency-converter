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
  private _moedaFrom = '';
  formControl = new FormControl('');
  moedasSelecionadas: { [key: string]: number }[] = [];
  buyPriceCache: { [key: string]: number }[] = [];
  moedas = moedasJson;
  objectkeys = Object.keys;

  @Input() moedaQtd: number | string = 0;

  @Input()
  set moedaFrom(moeda: string) {
    this._moedaFrom = moeda;
    this.buyPriceCache = [];
    if (this.formControl.value) {
      this.moedaSelecionadaChange(this.formControl);
    }
  }

  get moedaFrom(): string {
    return this._moedaFrom;
  }

  constructor(private conversorService: ConversorService) {}

  moedaSelecionadaChange({ value }: any) {
    this.moedasSelecionadas = [];
    value.forEach((moedaKey: string) => {
      let index = this.buyPriceCache.findIndex(
        (obj: { [key: string]: number }) =>
          Object.keys(obj).toString() === moedaKey
      );

      if (index !== -1) {
        this.moedasSelecionadas.push(this.buyPriceCache[index]);
        return;
      }

      let nextIndex = this.moedasSelecionadas.length;
      this.moedasSelecionadas[nextIndex] = { [moedaKey]: 0 };
      this.conversorService
        .getConversao(this.moedaFrom, moedaKey)
        .subscribe((res: any) => {
          this.buyPriceCache.push({ [moedaKey]: +res.bid });
          if(!this.moedasSelecionadas[nextIndex]) return;
          this.moedasSelecionadas[nextIndex] = { [moedaKey]: +res.bid };
        });
    });
  }
}
