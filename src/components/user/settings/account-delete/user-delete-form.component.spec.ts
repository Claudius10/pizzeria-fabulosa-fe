import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserDeleteFormComponent} from './user-delete-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorService} from '../../../../services/error/error.service';
import {MessageService} from 'primeng/api';
import {AccountHttpService} from '../../../../services/http/account/account-http.service';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('UserDeleteFormComponent', () => {
  let component: UserDeleteFormComponent;
  let fixture: ComponentFixture<UserDeleteFormComponent>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['delete']);

    await TestBed.configureTestingModule({
      imports: [UserDeleteFormComponent, TranslateModule.forRoot()],
      providers: [
        {provide: QueryClient},
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: MessageService, useValue: messageSpy},
        {provide: AccountHttpService, useValue: accountServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
