import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderAddressDetailsComponent} from './order-address-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {getMockOrderDetails} from '../order-details/order-details.component.spec';
import {getMockedAddress} from '../../../profile/user-address/user-address-item/user-address-item.component.spec';
import {buildResponse} from '../../../../../utils/test-utils';
import {ErrorService} from '../../../../../services/error/error.service';
import {ResourcesHttpService} from '../../../../../services/http/resources/resources-http.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('OrderAddressDetailsComponent', () => {
  let component: OrderAddressDetailsComponent;
  let fixture: ComponentFixture<OrderAddressDetailsComponent>;
  let resourceService: jasmine.SpyObj<ResourcesHttpService>;

  beforeEach(async () => {
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findStoresOnDemand', 'findStores']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);

    await TestBed.configureTestingModule({
      imports: [OrderAddressDetailsComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ResourcesHttpService, useValue: resourceServiceSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
      ],
    }).compileComponents();

    resourceService = TestBed.inject(ResourcesHttpService) as jasmine.SpyObj<ResourcesHttpService>;
    resourceService.findStores.and.returnValue(of(buildResponse(null, false, 200, 'OK')));

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
