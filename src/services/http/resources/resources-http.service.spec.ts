import {TestBed} from '@angular/core/testing';

import {ResourcesHttpService} from './resources-http.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {BASE, RESOURCE_BASE, RESOURCE_OFFER, RESOURCE_PRODUCT, RESOURCE_STORE, V1} from '../../../utils/api-routes';
import {ResponseDTO} from '../../../interfaces/http/api';
import {firstValueFrom} from 'rxjs';
import {buildResponse} from '../../../utils/test-utils';

describe('ResourcesHttpServiceTest', () => {
  let service: ResourcesHttpService;
  let httpTesting: HttpTestingController;
  const PATH = "http://192.168.1.128:8080";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ResourcesHttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('givenFindProducts_thenReturnOk', async () => {

    const type = "";
    const url = `${PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_PRODUCT}?type=${type}`;

    // Act

    const response$ = service.findProducts(type);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenFindOffers_thenReturnOk', async () => {

    const url = `${PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_OFFER}`;

    // Act

    const response$ = service.findOffers();
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenFindStores_thenReturnOk', async () => {

    const url = `${PATH + BASE + V1 + RESOURCE_BASE + RESOURCE_STORE}`;

    // Act

    const response$ = service.findStores();
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });
});
