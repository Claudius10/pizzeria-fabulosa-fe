import {OrderComponent} from './order.component';
import {MockBuilder, MockInstance, MockRender} from 'ng-mocks';
import {DestroyRef, signal} from '@angular/core';
import {getEmptyOrder, OrderService} from '../../../services/order/order.service';
import {AuthService} from '../../../services/auth/auth.service';
import {CartService} from '../../../services/cart/cart.service';
import {ActivatedRoute} from '@angular/router';
import {UserOrderQueryResult} from '../../../interfaces/query';
import {findDebugElement, findNativeElement} from '../../../utils/jasmine';
import {UserDetailsComponent} from '../user-details/user-details.component';

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
    MockInstance(OrderService, "getOrderToUpdateId", () => signal(null).asReadonly());
    MockInstance(AuthService, "getUserName", () => signal("tester"));
    MockInstance(AuthService, "getUserEmail", () => signal("email@gmail.com"));
    MockInstance(AuthService, "getUserContactNumber", () => signal("0"));

    // Act

    const orderComponentFixture = MockRender(OrderComponent);
    const orderComponent = orderComponentFixture.componentInstance;

    // Assert

    expect(orderComponent).toBeDefined();

    expect(orderComponent.orderId).toBe("1");
    expect(orderComponent.order.data()!.id).toBe(0);

    expect(orderComponent.userName()).toBe("tester");
    expect(orderComponent.userEmail()).toBe("email@gmail.com");
    expect(orderComponent.userContactNumber()).toBe("0");

    const userDetailsFixture = findDebugElement(orderComponentFixture, "userDetails");
    expect(userDetailsFixture).toBeDefined();

    const userDetailsComponent: UserDetailsComponent = userDetailsFixture!.componentInstance;
    expect(userDetailsComponent).toBeDefined();
    expect(userDetailsComponent.name).toBe("tester");
    expect(userDetailsComponent.email).toBe("email@gmail.com");
    expect(userDetailsComponent.contactNumber).toBe("0");

    const updateButton = findNativeElement(orderComponentFixture, "updateButton") as HTMLButtonElement;
    expect(updateButton.textContent).toEqual("Actualizar pedido");

    const cancelUpdateButton = findNativeElement(orderComponentFixture, "cancelUpdateButton") as HTMLButtonElement;
    expect(cancelUpdateButton).toBeNull();
  });
});
