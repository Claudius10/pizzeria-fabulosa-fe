import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAddressListComponent} from './user-address-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {buildResponse} from '../../../../../utils/test-utils';
import {UserHttpService} from '../../../../../services/http/user/user-http.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('UserAddressListComponent', () => {
  let component: UserAddressListComponent;
  let fixture: ComponentFixture<UserAddressListComponent>;
  let userService: jasmine.SpyObj<UserHttpService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['findUserAddressList']);

    await TestBed.configureTestingModule({
      imports: [UserAddressListComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UserHttpService, useValue: userServiceSpy},
      ],
    })
      .compileComponents();

    userService = TestBed.inject(UserHttpService) as jasmine.SpyObj<UserHttpService>;
    userService.findUserAddressList.and.returnValue(of(buildResponse(null, false, 200, 'OK')));

    fixture = TestBed.createComponent(UserAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
