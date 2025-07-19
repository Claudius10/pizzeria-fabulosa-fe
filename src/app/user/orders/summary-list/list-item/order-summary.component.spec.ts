import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderSummaryComponent} from './order-summary.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';
import {OrderSummaryDTO} from '../../../../../api/business';


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
      id: 1,
      cost: 10,
      formattedCreatedOn: "",
      costAfterOffers: 0,
      paymentMethod: "cash",
      quantity: 1
    };
    fixture.componentRef.setInput("orderSummary", orderSummary);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
