import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAddressFormComponent} from './user-address-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {UserAddressAPIService} from '../../../../../api';

describe('UserAddressFormComponent', () => {
  let component: UserAddressFormComponent;
  let fixture: ComponentFixture<UserAddressFormComponent>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['createUserAddress']);

    await TestBed.configureTestingModule({
      imports: [UserAddressFormComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: UserAddressAPIService, useValue: userServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
