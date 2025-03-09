import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderSummaryComponent} from './order-summary.component';
import {TranslateModule} from '@ngx-translate/core';
import {CartSummaryDTO, OrderSummaryDTO} from '../../../../../interfaces/dto/order';
import {getMockOrderDetails} from '../../order-item/order-details/order-details.component.spec';
import {provideRouter} from '@angular/router';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{path: '**', component: OrderSummaryComponent}])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    const orderSummary: OrderSummaryDTO = {
      formattedUpdatedOn: "",
      formattedCreatedOn: "",
      orderDetails: getMockOrderDetails(),
      cart: getMockCartSummaryDTO(),
      id: "1"
    };
    fixture.componentRef.setInput("orderSummary", orderSummary);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

export const getMockCartSummaryDTO = (): CartSummaryDTO => {
  return {
    totalCost: 0,
    totalCostOffers: 0,
    totalQuantity: 0
  };
};
