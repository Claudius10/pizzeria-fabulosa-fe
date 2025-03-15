import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderAddressDetailsComponent} from './order-address-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {getMockOrderDetails} from '../order-details/order-details.component.spec';
import {getMockedAddress} from '../../../profile/user-address/user-address-item/user-address-item.component.spec';
import {ResourceService} from '../../../../../services/http/resources/resource.service';
import {buildQueryResult} from '../../../../../utils/test-utils';
import {ErrorService} from '../../../../../services/error/error.service';

describe('OrderAddressDetailsComponent', () => {
  let component: OrderAddressDetailsComponent;
  let fixture: ComponentFixture<OrderAddressDetailsComponent>;
  let resourceService: jasmine.SpyObj<ResourceService>;

  beforeEach(async () => {
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findStoresOnDemand', 'findStores']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);

    await TestBed.configureTestingModule({
      imports: [OrderAddressDetailsComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ResourceService, useValue: resourceServiceSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
      ],
    }).compileComponents();

    resourceService = TestBed.inject(ResourceService) as jasmine.SpyObj<ResourceService>;
    resourceService.findStores.and.returnValue(buildQueryResult());

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
