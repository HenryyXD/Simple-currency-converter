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

  moedaResult: number = 0;
  doConvesaoWasCalled = false;

  constructor(private conversorService: ConversorService) {
    setTimeout(() => {
      this.doConversao();
    }, 100);
  }

  doConversao() {
    if(this.doConvesaoWasCalled) return;
    this.doConvesaoWasCalled = true;
    if (
      this.readComponent.moedaSelecionada ===
      this.resultComponent.moedaSelecionada
    ) {
      this.moedaResult = this.readComponent.moedaQtd;
      return;
    }

    this.conversorService
      .getConversao(
        this.readComponent.moedaSelecionada,
        this.resultComponent.moedaSelecionada
      )
      .subscribe((r: any) => {
        let result = r[Object.keys(r)[0]].bid;
        this.moedaResult = result;
      });
    this.doConvesaoWasCalled = false;
  }
}
