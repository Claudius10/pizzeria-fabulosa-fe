import { TestBed } from '@angular/core/testing';

import { CartLocalstorageService } from './cart-localstorage.service';

describe('CartLocalstorageService', () => {
  let service: CartLocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartLocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
