import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspecialidadesComponent } from './lista-especialidades.component';

describe('ListaEspecialidadesComponent', () => {
  let component: ListaEspecialidadesComponent;
  let fixture: ComponentFixture<ListaEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEspecialidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
