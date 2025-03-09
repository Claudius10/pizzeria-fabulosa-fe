import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAddressListViewComponent} from './user-address-list-view.component';
import {MessageService} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {UserService} from '../../../../../services/http/user/user.service';
import {buildQueryResult} from '../../../../../utils/test-utils';

describe('UserAddressListViewComponent', () => {
  let component: UserAddressListViewComponent;
  let fixture: ComponentFixture<UserAddressListViewComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['findUserAddressList']);

    await TestBed.configureTestingModule({
      imports: [UserAddressListViewComponent, TranslateModule.forRoot()],
      providers: [
        {provide: MessageService, useValue: messageSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
      ],
    })
      .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    userService.findUserAddressList.and.returnValue(buildQueryResult());

    fixture = TestBed.createComponent(UserAddressListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
