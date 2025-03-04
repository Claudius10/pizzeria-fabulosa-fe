import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';

describe('AuthServiceTests', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('givenValidToken_thenSetCredentialsAndReturnTrue', () => {
    // Act

    const result = service.authenticate("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGVtYWlsLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwiaWQiOiIxIiwiY29udGFjdE51bWJlciI6IjEyMzEyMzEyMyJ9.L5ZiuLk7Jg6Vdp_IA9R68u-QPlMbvzs_3LNafZPUCUQ");

    // Assert

    expect(result).toBeTrue();
    expect(service.userId).toBe("1");
    expect(service.userEmail).toBe("john@email.com");
    expect(service.userName).toBe("John Doe");
    expect(service.userContactNumber).toBe("123123123");
    expect(service.isAuthenticated).toBeTrue();
  });

  it('givenInvalidToken_thenReturnFalse', () => {
    // Act

    const result = service.authenticate("invalid token");

    // Assert

    expect(result).toBeFalse();
    expect(service.userId).toBe(null);
    expect(service.userEmail).toBe(null);
    expect(service.userName).toBe(null);
    expect(service.userContactNumber).toBe(null);
    expect(service.isAuthenticated).toBeFalse();
  });

  it('givenLoggedInUser_thenLogout', () => {

    // Arrange
    const result = service.authenticate("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGVtYWlsLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwiaWQiOiIxIiwiY29udGFjdE51bWJlciI6IjEyMzEyMzEyMyJ9.L5ZiuLk7Jg6Vdp_IA9R68u-QPlMbvzs_3LNafZPUCUQ");
    expect(result).toBeTrue();
    expect(service.userId).toBe("1");
    expect(service.userEmail).toBe("john@email.com");
    expect(service.userName).toBe("John Doe");
    expect(service.userContactNumber).toBe("123123123");
    expect(service.isAuthenticated).toBeTrue();

    // Act

    service.logout();

    // Assert

    expect(service.userId).toBe(null);
    expect(service.userEmail).toBe(null);
    expect(service.userName).toBe(null);
    expect(service.userContactNumber).toBe(null);
    expect(service.isAuthenticated).toBeFalse();
  });
});
