import {TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AccountHttpService} from './account-http.service';
import {MutationResult} from '../../../interfaces/mutation';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('AccountServiceTests', () => {
  let service: AccountService;
  let accountHttpService: jasmine.SpyObj<AccountHttpService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AccountHttpService, useValue: accountHttpService},
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AccountService);
    accountHttpService = jasmine.createSpyObj('accountHttpService', ['login', 'logout', 'create', 'delete']);
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
      // accountHttpService.login.and.returnValue(of(buildResponse(null, false, 200, "OK")));
      // accountHttpService.login.and.callFake(accountHttpService['login'])
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
