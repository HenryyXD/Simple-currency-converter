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
  buyPrice: number = 0;

  constructor(private conversorService: ConversorService) {
    setTimeout(() => {
      this.getConversaoAndSetToBuyPrice();
    }, 100);
  }

  doConversao() {
    this.resultInputValue = this.multiplicaBuyPricePorMoedaQtd();
  }

  ehConversaoDaMesmaMoeda() {
    return (
      this.readComponent.moedaSelecionada ===
      this.resultComponent.moedaSelecionada
    );
  }

  igualarValoresDosInputs() {
    this.resultInputValue = this.readComponent.moedaQtd;
  }

  getConversaoAndSetToBuyPrice() {
    if (this.ehConversaoDaMesmaMoeda()) {
      this.buyPrice = 1;
      this.doConversao();
      return;
    }

    this.conversorService.getConversao(
      this.readComponent.moedaSelecionada,
      this.resultComponent.moedaSelecionada
    ).subscribe((r: any) => {
      let attrNomeConversao = Object.keys(r)[0];
      this.buyPrice = r[attrNomeConversao].bid;
      this.resultInputValue = this.multiplicaBuyPricePorMoedaQtd(); // nao era pra estar aqui (funcao faz 2 coisas ta errado)
    });
  }

  multiplicaBuyPricePorMoedaQtd() {
    return this.buyPrice * +this.readComponent.moedaQtd;
  }
}
