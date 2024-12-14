import {inject, Injectable, signal} from '@angular/core';
import {OrderDTO} from '../../../interfaces/dto/order';
import {AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from '../../../interfaces/http/order';
import {injectMutation, injectQuery, injectQueryClient} from '@tanstack/angular-query-experimental';
import {USER_ORDER_SUMMARY_LIST, userOrderQueryKey} from '../../../utils/query-keys';
import {OrderSummaryListQueryResult, UserOrderQueryOptions, UserOrderQueryResult} from '../../../interfaces/query';
import {
  AnonOrderMutation,
  UserOrderDeleteMutation,
  UserOrderDeleteMutationOptions,
  UserOrderMutation,
  UserOrderUpdateMutation
} from '../../../interfaces/mutation';
import {OrderHttpService} from './order-http.service';
import {lastValueFrom} from 'rxjs';
import {ResponseDTO} from '../../../interfaces/http/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderHttpService = inject(OrderHttpService);
  private queryClient = injectQueryClient();
  private id = signal<string | null>(null);
  private pageNumber = signal(1);

  public setPageNumber = (pageNumber: number): void => {
    this.pageNumber.set(pageNumber);
  };

  public getId() {
    return this.id.asReadonly();
  }

  public setId(id: string | null) {
    this.id.set(id);
  }

  public getOrder(orderId: string | null) {
    return orderId === null ? getEmptyOrder() : this.queryClient.getQueryData(userOrderQueryKey(orderId)) as OrderDTO;
  }

  public createUserOrder(): UserOrderMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (data: NewUserOrderFormData) => lastValueFrom(this.orderHttpService.createUserOrder(data)),
      onSuccess: () => {
        // mark order summary list as stale to be re-fetched on next mount
        this.queryClient.invalidateQueries({queryKey: USER_ORDER_SUMMARY_LIST});
      }
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public createAnonOrder(): AnonOrderMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (data: AnonOrderFormData) => lastValueFrom(this.orderHttpService.createAnonOrder(data))
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public findOrderSummaryList(userId: string): OrderSummaryListQueryResult {
    const query = injectQuery(() => ({
      queryKey: ["user", "order", "summary", this.pageNumber() - 1],
      queryFn: () => lastValueFrom(this.orderHttpService.findOrderSummaryList(userId, this.pageNumber() - 1, 5)),
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error,
    };
  }

  public findUserOrder(options: UserOrderQueryOptions): UserOrderQueryResult {
    const query = injectQuery(() => ({
      // enabled: options.userId !== undefined,
      queryKey: options.queryKey,
      queryFn: () => lastValueFrom(this.orderHttpService.findUserOrder(options))
    }));

    return {
      data: query.data,
      status: query.status,
      error: query.error
    };
  }

  public updateUserOrder(): UserOrderUpdateMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (data: UpdateUserOrderFormData) => lastValueFrom(this.orderHttpService.updateUserOrder(data)),
      onSuccess: (response: ResponseDTO) => {
        // mark user order as stale
        this.queryClient.invalidateQueries({queryKey: userOrderQueryKey(response.payload)});
        // mark user order summary list as stale
        this.queryClient.invalidateQueries({queryKey: USER_ORDER_SUMMARY_LIST});
      }
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }

  public deleteUserOrder(): UserOrderDeleteMutation {
    const mutation = injectMutation(() => ({
      mutationFn: (data: UserOrderDeleteMutationOptions) => lastValueFrom(this.orderHttpService.deleteUserOrder(data)),
      onSuccess: () => {
        // mark user order summary list as stale
        this.queryClient.invalidateQueries({queryKey: USER_ORDER_SUMMARY_LIST});
      }
    }));

    return {
      mutate: mutation.mutate,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      isPending: mutation.isPending
    };
  }
}

export function getEmptyOrder() {
  const empty: OrderDTO = {
    id: 0,
    address: {
      id: 0,
      number: 0,
      street: "",
      details: "",
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
