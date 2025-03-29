import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAddressItemComponent} from './user-address-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {AddressDTO} from '../../../../../utils/interfaces/dto/order';
import {UserHttpService} from '../../../../../services/http/user/user-http.service';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('UserAddressItemComponent', () => {
  let component: UserAddressItemComponent;
  let fixture: ComponentFixture<UserAddressItemComponent>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['deleteUserAddress']);

    await TestBed.configureTestingModule({
      imports: [UserAddressItemComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: UserHttpService, useValue: userServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserAddressItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("address", getMockedAddress());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
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
