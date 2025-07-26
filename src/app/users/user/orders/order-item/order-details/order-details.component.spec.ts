import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsComponent} from './order-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {OrderDetailsDTO} from '../../../../../../api/business';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("orderDetails", getMockOrderDetails());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

export const getMockOrderDetails = (): OrderDetailsDTO => {
  return {
    comment: "",
    changeToGive: 0,
    billToChange: 0,
    deliveryTime: "ASAP",
    paymentMethod: "Card",
    storePickUp: false
  };
};
