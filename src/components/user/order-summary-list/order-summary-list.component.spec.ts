import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderSummaryListComponent} from './order-summary-list.component';
import {OrderService} from '../../../services/order/order.service';

describe('OrderListComponent', () => {
  let component: OrderSummaryListComponent;
  let fixture: ComponentFixture<OrderSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryListComponent],
      providers: [OrderService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
