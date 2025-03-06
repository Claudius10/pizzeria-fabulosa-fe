import {TestBed} from '@angular/core/testing';

import {ErrorService} from './error.service';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

describe('ErrorService', () => {
  let service: ErrorService;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        QueryClient,
        {provide: MessageService, useValue: messageService},
      ]
    });

    service = TestBed.inject(ErrorService);
    messageService = jasmine.createSpyObj(MessageService, ['add']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
