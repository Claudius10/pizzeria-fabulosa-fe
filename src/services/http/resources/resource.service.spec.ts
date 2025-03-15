import {TestBed} from '@angular/core/testing';

import {ResourceService} from './resource.service';
import {ResourcesHttpService} from './resources-http.service';
import {QueryOnDemand, QueryResult} from '../../../interfaces/query';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('ResourceServiceTests', () => {
  let service: ResourceService;

  beforeEach(() => {
    const resourceHttpServiceSpy = jasmine.createSpyObj('ResourceHttpService', [
      'findProducts',
      'findOffers',
      'findStores'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ResourceService,
        {provide: ResourcesHttpService, useValue: resourceHttpServiceSpy},
        QueryClient,
      ]
    });

    service = TestBed.inject(ResourceService);
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

  it('givenFindStoresOnDemand_thenReturnQueryOnDemand', () => {
    TestBed.runInInjectionContext(() => {
      const queryOnDemand: QueryOnDemand = service.findStoresOnDemand({queryKey: [""]});

      expect(queryOnDemand.status()).toEqual("pending");
    });
  });
});
