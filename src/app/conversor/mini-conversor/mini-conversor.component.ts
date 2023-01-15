import { Component, Input } from '@angular/core';

@Component({
  selector: 'mini-conversor',
  templateUrl: './mini-conversor.component.html',
  styleUrls: ['./mini-conversor.component.scss']
})
export class MiniConversorComponent {
  @Input() moedaSelecionada: string = '';
}
