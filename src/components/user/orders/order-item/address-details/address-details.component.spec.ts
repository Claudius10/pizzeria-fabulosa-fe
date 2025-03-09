import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressDetailsComponent} from './address-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {getMockOrderDetails} from '../order-details/order-details.component.spec';
import {getMockedAddress} from '../../../profile/user-address/user-address-item/user-address-item.component.spec';
import {ResourceService} from '../../../../../services/http/resources/resource.service';
import {buildQueryResult} from '../../../../../utils/test-utils';

describe('AddressDetailsComponent', () => {
  let component: AddressDetailsComponent;
  let fixture: ComponentFixture<AddressDetailsComponent>;
  let resourceService: jasmine.SpyObj<ResourceService>;

  beforeEach(async () => {
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['findStores']);

    await TestBed.configureTestingModule({
      imports: [AddressDetailsComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ResourceService, useValue: resourceServiceSpy},
      ],
    }).compileComponents();

    resourceService = TestBed.inject(ResourceService) as jasmine.SpyObj<ResourceService>;
    resourceService.findStores.and.returnValue(buildQueryResult());

    fixture = TestBed.createComponent(AddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("address", getMockedAddress());
    fixture.componentRef.setInput("orderDetails", getMockOrderDetails());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
