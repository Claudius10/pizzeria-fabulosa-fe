import {TestBed} from '@angular/core/testing';
import {OrderHttpService} from './order-http.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {ANON_BASE, ANON_ORDER, BASE, ORDER_BASE, ORDER_SUMMARY, USER_BASE, V1} from '../../../utils/api-routes';
import {ResponseDTO} from '../../../utils/interfaces/http/api';
import {firstValueFrom} from 'rxjs';
import {AnonOrderFormData, UserOrderFormData} from '../../../utils/interfaces/http/order';
import {buildErrorResponse, buildResponse} from '../../../utils/test-utils';
import {AuthService} from '../../auth/auth.service';

describe('OrderHttpServiceTest', () => {
  let service: OrderHttpService;
  let httpTesting: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;
  const PATH = "http://192.168.1.128:8080";

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], ['userId']);

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        OrderHttpService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    service = TestBed.inject(OrderHttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('givenCreateUserOrder_thenReturnOk', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: "1"});

    const userId = 1;
    const data: UserOrderFormData = {
      cart: {
        cartItems: [],
        id: 1,
        totalCost: 0,
        totalQuantity: 0,
        totalCostOffers: 0,
      },
      orderDetails: {
        id: 1,
        billToChange: 0,
        deliveryTime: "asap",
        comment: "",
        paymentMethod: "Card",
        storePickUp: false
      },
      addressId: 1
    };

    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + ORDER_BASE}`;

    // Act

    const response$ = service.createUserOrder(data);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenCreateUserOrder_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: null});

    const data: UserOrderFormData = {
      cart: {
        cartItems: [],
        id: 1,
        totalCost: 0,
        totalQuantity: 0,
        totalCostOffers: 0,
      },
      orderDetails: {
        id: 1,
        billToChange: 0,
        deliveryTime: "asap",
        comment: "",
        paymentMethod: "Card",
        storePickUp: false
      },
      addressId: 1
    };

    // Act

    const response$ = service.createUserOrder(data);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenCreateAnonOrder_thenReturnOk', async () => {

    // Arrange

    const data: AnonOrderFormData = {
      customer: {
        name: "",
        contactNumber: 0,
        email: ""
      },
      address: {
        id: null,
        street: "",
        details: "",
        number: 0
      },
      orderDetails: {
        id: 1,
        billToChange: 0,
        deliveryTime: "asap",
        comment: "",
        paymentMethod: "Card",
        storePickUp: false
      },
      cart: {
        cartItems: [],
        id: 1,
        totalCost: 0,
        totalQuantity: 0,
        totalCostOffers: 0,
      },
    };

    const url = `${PATH + BASE + V1 + ANON_BASE + ANON_ORDER}`;

    // Act

    const response$ = service.createAnonOrder(data);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenFindOrderSummaryList_thenReturnOk', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: "1"});

    const pageNumber = 1;
    const pageSize = 5;
    const userId = "1";
    const url = `${PATH + BASE + V1 + USER_BASE}/${userId + ORDER_BASE + ORDER_SUMMARY}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    // Act

    const response$ = service.findOrderSummaryList(pageNumber);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenFindOrderSummaryList_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: null});

    const pageNumber = 1;

    // Act

    const response$ = service.findOrderSummaryList(pageNumber);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenFindUserOrder_thenReturnOk', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: "1"});

    const options = {
      userId: "1",
      id: "1",
      queryKey: [""]
    };
    const url = `${PATH + BASE + V1 + USER_BASE}/${options.userId + ORDER_BASE}/${options.id}`;

    // Act

    const response$ = service.findUserOrder("1");
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenFindUserOrder_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: null});

    // Act

    const response$ = service.findUserOrder("1");
    const response: Promise<ResponseDTO> = firstValueFrom(response$);


    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenDeleteUserOrder_thenReturnOk', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: "1"});

    const data = {
      userId: "1",
      orderId: "1"
    };
    const url = `${PATH + BASE + V1 + USER_BASE}/${data.userId + ORDER_BASE}/${data.orderId}`;

    // Act

    const response$ = service.deleteUserOrder("1");
    const response: Promise<ResponseDTO> = firstValueFrom(response$);
    const req = httpTesting.expectOne(url);
    const responseValue: ResponseDTO = buildResponse("OK", false, 200, "OK");
    req.flush(responseValue);

    // Assert

    expect(await response).toEqual(responseValue);
    httpTesting.verify();
  });

  it('givenDeleteUserOrder_whenUserIdIsNull_thenReturnErrorResponse', async () => {

    // Arrange

    Object.defineProperty(authService, 'userId', {value: null});

    // Act

    const response$ = service.deleteUserOrder("1");
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });
});
