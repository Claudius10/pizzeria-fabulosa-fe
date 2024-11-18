import {inject, Injectable, signal} from '@angular/core';
import {OrderDTO} from '../../interfaces/dto/order';
import {AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from '../../interfaces/forms/order';
import {injectMutation, injectQuery, injectQueryClient} from '@tanstack/angular-query-experimental';
import {USER_ORDER_SUMMARY_LIST, userOrderQueryKey} from '../../interfaces/query-keys';
import {
  OrderSummaryListQueryOptions,
  OrderSummaryListQueryResult,
  UserOrderQueryOptions,
  UserOrderQueryResult
} from '../../interfaces/query';
import {AnonOrderMutation, UserOrderMutation, UserOrderUpdateMutation} from '../../interfaces/mutation';
import {OrderHttpService} from './order-http.service';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderHttpService = inject(OrderHttpService);
  private queryClient = injectQueryClient();
  orderToUpdateId = signal<string | null>(null);

  public createUserOrder() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: NewUserOrderFormData) => lastValueFrom(this.orderHttpService.createUserOrder(data)),
      onSuccess: () => {
        // mark order summary list as stale to be re-fetched on next mount
        this.queryClient.invalidateQueries({queryKey: USER_ORDER_SUMMARY_LIST});
      }
    }));

    const mutationResult: UserOrderMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }

  public createAnonOrder() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: AnonOrderFormData) => lastValueFrom(this.orderHttpService.createAnonOrder(data))
    }));

    const mutationResult: AnonOrderMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }

  public findOrderSummaryList(options: OrderSummaryListQueryOptions) {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => lastValueFrom(this.orderHttpService.findOrderSummaryList(options)),
    }));

    const queryResult: OrderSummaryListQueryResult = {
      data: query.data,
      status: query.status,
      error: query.error
    };

    return queryResult;
  }

  public findUserOrder(options: UserOrderQueryOptions) {
    const query = injectQuery(() => ({
      queryKey: options.queryKey,
      queryFn: () => lastValueFrom(this.orderHttpService.findUserOrder(options))
    }));

    const queryResult: UserOrderQueryResult = {
      data: query.data,
      status: query.status,
      error: query.error
    };

    return queryResult;
  }

  public updateUserOrder() {
    const mutation = injectMutation(() => ({
      mutationFn: (data: UpdateUserOrderFormData) => lastValueFrom(this.orderHttpService.updateUserOrder(data)),
      onSuccess: (orderId: string) => {
        // mark user order as stale
        this.queryClient.invalidateQueries({queryKey: userOrderQueryKey(orderId)});
        // mark user order summary list as stale
        this.queryClient.invalidateQueries({queryKey: USER_ORDER_SUMMARY_LIST});
      }
    }));

    const mutationResult: UserOrderUpdateMutation = {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };

    return mutationResult;
  }

  public getOrderFromQueryCache(orderId: string | null) {
    return orderId === null ? getEmptyOrder() : this.queryClient.getQueryData(userOrderQueryKey(orderId)) as OrderDTO;
  }

  public async cancelFindUserOrder(orderId: string) {
    await this.queryClient.cancelQueries({queryKey: userOrderQueryKey(orderId)});
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
