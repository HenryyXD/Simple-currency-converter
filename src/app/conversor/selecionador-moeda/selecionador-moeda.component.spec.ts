import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionadorMoedaComponent } from './selecionador-moeda.component';

describe('SelecionadorMoedaComponent', () => {
  let component: SelecionadorMoedaComponent;
  let fixture: ComponentFixture<SelecionadorMoedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionadorMoedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionadorMoedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
