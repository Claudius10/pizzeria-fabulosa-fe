import {OrderComponent} from './order.component';
import {MockBuilder, MockedComponentFixture, MockInstance, MockRender} from 'ng-mocks';
import {DebugElement, DestroyRef, signal} from '@angular/core';
import {getEmptyOrder, OrderService} from '../../../services/order/order.service';
import {AuthService} from '../../../services/auth/auth.service';
import {CartService} from '../../../services/cart/cart.service';
import {ActivatedRoute} from '@angular/router';
import {UserOrderQueryResult} from '../../../interfaces/query';
import {findDebugElement, findNativeElement} from '../../../utils/jasmine';
import {UserDetailsComponent} from '../user-details/user-details.component';

describe('OrderComponent', () => {
  let orderComponentFixture: MockedComponentFixture<OrderComponent, OrderComponent>;
  let orderComponent: OrderComponent;
  let userDetailsFixture: DebugElement | null;
  let userDetailsComponent: UserDetailsComponent;

  MockInstance.scope();

  beforeEach(() => {
      return MockBuilder(OrderComponent)
        .exclude(DestroyRef)
        .mock(OrderService)
        .mock(AuthService)
        .mock(CartService)
        .mock(ActivatedRoute);
    }
  );

  beforeEach(() => {
      // Arrange
      MockInstance(ActivatedRoute, "snapshot", jasmine.createSpy(), "get").and.returnValue({paramMap: new Map([["orderId", "1"]])});
      MockInstance(AuthService, "getUserId", () => "0");
      MockInstance(AuthService, "getUserName", () => signal("tester"));
      MockInstance(AuthService, "getUserEmail", () => signal("email@gmail.com"));
      MockInstance(AuthService, "getUserContactNumber", () => signal("0"));
    }
  );

  it('givenSetup_whenMockedProperties_thenCreateComponent', () => {

    // Arrange

    MockInstance(OrderService, "findUserOrder", () => queryResult);
    MockInstance(OrderService, "getOrderToUpdateId", () => signal(null));

    // Act

    orderComponentFixture = MockRender(OrderComponent);
    orderComponent = orderComponentFixture.componentInstance;
    expect(orderComponent).toBeDefined();

    userDetailsFixture = findDebugElement(orderComponentFixture, "userDetails");
    expect(userDetailsFixture).toBeDefined();
    userDetailsComponent = userDetailsFixture!.componentInstance;
    expect(userDetailsComponent).toBeDefined();

    // Assert

    expect(orderComponent.orderId).toBe("1");
    expect(orderComponent.order.data()!.id).toBe(0);
    expect(orderComponent.order.isSuccess).toBeTrue();
    expect(orderComponent.orderToUpdateId()).toBe(null);

    expect(orderComponent.userName()).toBe("tester");
    expect(orderComponent.userEmail()).toBe("email@gmail.com");
    expect(orderComponent.userContactNumber()).toBe("0");

    expect(userDetailsFixture).toBeDefined();
    expect(userDetailsComponent.name).toBe("tester");
    expect(userDetailsComponent.email).toBe("email@gmail.com");
    expect(userDetailsComponent.contactNumber).toBe("0");

    const updateButton = findNativeElement(orderComponentFixture, "updateButton") as HTMLButtonElement;
    expect(updateButton.textContent).toEqual("Actualizar pedido");

    const cancelUpdateButton = findNativeElement(orderComponentFixture, "cancelUpdateButton") as HTMLButtonElement;
    expect(cancelUpdateButton).toBeNull();
  });

  it('givenNonNullOrderToUpdateId_thenRenderUserCheckoutFormAndCancelButton', () => {

    // Arrange

    MockInstance(OrderService, (instance) => {
      instance.findUserOrder = () => queryResult;
      instance.getOrderToUpdateId = () => signal("0");
    });

    // Act

    orderComponentFixture = MockRender(OrderComponent);
    orderComponent = orderComponentFixture.componentInstance;
    expect(orderComponent).toBeDefined();

    userDetailsFixture = findDebugElement(orderComponentFixture, "userDetails");
    expect(userDetailsFixture).toBeDefined();
    userDetailsComponent = userDetailsFixture!.componentInstance;
    expect(userDetailsComponent).toBeDefined();

    // Assert

    const updateButton = findNativeElement(orderComponentFixture, "cancelUpdateButton") as HTMLButtonElement;
    expect(updateButton.textContent).toEqual("Cancelar actualización");

    const userCheckoutFormFixture = findDebugElement(orderComponentFixture, "userCheckOutForm");
    expect(userCheckoutFormFixture).toBeDefined();
    expect(userCheckoutFormFixture!.componentInstance).toBeDefined();
  });
});

const queryResult: UserOrderQueryResult = {
  data: signal(getEmptyOrder()),
  isLoading: signal<boolean>(false),
  isSuccess: true,
  isError: false,
  error: signal<Error | null>(null)
};
