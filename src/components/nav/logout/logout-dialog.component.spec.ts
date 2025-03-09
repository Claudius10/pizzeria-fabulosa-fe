import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutDialogComponent} from './logout-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {ErrorService} from '../../../services/error/error.service';
import {AccountService} from '../../../services/http/account/account.service';
import {QueryClient} from '@tanstack/angular-query-experimental';

describe('LogoutDialogComponent', () => {
  let component: LogoutDialogComponent;
  let fixture: ComponentFixture<LogoutDialogComponent>;

  beforeEach(async () => {
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['getErrors', 'clear', 'isEmpty']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [LogoutDialogComponent, TranslateModule.forRoot({})],
      providers: [
        {provide: ErrorService, useValue: errorServiceSpy},
        {provide: MessageService, useValue: messageSpy},
        {provide: AccountService, useValue: accountServiceSpy},
        QueryClient,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
