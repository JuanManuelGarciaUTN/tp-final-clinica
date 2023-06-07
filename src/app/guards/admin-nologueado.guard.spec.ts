import { TestBed } from '@angular/core/testing';

import { AdminNologueadoGuard } from './admin-nologueado.guard';

describe('AdminNologueadoGuard', () => {
  let guard: AdminNologueadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminNologueadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
