import {OrderComponent} from './order.component';
import {MockBuilder, MockInstance, MockRender} from 'ng-mocks';
import {DestroyRef, signal} from '@angular/core';
import {getEmptyOrder, OrderService} from '../../../services/order/order.service';
import {AuthService} from '../../../services/auth/auth.service';
import {CartService} from '../../../services/cart/cart.service';
import {ActivatedRoute} from '@angular/router';
import {UserOrderQueryResult} from '../../../interfaces/query';

describe('OrderComponent', () => {

  beforeEach(() => {
      return MockBuilder(OrderComponent)
        .exclude(DestroyRef)
        .mock(OrderService)
        .mock(AuthService)
        .mock(CartService)
        .mock(ActivatedRoute);
    }
  );

  it('givenSetup_whenMockedProperties_thenCreateComponent', () => {

    // Arrange

    const queryResult: UserOrderQueryResult = {
      data: signal(getEmptyOrder()),
      isLoading: signal<boolean>(false),
      isSuccess: true,
      isError: false,
      error: signal<Error | null>(null)
    };

    MockInstance(ActivatedRoute, "snapshot", jasmine.createSpy(), "get").and.returnValue({paramMap: new Map([["orderId", "1"]])});
    MockInstance(OrderService, "findUserOrder", () => queryResult);
    MockInstance(AuthService, "getUserId", () => "0");
    MockInstance(OrderService, "getOrderToUpdateId", () => signal("0").asReadonly());
    MockInstance(AuthService, "getUserName", () => signal("tester"));
    MockInstance(AuthService, "getUserEmail", () => signal("email@gmail.com"));
    MockInstance(AuthService, "getUserContactNumber", () => signal("0"));

    // Act

    const fixture = MockRender(OrderComponent);
    const component = fixture.componentInstance;

    // Assert

    expect(component).toBeDefined();
    expect(component.orderId).toBe("1");
    expect(component.order.data()!.id).toBe(0);
    expect(component.userName()).toBe("tester");
    expect(component.userEmail()).toBe("email@gmail.com");
    expect(component.userContactNumber()).toBe("0");
  });
});
