import {TestBed} from '@angular/core/testing';

import {UserHttpService} from './user-http.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('UserHttpService', () => {
  let service: UserHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
