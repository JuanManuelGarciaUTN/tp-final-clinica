import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTurnosComponent } from './historial-turnos.component';

describe('HistorialTurnosComponent', () => {
  let component: HistorialTurnosComponent;
  let fixture: ComponentFixture<HistorialTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
