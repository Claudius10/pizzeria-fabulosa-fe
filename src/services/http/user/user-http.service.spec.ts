import {TestBed} from '@angular/core/testing';

import {UserHttpService} from './user-http.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {firstValueFrom} from 'rxjs';
import {ResponseDTO} from '../../../interfaces/http/api';
import {BASE, USER_ADDRESS, USER_BASE, V1} from '../../../utils/api-routes';
import {buildErrorResponse, buildResponse} from '../../../utils/functions';

describe('UserHttpService', () => {
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
});
