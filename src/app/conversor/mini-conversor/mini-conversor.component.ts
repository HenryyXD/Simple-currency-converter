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

  @Input()
  set moedaFrom(moeda: string) {
    this._moedaFrom = moeda;
    this.buyPriceCache = [];
    console.log(this.formControl);
  }

  get moedaFrom(): string {
    return this._moedaFrom;
  }

  moedas = moedasJson;
  objectkeys = Object.keys;

  constructor(private conversorService: ConversorService) {}

  moedaSelecionadaChange({ value }: any) {
    console.log(JSON.stringify(value));
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

      this.conversorService.getConversao(this.moedaFrom, moedaKey)
        .subscribe((res: any) => {
          this.buyPriceCache.push({ [moedaKey]: +res.bid });
          this.moedasSelecionadas[nextIndex] = { [moedaKey]: res.bid };
        });

      this.moedasSelecionadas[nextIndex] = { [moedaKey]: 1 };
    });
  }
}
