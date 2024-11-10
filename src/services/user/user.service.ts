import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddressFormData} from '../../interfaces/dto/forms/order';
import {catchError, of} from 'rxjs';
import {AddressDTO, OrderDTO, OrderSummaryListDTO} from '../../interfaces/dto/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);

  public getOrderSummaryList(userId: string | undefined, pageNumber: number, pageSize: number) {
    const empty: OrderSummaryListDTO = {orderList: [], totalPages: 0, pageSize: 0};

    if (userId === undefined) {
      // notify
      return of(empty);
    }

    return this.httpClient.get<OrderSummaryListDTO>
    (`http://192.168.1.128:8080/api/user/${userId}/order/summary?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {withCredentials: true})
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const error = err as string;
        console.log(error);
        console.log(err.error.message);
        return of(empty);
      }));
  }

  public getUserOrder(userId: string | undefined, orderId: string | null) {
    const empty = getEmptyOrder();

    if (userId === undefined || orderId === null) {
      // notify
      return of(empty);
    }

    return this.httpClient.get<OrderDTO>
    (`http://192.168.1.128:8080/api/user/${userId}/order/${orderId}`,
      {withCredentials: true})
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const error = err as string;
        console.log(error);
        console.log(err.error.message);
        return of(empty);
      }));
  }

  public getAddressList(userId: string | undefined) {
    const empty: AddressDTO[] = [];
    if (userId === undefined) {
      // user not authed - notification
      return of(empty);
    }

    return this.httpClient.get<AddressDTO[]>(`http://192.168.1.128:8080/api/user/${userId}/address`, {withCredentials: true})
      .pipe(catchError((err, caught) => {
        // have to return an Observable or throw the error
        const error = err as string;
        console.log(error);
        console.log(err.error.message);
        return of(empty);
      }));
  }

  public addAddress(userId: string, address: AddressFormData) {
    return this.httpClient.post(`http://192.168.1.128:8080/api/user/${userId}/address`, address, {
      withCredentials: true,
      responseType: "text"
    })
      .pipe(catchError((err, caught) => {
        throw err as string;
      }));
  }
}

export function getEmptyOrder() {
  const empty: OrderDTO = {
    id: 0,
    address: {id: 0, streetNr: 0, street: "", staircase: "", gate: "", door: "", floor: ""},
    cart: {
      cartItems: [],
      id: 0,
      totalCost: 0,
      totalCostOffers: 0,
      totalQuantity: 0

    },
    orderDetails: {
      id: 0,
      changeRequested: 0,
      deliverNow: "",
      deliveryComment: "",
      deliveryHour: "",
      paymentChange: 0,
      paymentType: ""
    },
    createdOn: "",
    updatedOn: "",
    formattedCreatedOn: "",
    formattedUpdatedOn: ""
  };
  return empty;
}
