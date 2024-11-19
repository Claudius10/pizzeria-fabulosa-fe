import {TestBed} from '@angular/core/testing';

import {AddressHttpService} from './address-http.service';

describe('AddressHttpService', () => {
  let service: AddressHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
