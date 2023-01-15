import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConversorComponent } from './conversor/conversor.component';
import { SelecionadorMoedaComponent } from './conversor/selecionador-moeda/selecionador-moeda.component';
import { MiniConversorComponent } from './conversor/mini-conversor/mini-conversor.component';

@NgModule({
  declarations: [AppComponent, ConversorComponent, SelecionadorMoedaComponent, MiniConversorComponent],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
