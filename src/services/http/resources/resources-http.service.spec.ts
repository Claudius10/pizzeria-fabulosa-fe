import {TestBed} from '@angular/core/testing';

import {ResourcesHttpService} from './resources-http.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('ResourcesHttpServiceTest', () => {
  let service: ResourcesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ResourcesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
