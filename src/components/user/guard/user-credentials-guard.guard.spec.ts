import {TestBed} from '@angular/core/testing';
import {CanMatchFn} from '@angular/router';

import {userCredentialsGuardGuard} from './user-credentials-guard.guard';

describe('userCredentialsGuardGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => userCredentialsGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
