import {TestBed} from '@angular/core/testing';
import {OrderHttpService} from './order-http.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('OrderHttpService', () => {
  let service: OrderHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(OrderHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
