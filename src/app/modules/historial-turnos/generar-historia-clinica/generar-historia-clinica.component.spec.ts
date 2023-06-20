import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarHistoriaClinicaComponent } from './generar-historia-clinica.component';

describe('GenerarHistoriaClinicaComponent', () => {
  let component: GenerarHistoriaClinicaComponent;
  let fixture: ComponentFixture<GenerarHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarHistoriaClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
