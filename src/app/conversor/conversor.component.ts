import { Component, ViewChild } from '@angular/core';

import { ConversorService } from './conversor.service';
import { SelecionadorMoedaComponent } from './selecionador-moeda/selecionador-moeda.component';

@Component({
  selector: 'conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss'],
})
export class ConversorComponent {
  @ViewChild('readComponent') readComponent!: SelecionadorMoedaComponent;
  @ViewChild('resultComponent') resultComponent!: SelecionadorMoedaComponent;

  resultInputValue: number = 0;
  private _buyPrice: number = 0;
  moedasMiniConversor: string[] = ['BRL', 'USD'];

  constructor(private conversorService: ConversorService) {  }

  ngAfterViewInit() {
    this.getConversaoAndSetToBuyPrice();
  }

  get buyPrice() {
    return this._buyPrice;
  }

  set buyPrice(value: number) {
    this._buyPrice = value;
    this.calculateAndSetResultValue();
  }

  calculateAndSetResultValue() {
    this.resultInputValue = this.buyPrice * this.readComponent.moedaQtd;
  }

  getConversaoAndSetToBuyPrice() {
    if (this.readComponent.moedaSelecionada === this.resultComponent.moedaSelecionada) {
      this.buyPrice = 1;
      return;
    }

    this.conversorService
      .getConversao(
        this.readComponent.moedaSelecionada,
        this.resultComponent.moedaSelecionada
      )
      .subscribe((r: any) => {
        let attrNomeConversao = Object.keys(r)[0];
        this.buyPrice = r[attrNomeConversao].bid;
      });
  }

  addMiniConversor() {

  }
}
