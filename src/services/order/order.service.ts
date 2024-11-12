import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnonOrderDTO, OrderDTO, OrderSummaryListDTO} from '../../interfaces/dto/order';
import {lastValueFrom} from 'rxjs';
import {AnonOrderFormData, UpdateUserOrderFormData, UserOrderFormData} from '../../interfaces/dto/forms/order';
import {injectMutation, injectQuery, injectQueryClient} from '@tanstack/angular-query-experimental';
import {USER_ORDER} from '../../query-keys';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private queryClient = injectQueryClient();
  private isUpdatingOrder = signal(false);

  public newUserOrderMutation() {
    return injectMutation(() => ({
      mutationFn: (data: UserOrderFormData) =>
        lastValueFrom(this.httpClient.post<string>(`http://192.168.1.128:8080/api/user/${data.userId}/order`, data.order, {withCredentials: true}))
    }));

    // refetch order summary list
  }

  public newAnonOrderMutation() {
    return injectMutation(() => ({
      mutationFn: (anonOrder: AnonOrderFormData) => lastValueFrom(this.httpClient.post<AnonOrderDTO>(`http://192.168.1.128:8080/api/anon/order`, anonOrder))
    }));
  }

  public findOrderSummaryList(queryKey: string[], userId: string | undefined, pageNumber: number, pageSize: number) {
    return injectQuery(() => ({
      queryKey: queryKey,
      queryFn: () => lastValueFrom(this.httpClient.get<OrderSummaryListDTO>
      (`http://192.168.1.128:8080/api/user/${userId}/order/summary?pageNumber=${pageNumber}&pageSize=${pageSize}`, {withCredentials: true}))
    }));
  }

  public findUserOrderQuery(queryKey: string[], userId: string | undefined, orderId: string | null) {
    return injectQuery(() => ({
      queryKey: queryKey,
      queryFn: () => lastValueFrom(this.httpClient.get<OrderDTO>(`http://192.168.1.128:8080/api/user/${userId}/order/${orderId}`,
        {withCredentials: true})),
    }));
  }

  public getLastViewedUserOrderFromCache() {
    const order = this.queryClient.getQueryData(USER_ORDER) as OrderDTO;
    return order === undefined ? getEmptyOrder() : order;
  }

  public updateUserOrderMutation() {
    return injectMutation(() => ({
      mutationFn: (data: UpdateUserOrderFormData) =>
        lastValueFrom(this.httpClient.put<string>(`http://192.168.1.128:8080/api/user/${data.userId}/order/${data.orderId}`, data.order,
          {withCredentials: true}))
    }));
  }

  public getIsUpdatingOrder() {
    return this.isUpdatingOrder.asReadonly();
  }

  public setIsUpdatingOrder(isUpdatingOrder: boolean) {
    this.isUpdatingOrder.set(isUpdatingOrder);
  }
}

function getEmptyOrderSummaryDTO() {
  const empty: OrderSummaryListDTO = {orderList: [], totalPages: 0, pageSize: 0};
  return empty;
}

export function getEmptyOrder() {
  const empty: OrderDTO = {
    id: 0,
    address: {
      id: 0,
      streetNr: 0,
      street: "",
      staircase: "",
      gate: "",
      door: "",
      floor: ""
    },
    cart: {
      cartItems: [],
      id: 0,
      totalCost: 0,
      totalCostOffers: 0,
      totalQuantity: 0
    },
    orderDetails: {
      id: 0,
      deliveryTime: "",
      paymentMethod: "",
      billToChange: null,
      changeToGive: null,
      comment: null
    },
    createdOn: "",
    updatedOn: "",
    formattedCreatedOn: "",
    formattedUpdatedOn: ""
  };
  return empty;
}
