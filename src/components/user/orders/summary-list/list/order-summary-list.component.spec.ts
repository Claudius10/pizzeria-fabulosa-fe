import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderSummaryListComponent} from './order-summary-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {of} from 'rxjs';
import {provideRouter} from '@angular/router';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {UserOrdersAPIService} from '../../../../../api/business';

describe('OrderSummaryListComponent', () => {
  let component: OrderSummaryListComponent;
  let fixture: ComponentFixture<OrderSummaryListComponent>;
  let userOrdersAPI: jasmine.SpyObj<UserOrdersAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userOrdersAPISpy = jasmine.createSpyObj('UserOrdersAPIService', ['findSummary']
    );

    await TestBed.configureTestingModule({
      imports: [OrderSummaryListComponent, TranslateModule.forRoot()],
      providers:
        [
          {provide: QueryClient},
          provideRouter([{path: '**', component: OrderSummaryListComponent}]),
          {provide: ErrorService, useValue: errorServiceSpy},
          {provide: UserOrdersAPIService, useValue: userOrdersAPISpy},
        ]
    })
      .compileComponents();

    userOrdersAPI = TestBed.inject(UserOrdersAPIService) as jasmine.SpyObj<UserOrdersAPIService>;
    userOrdersAPI.findSummary.and.returnValue(of());

    fixture = TestBed.createComponent(OrderSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
