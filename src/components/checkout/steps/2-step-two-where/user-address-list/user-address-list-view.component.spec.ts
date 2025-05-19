import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAddressListViewComponent} from './user-address-list-view.component';
import {MessageService} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {UserAddressAPIService} from '../../../../../api';

describe('UserAddressListViewComponent', () => {
  let component: UserAddressListViewComponent;
  let fixture: ComponentFixture<UserAddressListViewComponent>;
  let userService: jasmine.SpyObj<UserAddressAPIService>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['findUserAddressListById']);

    await TestBed.configureTestingModule({
      imports: [UserAddressListViewComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: MessageService, useValue: messageSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UserAddressAPIService, useValue: userServiceSpy},
      ],
    })
      .compileComponents();

    userService = TestBed.inject(UserAddressAPIService) as jasmine.SpyObj<UserAddressAPIService>;

    userService.findUserAddressListById.and.returnValue(of());

    fixture = TestBed.createComponent(UserAddressListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
