import {TestBed} from '@angular/core/testing';

import {LoadingAnimationService} from './loading-animation.service';

describe('LoadingAnimationService', () => {
  let service: LoadingAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
