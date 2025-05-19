import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderAddressDetailsComponent} from './order-address-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {getMockOrderDetails} from '../order-details/order-details.component.spec';
import {getMockedAddress} from '../../../profile/user-address/user-address-item/user-address-item.component.spec';
import {ErrorService} from '../../../../../services/error/error.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {ResourcesAPIService} from '../../../../../api';

describe('OrderAddressDetailsComponent', () => {
  let component: OrderAddressDetailsComponent;
  let fixture: ComponentFixture<OrderAddressDetailsComponent>;
  let resourceService: jasmine.SpyObj<ResourcesAPIService>;

  beforeEach(async () => {
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findAllStores']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);

    await TestBed.configureTestingModule({
      imports: [OrderAddressDetailsComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ResourcesAPIService, useValue: resourceServiceSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
      ],
    }).compileComponents();

    resourceService = TestBed.inject(ResourcesAPIService) as jasmine.SpyObj<ResourcesAPIService>;
    resourceService.findAllStores.and.returnValue(of());

    fixture = TestBed.createComponent(OrderAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("address", getMockedAddress());
    fixture.componentRef.setInput("orderDetails", getMockOrderDetails());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
