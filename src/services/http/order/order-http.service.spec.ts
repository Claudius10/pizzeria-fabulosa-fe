import {TestBed} from '@angular/core/testing';
import {OrderHttpService} from './order-http.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {ANON_BASE, ANON_ORDER, BASE, ORDER_BASE, ORDER_SUMMARY, USER_BASE, V1} from '../../../utils/api-routes';
import {ResponseDTO} from '../../../utils/interfaces/http/api';
import {firstValueFrom} from 'rxjs';
import {AnonOrderFormData, NewUserOrderFormData} from '../../../utils/interfaces/http/order';
import {BaseQueryOptionsIdAndUser} from '../../../utils/interfaces/query';
import {UserOrderDeleteMutationOptions} from '../../../utils/interfaces/mutation';
import {buildErrorResponse, buildResponse} from '../../../utils/test-utils';

describe('OrderHttpServiceTest', () => {
  let service: OrderHttpService;
  let httpTesting: HttpTestingController;
  const PATH = "http://192.168.1.128:8080";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderHttpService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(OrderHttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('givenCreateUserOrder_thenReturnOk', async () => {

    // Arrange

    const data: NewUserOrderFormData = {
      userId: "1",
      order: {
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
      }
    };

    const url = `${PATH + BASE + V1 + USER_BASE}/${data.userId + ORDER_BASE}`;

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

    const data: NewUserOrderFormData = {
      userId: null,
      order: {
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
      }
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

    const pageNumber = 1;
    const pageSize = 1;
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

    const pageNumber = 1;
    const pageSize = 1;
    const userId = null;

    // Act

    const response$ = service.findOrderSummaryList(pageNumber);
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenFindUserOrder_thenReturnOk', async () => {

    // Arrange

    const options: BaseQueryOptionsIdAndUser = {
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

    const options: BaseQueryOptionsIdAndUser = {
      userId: null,
      id: "1",
      queryKey: [""]
    };

    // Act

    const response$ = service.findUserOrder("1");
    const response: Promise<ResponseDTO> = firstValueFrom(response$);


    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });

  it('givenDeleteUserOrder_thenReturnOk', async () => {

    // Arrange

    const data: UserOrderDeleteMutationOptions = {
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

    const data: UserOrderDeleteMutationOptions = {
      userId: null,
      orderId: "1"
    };

    // Act

    const response$ = service.deleteUserOrder("1");
    const response: Promise<ResponseDTO> = firstValueFrom(response$);

    // Assert

    expect(await response).toEqual(buildErrorResponse());
  });
});
