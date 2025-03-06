import {TestBed} from '@angular/core/testing';

import {OrderService} from './order.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {OrderHttpService} from './order-http.service';
import {MutationResult} from '../../../interfaces/mutation';
import {QueryResult} from '../../../interfaces/query';

describe('OrderServiceTests', () => {
  let service: OrderService;
  let orderHttpService: jasmine.SpyObj<OrderHttpService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: OrderHttpService, useValue: orderHttpService},
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(OrderService);
    orderHttpService = jasmine.createSpyObj('orderHttpService', [
      'createUserOrder',
      'createAnonOrder',
      'findOrderSummaryList',
      'findUserOrder',
      'deleteUserOrder'
    ]);
  });

  it('givenCreateUserOrder_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.createUserOrder();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });

  it('givenCreateAnonOrder_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.createAnonOrder();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });

  it('givenFindOrderSummaryList_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const queryResult: QueryResult = service.findOrderSummaryList("1");
      expect(queryResult.status()).toEqual("pending");
    });
  });

  it('givenFindUserOrder_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const queryResult: QueryResult = service.findUserOrder({queryKey: ["key"], id: "1", userId: "1"});
      expect(queryResult.status()).toEqual("pending");
    });
  });

  it('givenDeleteUserOrder_thenReturnMutationResult', () => {
    TestBed.runInInjectionContext(() => {
      const mutationResult: MutationResult = service.deleteUserOrder();
      mutationResult.mutate({payload: {}});
      expect(mutationResult.isPending()).toEqual(false);
    });
  });

  it('givenSetPageSize_thenGimmeDaCoveraje', () => {
    service.setPageSize(1);
    const pageSize = service.getPageSize();
    expect(pageSize()).toEqual(1);
  });

  it('givenSetPageNumber_thenGimmeDaCoveraje', () => {
    service.setPageNumber(1);
    const pageNumber = service.getPageNumber();
    expect(pageNumber()).toEqual(1);
  });
});
