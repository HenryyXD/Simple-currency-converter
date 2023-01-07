import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, first, catchError, of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  private readonly API: string = 'https://economia.awesomeapi.com.br';

  constructor(private http: HttpClient) {}

  getConversao(moedaFrom: string, moedaTo: string) {
    let requestUrl = `${this.API}/json/last/${moedaFrom}-${moedaTo}`;
    return this.http.get(requestUrl);
  }
}
