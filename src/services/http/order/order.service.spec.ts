import {TestBed} from '@angular/core/testing';

import {OrderService} from './order.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {MutationResult} from '../../../interfaces/mutation';
import {QueryResult} from '../../../interfaces/query';
import {OrderHttpService} from './order-http.service';

describe('OrderServiceTests', () => {
  let service: OrderService;

  beforeEach(() => {
    const orderHttpServiceSpy = jasmine.createSpyObj('OrderHttpService', [
      'findUserOrder',
      'createUserOrder',
      'createAnonOrder',
      'findOrderSummaryList',
      'deleteUserOrder'
    ]);

    TestBed.configureTestingModule({
      providers: [
        OrderService,
        {provide: OrderHttpService, useValue: orderHttpServiceSpy},
        QueryClient,
      ]
    });

    service = TestBed.inject(OrderService);
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

  it('givenFindOrderSummaryList_thenReturnQueryResult', () => {
    TestBed.runInInjectionContext(() => {
      const queryResult: QueryResult = service.findOrderSummaryList("1");
      expect(queryResult.status()).toEqual("pending");
    });
  });

  it('givenFindUserOrder_thenReturnQueryResult', () => {
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

  it('givenSetPageSize_thenReturnCorrectPageSize', () => {
    service.setPageSize(1);
    const pageSize = service.getPageSize();
    expect(pageSize()).toEqual(1);
  });

  it('givenSetPageNumber_thenReturnCorrectPageNumber', () => {
    service.setPageNumber(1);
    const pageNumber = service.getPageNumber();
    expect(pageNumber()).toEqual(1);
  });

  it('givenResetArgs_thenResetArgsToDefaults', () => {

    // Arrange

    service.setPageSize(10);
    service.setPageNumber(10);

    const pageSize = service.getPageSize();
    const pageNumber = service.getPageNumber();
    expect(pageSize()).toEqual(10);
    expect(pageNumber()).toEqual(10);

    // Act

    service.resetSummaryListArgs();

    // Assert

    expect(pageSize()).toEqual(5);
    expect(pageNumber()).toEqual(1);
  });
});
