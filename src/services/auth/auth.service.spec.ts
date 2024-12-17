import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [AuthService]});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user credentials given valid token', () => {
    service.setUserCredentials("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGVtYWlsLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwiaWQiOiIxIiwiY29udGFjdE51bWJlciI6IjEyMzEyMzEyMyJ9.L5ZiuLk7Jg6Vdp_IA9R68u-QPlMbvzs_3LNafZPUCUQ");

    const userEmail = service.getUserEmail();
    const userName = service.getUserName();
    const userContactNumber = service.getUserContactNumber();
    const isAuthenticated = service.getIsAuthenticated();

    expect(service.getUserId()).toBe("1");
    expect(userEmail).toBe("john@email.com");
    expect(userName).toBe("John Doe");
    expect(userContactNumber).toBe("123123123");
    expect(isAuthenticated()).toBeTrue();
  });

  it('should return defaults if token is invalid', () => {
    service.setUserCredentials("invalid token");

    const userEmail = service.getUserEmail();
    const userName = service.getUserName();
    const userContactNumber = service.getUserContactNumber();
    const isAuthenticated = service.getIsAuthenticated();

    expect(service.getUserId()).toBe("0");
    expect(userEmail).toBe("quijote@gmail.com");
    expect(userName).toBe("Cervantes");
    expect(userContactNumber).toBe("000 000 000");
    expect(isAuthenticated()).toBeFalse();
  });
});
