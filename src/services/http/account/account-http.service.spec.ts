import {TestBed} from '@angular/core/testing';

import {AccountHttpService} from './account-http.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('AccountHttpService', () => {
  let service: AccountHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AccountHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
