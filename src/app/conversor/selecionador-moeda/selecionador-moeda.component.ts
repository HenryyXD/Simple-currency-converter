import { Component, Input } from '@angular/core';
import { ConversorService } from '../conversor.service';

@Component({
  selector: 'selecionador-moeda',
  templateUrl: './selecionador-moeda.component.html',
  styleUrls: ['./selecionador-moeda.component.scss'],
})
export class SelecionadorMoedaComponent {
  moedas$ = this.conversorService.getMoedas();
  moedas: { [key: string]: any } = {};
  @Input() moedaSelecionada = "";
  @Input() moedaQtd = '';

  objectkeys = Object.keys;

  constructor(private conversorService: ConversorService) {
    this.moedas$.subscribe((moedas) => (this.moedas = moedas));
  }
}
