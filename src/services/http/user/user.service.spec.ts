import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {QueryResult} from '../../../interfaces/query';
import {MutationResult} from '../../../interfaces/mutation';
import {UserHttpService} from './user-http.service';

describe('UserServiceTests', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UserHttpService,
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UserService);
  });

  it('givenFindUserAddressList_thenReturnQueryResult', () => {
    TestBed.runInInjectionContext(() => {
      const queryResult: QueryResult = service.findUserAddressList({queryKey: [""], id: "1"});
      expect(queryResult.status()).toEqual("pending");
    });
  });

  it('givenCreateUserAddress_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.createUserAddress();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });

  it('givenDeleteUserAddress_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.deleteUserAddress();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });
});
