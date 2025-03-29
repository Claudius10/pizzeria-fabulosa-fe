import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAddressListViewComponent} from './user-address-list-view.component';
import {MessageService} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {buildResponse} from '../../../../../utils/test-utils';
import {UserHttpService} from '../../../../../services/http/user/user-http.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('UserAddressListViewComponent', () => {
  let component: UserAddressListViewComponent;
  let fixture: ComponentFixture<UserAddressListViewComponent>;
  let userService: jasmine.SpyObj<UserHttpService>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['findUserAddressList']);

    await TestBed.configureTestingModule({
      imports: [UserAddressListViewComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: MessageService, useValue: messageSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UserHttpService, useValue: userServiceSpy},
      ],
    })
      .compileComponents();

    userService = TestBed.inject(UserHttpService) as jasmine.SpyObj<UserHttpService>;

    userService.findUserAddressList.and.returnValue(of(buildResponse(null, false, 200, 'OK')));

    fixture = TestBed.createComponent(UserAddressListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
