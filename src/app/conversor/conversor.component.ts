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

  resultInputValue: number | string = 0;
  private _buyPrice: number = 0;
  moedasMiniConversor: string[] = ['BRL', 'USD'];

  constructor(private conversorService: ConversorService) {}

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
    this.resultInputValue = this.buyPrice * +this.readComponent.moedaQtd;
  }

  getConversaoAndSetToBuyPrice() {
    this.conversorService
      .getConversao(
        this.readComponent.moedaSelecionada,
        this.resultComponent.moedaSelecionada
      )
      .subscribe((r: any) => {
        this.buyPrice = r.bid;
      });
  }
}
