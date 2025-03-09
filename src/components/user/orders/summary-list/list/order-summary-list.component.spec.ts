import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderSummaryListComponent} from './order-summary-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {OrderService} from '../../../../../services/http/order/order.service';
import {buildQueryResult} from '../../../../../utils/test-utils';
import {signal} from '@angular/core';

describe('OrderListComponent', () => {
  let component: OrderSummaryListComponent;
  let fixture: ComponentFixture<OrderSummaryListComponent>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', [
      'getPageNumber',
      'getPageSize',
      'findOrderSummaryList',
      'resetSummaryListArgs']
    );

    await TestBed.configureTestingModule({
      imports: [OrderSummaryListComponent, TranslateModule.forRoot()],
      providers:
        [
          {provide: ErrorService, useValue: errorServiceSpy},
          {provide: OrderService, useValue: orderServiceSpy},
        ]
    })
      .compileComponents();

    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    orderService.findOrderSummaryList.and.returnValue(buildQueryResult());
    orderService.getPageNumber.and.returnValue(signal(1));
    orderService.getPageSize.and.returnValue(signal(5));

    fixture = TestBed.createComponent(OrderSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
