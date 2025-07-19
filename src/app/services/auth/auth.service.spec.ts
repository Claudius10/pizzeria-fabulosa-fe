import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {UserInfoDTO} from '../../../api/user';

describe('AuthServiceTests', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('givenValidToken_thenSetCredentialsAndReturnTrue', () => {
    // Act

    const userInfo: UserInfoDTO = {
      id: "1",
      name: "John Doe",
      email: "john@email.com",
      phone_number: "123123123",
      sub: "john@email.com",
      email_verified: false,
      phone_number_verified: false,
      locale: "",
      updated_at: "",
      zoneinfo: ""
    };

    const result = service.authenticate(userInfo);

    // Assert

    expect(result).toBeTrue();
    expect(service.id).toBe(1);
    expect(service.email).toBe("john@email.com");
    expect(service.name).toBe("John Doe");
    expect(service.phoneNumber).toBe("123123123");
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('givenLoggedInUser_thenLogout', () => {

    // Arrange

    const userInfo: UserInfoDTO = {
      id: "1",
      name: "John Doe",
      email: "john@email.com",
      phone_number: "123123123",
      sub: "john@email.com",
      email_verified: false,
      phone_number_verified: false,
      locale: "",
      updated_at: "",
      zoneinfo: ""
    };

    const result = service.authenticate(userInfo);
    expect(result).toBeTrue();
    expect(service.id).toBe(1);
    expect(service.email).toBe("john@email.com");
    expect(service.name).toBe("John Doe");
    expect(service.phoneNumber).toBe("123123123");
    expect(service.isAuthenticated()).toBeTrue();

    // Act

    service.logout();

    // Assert

    expect(service.id).toBe(null);
    expect(service.email).toBe(null);
    expect(service.name).toBe(null);
    expect(service.phoneNumber).toBe(null);
    expect(service.isAuthenticated()).toBeFalse();
  });
});
