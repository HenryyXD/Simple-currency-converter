import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import conversionsJSON from './../../assets/conversions.json';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  private readonly API: string = 'https://economia.awesomeapi.com.br';

  private conversions: { [key: string]: string } = conversionsJSON;
  constructor(private http: HttpClient) {}

  getConversao(moedaFrom: string, moedaTo: string) {

    if (moedaFrom === moedaTo) {
      return of({
        bid: 1,
      });
    }

    let nome = this.procurarNomeConversao(moedaFrom, moedaTo);
    if (!nome) return of([]);

    let requestUrl = `${this.API}/json/last/${nome}`;
    return this.http
      .get(requestUrl)
      .pipe(map((res: any) => res[Object.keys(res)[0]]));
  }

  procurarNomeConversao(moedaFrom: string, moedaTo: string): string {
    let nome = '';
    let nameToSearch = `${moedaFrom}-${moedaTo}`;
    let nameToSearchReversed = `${moedaTo}-${moedaFrom}`;
    Object.keys(this.conversions).some((key: string) => {
      if (nameToSearch === key) {
        nome = nameToSearch;
      } else if (nameToSearchReversed === key) {
        nome = nameToSearchReversed;
      } else {
        return false;
      }
      return true;
    });
    return nome;
  }
}
