import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import conversionsJSON from './../../assets/conversions.json';
import { map, Observable, of, forkJoin, tap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  private readonly API: string = 'https://economia.awesomeapi.com.br';

  private conversions: { [key: string]: string } = conversionsJSON;
  constructor(private http: HttpClient) {}

  private moedasCache: { [key: string]: {} } = {};

  getConversao(moedaFrom: string, moedaTo: string): Observable<any> {
    if (moedaFrom === moedaTo) {
      return of({
        bid: 1,
      });
    }

    let nome = this.procurarNomeConversao(moedaFrom, moedaTo);

    if (!nome && moedaFrom !== 'USD' && moedaTo !== 'USD') {
      return this.getConversaoAproximada(moedaFrom, moedaTo);
    } else if (!nome) {
      return of([]); // nao existe conversao
    }

    if (this.moedasCache[nome] && Object.keys(this.moedasCache[nome]).length) {
      return of(this.moedasCache[nome]);
    }

    let requestUrl = `${this.API}/json/last/${nome}`;
    this.moedasCache[nome] = {};
    return this.http.get(requestUrl).pipe(
      map((res: any) => {
        let moedaKey = Object.keys(res)[0];
        this.moedasCache[nome] = res[moedaKey];
        return res[moedaKey];
      })
    );
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

  // A fórmula para calcular a taxa cruzada entre duas moedas é:

  // Taxa cruzada = (Taxa de câmbio A/B) x (Taxa de câmbio B/C)

  // onde A, B e C são as moedas envolvidas na conversão e "Taxa de câmbio A/B" é a taxa de
  //câmbio entre as moedas A e B, e "Taxa de câmbio B/C" é a taxa de câmbio entre as moedas B e C.

  // Por exemplo, se você quiser calcular a taxa cruzada entre o dólar americano (USD) e o
  //iene japonês (JPY) e você tem acesso as taxas de câmbio entre o dólar americano e o
  //euro (EUR) e entre o euro e o iene japonês, você pode calcular a taxa cruzada como:

  // Taxa cruzada USD/JPY = (Taxa de câmbio USD/EUR) x (Taxa de câmbio EUR/JPY)

  // É importante notar que a taxa cruzada não é necessariamente igual a taxa de câmbio direta
  //ou indireta entre as moedas A e C, dependendo das taxas de câmbio entre as moedas B e C, pode
  //haver uma diferença significativa.
  //Fonte: ChatGPT :)
  getConversaoAproximada(moedaFrom: string, moedaTo: string) {
    let taxaA = this.getConversao(moedaFrom, 'USD');
    let taxaB = this.getConversao(moedaTo, 'USD');

    return forkJoin([taxaA, taxaB]).pipe(
      map((r: any) => {
        let responseTaxaA = r[0];
        let responseTaxaB = r[1];
        let taxaCruzada = responseTaxaB.bid / responseTaxaA.bid;
        return { bid: taxaCruzada };
      })
    );
  }
}
