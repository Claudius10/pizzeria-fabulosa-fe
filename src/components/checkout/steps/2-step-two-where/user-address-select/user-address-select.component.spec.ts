import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAddressSelectComponent} from './user-address-select.component';
import {MessageService} from 'primeng/api';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../../services/error/error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('UserAddressSelectComponent', () => {
  let component: UserAddressSelectComponent;
  let fixture: ComponentFixture<UserAddressSelectComponent>;

  beforeEach(async () => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);

    await TestBed.configureTestingModule({
      imports: [UserAddressSelectComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: MessageService, useValue: messageSpy},
        {provide: ErrorService, useValue: errorServiceSpy},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserAddressSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("address", "myAddress");
    fixture.componentRef.setInput("invalid", "false");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
