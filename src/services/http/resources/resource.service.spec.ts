import {TestBed} from '@angular/core/testing';

import {ResourceService} from './resource.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ResourcesHttpService} from './resources-http.service';
import {QueryResult} from '../../../interfaces/query';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('ResourceServiceTests', () => {
  let service: ResourceService;
  let resourceHttpService: jasmine.SpyObj<ResourcesHttpService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QueryClient,
        {provideHttpClient: ResourcesHttpService, useValue: resourceHttpService},
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ResourceService);
    resourceHttpService = jasmine.createSpyObj('resourceHttpService', [
      'findProducts',
      'findOffers',
      'findStores'
    ]);
  });

  it('givenFindProducts_thenReturnQueryResult', () => {
    TestBed.runInInjectionContext(() => {
      const queryResult: QueryResult = service.findProducts({queryKey: [""]});
      expect(queryResult.status()).toEqual("pending");
    });
  });

  it('givenFindOffers_thenReturnQueryResult', () => {
    TestBed.runInInjectionContext(() => {
      const queryResult: QueryResult = service.findOffers({queryKey: [""]});
      expect(queryResult.status()).toEqual("pending");
    });
  });

  it('givenFindStores_thenReturnQueryResult', () => {
    TestBed.runInInjectionContext(() => {
      const queryResult: QueryResult = service.findStores({queryKey: [""]});
      expect(queryResult.status()).toEqual("pending");
    });
  });
});
