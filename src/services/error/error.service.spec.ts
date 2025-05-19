import {TestBed} from '@angular/core/testing';

import {ErrorService} from './error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService, ToastMessageOptions} from 'primeng/api';
import {provideRouter, Router} from '@angular/router';
import {ErrorComponent} from '../../app/routes/error/error.component';
import {RouterTestingHarness} from '@angular/router/testing';
import {AuthService} from '../auth/auth.service';
import {BAD_CREDENTIALS, INVALID_TOKEN} from '../../utils/api-messages';
import {HomeComponent} from '../../components/home/home.component';
import {buildError} from '../../utils/test-utils';

describe('ErrorService', () => {
  let service: ErrorService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let queryClientSpy: jasmine.SpyObj<QueryClient>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);
    const querySpy = jasmine.createSpyObj('QueryClient', ['removeQueries', 'defaultQueryOptions']);
    const authSpy = jasmine.createSpyObj('AuthService', ['logout']);

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        // Provide both the service-to-test and its (spy) dependency
        ErrorService,
        {provide: MessageService, useValue: messageSpy},
        {provide: QueryClient, useValue: querySpy},
        {provide: AuthService, useValue: authSpy},
        provideRouter([{path: 'error', component: ErrorComponent},]),
        provideRouter([{path: '', component: HomeComponent},]),
      ]
    });

    service = TestBed.inject(ErrorService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    queryClientSpy = TestBed.inject(QueryClient) as jasmine.SpyObj<QueryClient>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('givenIsEmpty_whenThereAreNoErrors_thenReturnTrue', () => {
    const errors = service.getErrors();
    expect(errors()).toEqual([]);
    expect(service.isEmpty()).toBeTrue();
  });

  it('givenIsEmpty_whenThereAreErrors_thenReturnFalse', () => {

    // Arrange

    const mockError = {
      error: {
        apiError: {}
      }
    };
    mockError.error.apiError = buildError(true, "FATAL_CAUSE");
    service.handleError(mockError);

    // Act & Assert

    expect(service.isEmpty()).toBeFalse();
  });

  it('givenFatalError_thenAddErrorAndRedirect', async () => {

    // Arrange

    const router = TestBed.inject(Router);
    const routerTestingHarnessPromise = await RouterTestingHarness.create();

    // Act

    const mockError = {
      error: {
        apiError: {}
      }
    };
    // @ts-ignore
    mockError.error.apiError = buildError(true, "FATAL_CAUSE");
    service.handleError(mockError);
    const errorComponent = await routerTestingHarnessPromise.navigateByUrl('/error', ErrorComponent);


    // Assert

    expect(service.isEmpty()).toBeFalse();
    expect(router.url).toEqual('/error');
    expect(errorComponent.errors().length).toBe(1);
  });

  it('givenNonFatalError_thenAddMessage', () => {

    // Arrange

    let messageAdded: ToastMessageOptions;
    messageServiceSpy.add.and.callFake(message => {
      messageAdded = message;
    });

    // Act

    const mockError = {
      error: {
        apiError: {}
      }
    };
    // @ts-ignore
    mockError.error.apiError = buildError(false, BAD_CREDENTIALS);
    service.handleError(mockError);

    // Assert

    expect(messageServiceSpy.add.calls.count()).toBe(1);
    expect(messageAdded!.severity).toBe('error');
    expect(messageAdded!.summary).toBe('toast.severity.warning');
    expect(messageAdded!.detail).toBe('toast.error.api.user.not.found.detail');
    expect(messageAdded!.life).toBe(3000);
  });

  it('givenNonFatalError_whenMessageIsInvalidToken_thenAddMessageAndRemoveQueriesAndLogout', async () => {
    // Arrange

    let messageAdded: ToastMessageOptions;
    messageServiceSpy.add.and.callFake(message => {
      messageAdded = message;
    });

    // let queryKey: string[];
    // queryClientSpy.removeQueries.and.callFake(message => {
    //   queryKey = message?.queryKey.forEach();
    // });

    queryClientSpy.defaultQueryOptions.and.resolveTo();

    // Act

    const mockError = {
      error: {
        apiError: {}
      }
    };
    // @ts-ignore
    mockError.error.apiError = buildError(false, INVALID_TOKEN);
    service.handleError(mockError);

    // Assert

    expect(messageServiceSpy.add.calls.count()).toBe(1);
    expect(queryClientSpy.removeQueries.calls.count()).toBe(1);
    expect(authServiceSpy.logout.calls.count()).toBe(1);
    expect(messageAdded!.severity).toBe('error');
    expect(messageAdded!.summary).toBe('toast.severity.error');
    expect(messageAdded!.detail).toBe('toast.error.api.user.invalid.token');
    expect(messageAdded!.life).toBe(3000);
    // expect(queryKey!.length).toBe(1);
    // expect(queryKey![0]).toBe('user');
  });

  it('givenNoServerResponse_thenAddMessage', () => {

    // Arrange

    let messageAdded: ToastMessageOptions;
    messageServiceSpy.add.and.callFake(message => {
      messageAdded = message;
    });

    // Act

    service.handleServerNoResponse();

    // Assert

    expect(messageServiceSpy.add.calls.count()).toBe(1);
    expect(messageAdded!.severity).toBe('error');
    expect(messageAdded!.summary).toBe('toast.severity.error');
    expect(messageAdded!.detail).toBe('toast.error.server.detail');
    expect(messageAdded!.life).toBe(3000);
  });

  it('givenErrors_whenClear_thenRemoveErrors', () => {

    // Arrange

    const mockError = {
      error: {
        apiError: {}
      }
    };
    // @ts-ignore
    mockError.error.apiError = buildError(true, "FATAL_CAUSE");
    service.handleError(mockError);
    expect(service.errors().length).toBe(1);

    // Act

    service.clear();

    // Assert

    expect(service.errors().length).toBe(0);
  });
});
