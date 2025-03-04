import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutDialogComponent} from './logout-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {MessageService} from 'primeng/api';

describe('LogoutDialogComponent', () => {
  let component: LogoutDialogComponent;
  let fixture: ComponentFixture<LogoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutDialogComponent, TranslateModule.forRoot({})],
      providers: [
        QueryClient,
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
