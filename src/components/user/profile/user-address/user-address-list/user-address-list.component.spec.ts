import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAddressListComponent} from './user-address-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {of} from 'rxjs';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {UserAddressAPIService} from '../../../../../api';

describe('UserAddressListComponent', () => {
  let component: UserAddressListComponent;
  let fixture: ComponentFixture<UserAddressListComponent>;
  let userService: jasmine.SpyObj<UserAddressAPIService>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['findUserAddressListById']);

    await TestBed.configureTestingModule({
      imports: [UserAddressListComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UserAddressAPIService, useValue: userServiceSpy},
      ],
    })
      .compileComponents();

    userService = TestBed.inject(UserAddressAPIService) as jasmine.SpyObj<UserAddressAPIService>;
    userService.findUserAddressListById.and.returnValue(of());

    fixture = TestBed.createComponent(UserAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
