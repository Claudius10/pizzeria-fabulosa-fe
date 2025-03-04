import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAddressItemComponent} from './user-address-item.component';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {AddressDTO} from '../../../../../interfaces/dto/order';

describe('AddressItemComponent', () => {
  let component: UserAddressItemComponent;
  let fixture: ComponentFixture<UserAddressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressItemComponent, TranslateModule.forRoot()],
      providers: [
        QueryClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserAddressItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("address", getMockedAddress());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export const getMockedAddress = (): AddressDTO => {
  return {
    id: 1,
    details: "",
    number: 1,
    street: ""
  };
};
