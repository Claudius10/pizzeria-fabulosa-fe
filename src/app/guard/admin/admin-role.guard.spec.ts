import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { adminRoleGuard } from './admin-role.guard';

describe('adminRoleGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
