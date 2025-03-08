import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {QueryResult} from '../../../interfaces/query';
import {MutationResult} from '../../../interfaces/mutation';
import {UserHttpService} from './user-http.service';

describe('UserServiceTests', () => {
  let service: UserService;

  beforeEach(() => {
    const userHttpServiceSpy = jasmine.createSpyObj('UserHttpService', ['createUserAddress', 'deleteUserAddress']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: UserHttpService, useValue: userHttpServiceSpy},
        QueryClient,
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
