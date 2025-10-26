import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordAuthorizationComponent} from './password-authorization.component';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideNoopAnimations} from '@angular/platform-browser/animations';

describe('PasswordAuthorizationComponent', () => {
  let component: PasswordAuthorizationComponent;
  let fixture: ComponentFixture<PasswordAuthorizationComponent>;

  beforeEach(async () => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [PasswordAuthorizationComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        {provide: QueryClient},
        {provide: MessageService, useValue: messageServiceSpy},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordAuthorizationComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('headerTitle', 'Authorization');
    fixture.componentRef.setInput('action', 'Continue');
    fixture.componentRef.setInput('guestAction', 'Continue as guest');
    fixture.componentRef.setInput('show', 'true');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
