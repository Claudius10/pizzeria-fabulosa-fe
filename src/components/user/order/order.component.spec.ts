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
  let startUpdateButton: HTMLButtonElement;
  let cancelUpdateButton: HTMLButtonElement;

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
      MockInstance(ActivatedRoute, "snapshot", jasmine.createSpy(), "get").and.returnValue({paramMap: new Map([["orderId", "1"]])});
      MockInstance(AuthService, "getUserId", () => "0");
      MockInstance(AuthService, "getUserName", () => signal("tester"));
      MockInstance(AuthService, "getUserEmail", () => signal("email@gmail.com"));
      MockInstance(AuthService, "getUserContactNumber", () => signal("0"));
      MockInstance(CartService, (instance) => {
        instance.setOrderCart = jasmine.createSpy().and.callFake(() => {
        });
      });
      MockInstance(OrderService, (instance) => {
        instance.orderToUpdateId = signal<string | null>(null);
        instance.findUserOrder = jasmine.createSpy().and.returnValue(queryResult);
        instance.getOrderToUpdateId = jasmine.createSpy().and.returnValue(instance.orderToUpdateId);
        instance.setOrderToUpdateId = jasmine.createSpy().and.callFake((id: string) => {
          instance.orderToUpdateId.set(id);
        });
      });
    }
  );

  beforeEach(() => {
      orderComponentFixture = MockRender(OrderComponent);
      orderComponent = orderComponentFixture.componentInstance;
      expect(orderComponent).toBeDefined();

      userDetailsFixture = findDebugElement(orderComponentFixture, "userDetails");
      expect(userDetailsFixture).toBeDefined();
      userDetailsComponent = userDetailsFixture!.componentInstance;
      expect(userDetailsComponent).toBeDefined();

      startUpdateButton = findNativeElement(orderComponentFixture, "updateButton") as HTMLButtonElement;
      expect(startUpdateButton).toBeDefined();
      expect(startUpdateButton.textContent).toEqual("Actualizar pedido");

      cancelUpdateButton = findNativeElement(orderComponentFixture, "cancelUpdateButton") as HTMLButtonElement;
    }
  );

  it('givenSetup_whenMockedProperties_thenCreateComponent', () => {
    expect(orderComponent.orderId).toBe("1");
    expect(orderComponent.order.data()!.id).toBe(0);
    expect(orderComponent.order.isSuccess).toBeTrue();
    expect(orderComponent.orderToUpdateId()).toBe(null);

    expect(orderComponent.userName()).toBe("tester");
    expect(orderComponent.userEmail()).toBe("email@gmail.com");
    expect(orderComponent.userContactNumber()).toBe("0");

    expect(userDetailsComponent.name).toBe("tester");
    expect(userDetailsComponent.email).toBe("email@gmail.com");
    expect(userDetailsComponent.contactNumber).toBe("0");

    expect(cancelUpdateButton).toBeNull();
  });

  it('givenUpdateButtonClick_thenRenderUserCheckoutFormAndCancelButton', () => {

    // confirm the cancel button is not yet rendered due to orderToUpdateId being null
    expect(cancelUpdateButton).toBeNull();

    // confirm user checkout form is not rendered before click
    const userCheckoutFormFixture = findDebugElement(orderComponentFixture, "userCheckOutForm");
    expect(userCheckoutFormFixture).toBeNull();

    // Act

    startUpdateButton.click();
    orderComponentFixture.detectChanges();

    // Assert

    const cancelUpdateButtonAfterClick = findNativeElement(orderComponentFixture, "cancelUpdateButton") as HTMLButtonElement;
    expect(cancelUpdateButtonAfterClick).toBeDefined();
    expect(cancelUpdateButtonAfterClick.textContent).toEqual("Cancelar actualización");

    const userCheckoutFormFixtureAfterClick = findDebugElement(orderComponentFixture, "userCheckOutForm");
    expect(userCheckoutFormFixtureAfterClick).toBeDefined();
    expect(userCheckoutFormFixtureAfterClick!.componentInstance).toBeDefined();
  });
});


const queryResult: UserOrderQueryResult = {
  data: signal(getEmptyOrder()),
  isLoading: signal<boolean>(false),
  isSuccess: true,
  isError: false,
  error: signal<Error | null>(null)
};
