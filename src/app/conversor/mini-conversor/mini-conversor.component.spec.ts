import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniConversorComponent } from './mini-conversor.component';

describe('MiniConversorComponent', () => {
  let component: MiniConversorComponent;
  let fixture: ComponentFixture<MiniConversorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniConversorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniConversorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
