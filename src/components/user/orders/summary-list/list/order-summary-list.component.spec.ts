import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderSummaryListComponent} from './order-summary-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {buildResponse} from '../../../../../utils/test-utils';
import {OrderHttpService} from '../../../../../services/http/order/order-http.service';
import {of} from 'rxjs';
import {provideRouter} from '@angular/router';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('OrderSummaryListComponent', () => {
  let component: OrderSummaryListComponent;
  let fixture: ComponentFixture<OrderSummaryListComponent>;
  let orderService: jasmine.SpyObj<OrderHttpService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['findOrderSummaryList']
    );

    await TestBed.configureTestingModule({
      imports: [OrderSummaryListComponent, TranslateModule.forRoot()],
      providers:
        [
          {provide: QueryClient},
          provideRouter([{path: '**', component: OrderSummaryListComponent}]),
          {provide: ErrorService, useValue: errorServiceSpy},
          {provide: OrderHttpService, useValue: orderServiceSpy},
        ]
    })
      .compileComponents();

    orderService = TestBed.inject(OrderHttpService) as jasmine.SpyObj<OrderHttpService>;
    orderService.findOrderSummaryList.and.returnValue(of(buildResponse(null, false, 200, 'OK')));

    fixture = TestBed.createComponent(OrderSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
