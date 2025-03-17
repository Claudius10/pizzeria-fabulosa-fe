import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSettingsComponent} from './user-settings.component';
import {ErrorService} from '../../../services/error/error.service';
import {MessageService} from 'primeng/api';
import {AccountService} from '../../../services/http/account/account.service';
import {TranslateModule} from '@ngx-translate/core';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['delete']);

    await TestBed.configureTestingModule({
      imports: [UserSettingsComponent, TranslateModule.forRoot()],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: MessageService, useValue: messageSpy},
        {provide: AccountService, useValue: accountServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
