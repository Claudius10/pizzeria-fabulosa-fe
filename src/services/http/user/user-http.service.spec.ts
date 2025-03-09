import {TestBed} from '@angular/core/testing';

import {UserHttpService} from './user-http.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {firstValueFrom} from 'rxjs';
import {ResponseDTO} from '../../../interfaces/http/api';
import {BASE, USER_ADDRESS, USER_BASE, V1} from '../../../utils/api-routes';
import {buildErrorResponse, buildResponse} from '../../../utils/test-utils';

describe('UserHttpServiceTests', () => {
  let service: UserHttpService;
  let httpTesting: HttpTestingController;
  const PATH = "http://192.168.1.128:8080";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UserHttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('givenFindUserAddressList_thenReturnOk', async () => {

    // Arrange

    const userId = "1";
    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}`;

    // Act

    const response$ = service.findUserAddressList(userId);
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

    const response$ = service.findUserAddressList(null);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenCreateUserAddress_thenReturnOk', async () => {

    // Arrange

    const userId = "1";
    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}`;

    // Act

    const response$ = service.createUserAddress({
      userId: userId, data: {
        id: null,
        details: "",
        number: 1,
        street: ""
      }
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

    const response$ = service.createUserAddress({
      userId: null, data: {
        id: null,
        details: "",
        number: 1,
        street: ""
      }
    });

    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenDeleteUserAddress_thenReturnOk', async () => {

    // Arrange

    const userId = "1";
    const addressId = "1";
    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + USER_ADDRESS}/${addressId}`;

    // Act

    const response$ = service.deleteUserAddress({
      userId: userId, addressId: addressId
    });

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

    const userId = null;
    const addressId = "1";

    // Act

    const response$ = service.deleteUserAddress({
      userId: userId, addressId: addressId
    });
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });
});
