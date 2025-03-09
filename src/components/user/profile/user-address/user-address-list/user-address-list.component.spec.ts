import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAddressListComponent} from './user-address-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {UserService} from '../../../../../services/http/user/user.service';
import {buildQueryResult} from '../../../../../utils/test-utils';

describe('UserAddressListComponent', () => {
  let component: UserAddressListComponent;
  let fixture: ComponentFixture<UserAddressListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['findUserAddressList']);

    await TestBed.configureTestingModule({
      imports: [UserAddressListComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
      ],
    })
      .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.findUserAddressList.and.returnValue(buildQueryResult());

    fixture = TestBed.createComponent(UserAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
