import {TestBed} from '@angular/core/testing';

import {AccountHttpService} from './account-http.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {
  ANON_BASE,
  ANON_REGISTER,
  AUTH_BASE,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  BASE,
  USER_BASE,
  V1
} from '../../../utils/api-routes';
import {ResponseDTO} from '../../../interfaces/http/api';
import {firstValueFrom} from 'rxjs';
import {DeleteAccountForm, RegisterForm} from '../../../interfaces/http/account';
import {buildErrorResponse, buildResponse} from '../../../utils/test-utils';

describe('AccountHttpServiceTest', () => {
  let service: AccountHttpService;
  let httpTesting: HttpTestingController;
  const PATH = "http://192.168.1.128:8080";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AccountHttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('givenLogin_whenLoginFormIsNull_thenReturnOk', async () => {

    // Arrange

    const url = `${PATH + BASE + V1 + AUTH_BASE + AUTH_LOGIN}?username=donQuijote@gmail.com&password=Password1`;

    // Act

    const response$ = service.login(null);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenLogin_whenLoginFormIsValid_thenReturnOk', async () => {

    // Arrange

    const email = "";
    const password = "";
    const url = `${PATH + BASE + V1 + AUTH_BASE + AUTH_LOGIN}?username=${email}&password=${password}`;

    // Act

    const response$ = service.login({email: email, password: password});
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenLogout_thenReturnOk', async () => {

    // Arrange

    const url = `${PATH + BASE + V1 + AUTH_BASE + AUTH_LOGOUT}`;

    // Act

    const response$ = service.logout();
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenCreate_thenReturnOk', async () => {

    // Arrange

    const url = `${PATH + BASE + V1 + ANON_BASE + ANON_REGISTER}`;
    const data: RegisterForm = {
      name: "",
      password: "",
      contactNumber: 0,
      email: "",
      matchingEmail: "",
      matchingPassword: ""
    };

    // Act

    const response$ = service.create(data);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenDelete_thenReturnOk', async () => {

    // Arrange

    const data: DeleteAccountForm = {
      userId: "1",
      password: ""
    };
    const url = `${PATH + BASE + V1 + USER_BASE}?id=${data.userId}&password=${data.password}`;

    // Act

    const response$ = service.delete(data);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenDelete_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Arrange

    const data: DeleteAccountForm = {
      userId: null,
      password: ""
    };
    const url = `${PATH + BASE + V1 + USER_BASE}?id=${data.userId}&password=${data.password}`;

    // Act

    const response$ = service.delete(data);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const responseValue: ResponseDTO = buildErrorResponse();

    // Assert

    expect(await response).toEqual(responseValue);

  });
});
