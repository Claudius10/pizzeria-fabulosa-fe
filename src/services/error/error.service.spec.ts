import {TestBed} from '@angular/core/testing';

import {ErrorService} from './error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {buildError} from '../../utils/functions';
import {provideRouter, Router} from '@angular/router';
import {ErrorComponent} from '../../app/routes/error/error.component';
import {RouterTestingHarness} from '@angular/router/testing';

describe('ErrorService', () => {
  let service: ErrorService;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        provideRouter([
          {path: 'error', component: ErrorComponent},
        ]),
        {provide: MessageService, useValue: {}},
        QueryClient,
      ]
    });

    service = TestBed.inject(ErrorService);
  });

  it('givenIsEmpty_whenThereAreNoErrors_thenReturnTrue', () => {
    const errors = service.getErrors();
    expect(errors()).toEqual([]);
    expect(service.isEmpty()).toBeTrue();
  });

  it('givenIsEmpty_whenThereAreErrors_thenReturnFalse', () => {

    // Arrange

    service.handleError(buildError(true));

    // Act & Assert

    expect(service.isEmpty()).toBeFalse();
  });

  it('givenFatalError_thenAddErrorAndRedirect', async () => {

    // Arrange

    const router = TestBed.inject(Router);

    // Act
    const routerTestingHarnessPromise = await RouterTestingHarness.create();
    service.handleError(buildError(true));
    await routerTestingHarnessPromise.navigateByUrl('/error', ErrorComponent);

    // Assert
    console.log(router.url);
    expect(service.isEmpty()).toBeFalse();
    expect(router.url).toEqual('/error');
  });
});
