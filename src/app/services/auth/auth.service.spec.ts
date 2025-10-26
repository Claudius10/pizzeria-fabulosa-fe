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
      sub: "john@email.com",
      name: "John Doe",
      email: "john@email.com",
      roles: ["user", "admin"],
      phone_number: "123123123",
      email_verified: false,
      phone_number_verified: false,
      locale: "",
      updated_at: "",
      zoneinfo: ""
    };

    const result = service.authenticate(userInfo);

    // Assert

    expect(result).toBeTrue();
    expect(service.getId()()).toBe(1);
    expect(service.getEmail()()).toBe("john@email.com");
    expect(service.getName()()).toBe("John Doe");
    expect(service.getPhoneNumber()()).toBe("123123123");
    expect(service.getIsAuthenticated()()).toBeTrue();
  });

  it('givenLoggedInUser_thenLogout', () => {

    // Arrange

    const userInfo: UserInfoDTO = {
      id: "1",
      sub: "john@email.com",
      name: "John Doe",
      email: "john@email.com",
      roles: ["user", "admin"],
      phone_number: "123123123",
      email_verified: false,
      phone_number_verified: false,
      locale: "",
      updated_at: "",
      zoneinfo: ""
    };

    const result = service.authenticate(userInfo);
    expect(result).toBeTrue();
    expect(service.getId()()).toBe(1);
    expect(service.getEmail()()).toBe("john@email.com");
    expect(service.getName()()).toBe("John Doe");
    expect(service.getPhoneNumber()()).toBe("123123123");
    expect(service.getIsAuthenticated()()).toBeTrue();

    // Act

    service.logout();

    // Assert

    expect(service.getId()()).toBe(null);
    expect(service.getEmail()()).toBe(null);
    expect(service.getName()()).toBe(null);
    expect(service.getPhoneNumber()()).toBe(null);
    expect(service.getIsAuthenticated()()).toBeFalse();
  });
});
