import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnonOrderDTO, OrderDTO, OrderSummaryListDTO} from '../../interfaces/dto/order';
import {lastValueFrom} from 'rxjs';
import {AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from '../../interfaces/dto/forms/order';
import {injectMutation, injectQuery, injectQueryClient} from '@tanstack/angular-query-experimental';
import {USER_ORDER_SUMMARY_LIST, userOrderQueryKey} from '../../query-keys';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private queryClient = injectQueryClient();
  private orderToUpdateId = signal<string | null>(null);

  public newUserOrderMutation() {
    return injectMutation(() => ({
      mutationFn: (data: NewUserOrderFormData) =>
        lastValueFrom(this.httpClient.post<string>(`http://192.168.1.128:8080/api/user/${data.userId}/order`, data.order, {withCredentials: true})),
      onSuccess: () => {
        // mark order summary list as stale to be re-fetched on next mount
        this.queryClient.invalidateQueries({queryKey: USER_ORDER_SUMMARY_LIST});
      }
    }));
  }

  public newAnonOrderMutation() {
    return injectMutation(() => ({
      mutationFn: (anonOrder: AnonOrderFormData) =>
        lastValueFrom(this.httpClient.post<AnonOrderDTO>(`http://192.168.1.128:8080/api/anon/order`, anonOrder))
    }));
  }

  public findOrderSummaryList(queryKey: string[], userId: string | undefined, pageNumber: number, pageSize: number) {
    return injectQuery(() => ({
      queryKey: queryKey,
      queryFn: () => lastValueFrom(this.httpClient.get<OrderSummaryListDTO>
      (`http://192.168.1.128:8080/api/user/${userId}/order/summary?pageNumber=${pageNumber}&pageSize=${pageSize}`, {withCredentials: true})),
    }));
  }

  public findUserOrder(queryKey: string[], userId: string | undefined, orderId: string) {
    return injectQuery(() => ({
      queryKey: queryKey,
      queryFn: () =>
        lastValueFrom(this.httpClient.get<OrderDTO>(`http://192.168.1.128:8080/api/user/${userId}/order/${orderId}`,
          {withCredentials: true})),
    }));
  }

  public getOrderFromQueryCache(id: string | null) {
    return id === null ? getEmptyOrder() : this.queryClient.getQueryData(userOrderQueryKey(id)) as OrderDTO;
  }

  public updateUserOrderMutation() {
    return injectMutation(() => ({
      mutationFn: (data: UpdateUserOrderFormData) =>
        lastValueFrom(this.httpClient.put<string>(`http://192.168.1.128:8080/api/user/${data.userId}/order/${data.orderId}`, data.order,
          {withCredentials: true})),
      onSuccess: (id: string) => {
        // mark user order as stale
        this.queryClient.invalidateQueries({queryKey: userOrderQueryKey(id)});
        // mark user order summary list as stale
        this.queryClient.invalidateQueries({queryKey: USER_ORDER_SUMMARY_LIST});
      }
    }));
  }

  public getOrderToUpdateId() {
    return this.orderToUpdateId.asReadonly();
  }

  public setOrderToUpdateId(id: string | null) {
    this.orderToUpdateId.set(id);
  }
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
