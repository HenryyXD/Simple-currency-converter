import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, first, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly API: string = '/assets/currencies.json';

  constructor(private http: HttpClient) { }

  getMoedas() {
    return this.http.get(this.API).pipe(

    );
  }
}
