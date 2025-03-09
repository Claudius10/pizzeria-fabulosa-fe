import {OrderComponent} from './order.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ErrorService} from '../../../../services/error/error.service';
import {OrderService} from '../../../../services/http/order/order.service';
import {buildQueryResult} from '../../../../utils/test-utils';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['findUserOrder', 'deleteUserOrder']);

    await TestBed.configureTestingModule({
      imports: [OrderComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: ConfirmationService, useValue: confirmationServiceSpy},
        {provide: MessageService, useValue: messageSpy},
        {provide: OrderService, useValue: orderServiceSpy},
        provideRouter([{path: '**', component: OrderComponent}])
      ]
    })
      .compileComponents();

    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    orderService.findUserOrder.and.returnValue(buildQueryResult());

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
