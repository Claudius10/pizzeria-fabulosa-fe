import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderDTO, OrderSummaryListDTO} from '../../interfaces/dto/order';
import {catchError} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private order = signal<OrderDTO>(getEmptyOrder());
  private orderSummaryList = signal<OrderSummaryListDTO>(getEmptyOrderSummaryDTO());

  public findOrderSummaryList(userId: string | undefined, pageNumber: number, pageSize: number) {
    if (userId === undefined) {
      return toObservable(this.orderSummaryList);
    }

    return this.httpClient.get<OrderSummaryListDTO>
    (`http://192.168.1.128:8080/api/user/${userId}/order/summary?pageNumber=${pageNumber}&pageSize=${pageSize}`, {withCredentials: true})
      .pipe(catchError(err => {
        console.log(err);
        return toObservable(this.orderSummaryList);
      }));
  }

  public findUserOrder(userId: string | undefined, orderId: string | null) {
    if (userId === undefined || orderId === null) {
      return toObservable(this.order);
    }

    return this.httpClient.get<OrderDTO>(`http://192.168.1.128:8080/api/user/${userId}/order/${orderId}`, {withCredentials: true})
      .pipe(catchError((err) => {
        console.log(err);
        return toObservable(this.order);
      }));
  }

  public getOrderSummaryList() {
    return this.orderSummaryList.asReadonly();
  }

  public setOrderSummaryList(orderSummaryListDTO: OrderSummaryListDTO) {
    this.orderSummaryList.set(orderSummaryListDTO);
  }

  public getOrder() {
    return this.order.asReadonly();
  }

  public setOrder(order: OrderDTO) {
    this.order.set(order);
  }

  public isUpdatingOrder() {

  }
}

function getEmptyOrderSummaryDTO() {
  const empty: OrderSummaryListDTO = {orderList: [], totalPages: 0, pageSize: 0};
  return empty;
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
