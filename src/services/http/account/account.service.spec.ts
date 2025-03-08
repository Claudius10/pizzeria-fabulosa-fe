import {TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';
import {MutationResult} from '../../../interfaces/mutation';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {AccountHttpService} from './account-http.service';

describe('AccountServiceTests', () => {
  let service: AccountService;

  beforeEach(() => {
    const accountHttpServiceSpy = jasmine.createSpyObj('AccountHttpService', ['login', 'logout', 'create', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        AccountService,
        {provide: AccountHttpService, useValue: accountHttpServiceSpy},
        QueryClient,
      ]
    });

    service = TestBed.inject(AccountService);
  });

  it('givenLogin_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.login();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });

  it('givenLogout_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.logout();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });

  it('givenCreate_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.create();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });

  it('givenDelete_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.delete();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });
});
