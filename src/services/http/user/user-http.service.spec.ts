import {TestBed} from '@angular/core/testing';
import {UserHttpService} from './user-http.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {firstValueFrom} from 'rxjs';
import {ResponseDTO} from '../../../utils/interfaces/http/api';
import {BASE, USER_ADDRESS, USER_BASE, V1} from '../../../utils/api-routes';
import {buildErrorResponse, buildResponse} from '../../../utils/test-utils';
import {AuthService} from '../../auth/auth.service';

describe('UserHttpServiceTests', () => {
  let service: UserHttpService;
  let httpTesting: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;
  const PATH = "http://192.168.1.128:8080";

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], ['userId']);

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    service = TestBed.inject(UserHttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('givenFindUserAddressList_thenReturnOk', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: "1"});
    const userId = "1";
    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}`;

    // Act

    const response$ = service.findUserAddressList();
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenFindUserAddressList_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Act

    Object.defineProperty(authService, 'userId', {value: null});
    const response$ = service.findUserAddressList();
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenCreateUserAddress_thenReturnOk', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: "1"});
    const userId = "1";
    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}`;

    // Act

    const response$ = service.createUserAddress({
      id: null,
      details: "",
      number: 1,
      street: ""
    });

    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne({
      method: 'POST',
      url: url
    });

    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenCreateUserAddress_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Act

    Object.defineProperty(authService, 'userId', {value: null});
    const response$ = service.createUserAddress({
        id: null,
        details: "",
        number: 1,
        street: ""
      }
    );

    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenDeleteUserAddress_thenReturnOk', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: "1"});
    const userId = "1";
    const addressId = "1";
    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}/${addressId}`;

    // Act

    const response$ = service.deleteUserAddress(addressId);

    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne({
      method: 'DELETE',
      url: url
    });

    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenDeleteUserAddress_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: null});
    const addressId = "1";

    // Act

    const response$ = service.deleteUserAddress(addressId);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });
});
