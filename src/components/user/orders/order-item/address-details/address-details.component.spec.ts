import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressDetailsComponent} from './address-details.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {getMockOrderDetails} from '../order-details/order-details.component.spec';
import {getMockedAddress} from '../../../profile/user-address/user-address-item/user-address-item.component.spec';

describe('AddressDetailsComponent', () => {
  let component: AddressDetailsComponent;
  let fixture: ComponentFixture<AddressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressDetailsComponent, TranslateModule.forRoot()],
      providers: [
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("address", getMockedAddress());
    fixture.componentRef.setInput("orderDetails", getMockOrderDetails());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
