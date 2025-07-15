import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderAddressDetailsComponent} from './order-address-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {getMockOrderDetails} from '../order-details/order-details.component.spec';
import {ErrorService} from '../../../../../services/error/error.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {StoreAPIService} from '../../../../../api/public';

describe('OrderAddressDetailsComponent', () => {
  let component: OrderAddressDetailsComponent;
  let fixture: ComponentFixture<OrderAddressDetailsComponent>;
  let storeAPIService: jasmine.SpyObj<StoreAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const storeAPISpy = jasmine.createSpyObj('storeAPI', ['findAll']);

    await TestBed.configureTestingModule({
      imports: [OrderAddressDetailsComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: StoreAPIService, useValue: storeAPISpy},
      ],
    }).compileComponents();

    storeAPIService = TestBed.inject(StoreAPIService) as jasmine.SpyObj<StoreAPIService>;
    storeAPIService.findAll.and.returnValue(of());

    fixture = TestBed.createComponent(OrderAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("address", "myAddress");
    fixture.componentRef.setInput("orderDetails", getMockOrderDetails());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
