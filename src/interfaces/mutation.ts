import {Signal} from '@angular/core';
import {AddressFormData} from './http/order';
import {CreateMutateFunction} from '@tanstack/angular-query-experimental';
import {ResponseDTO} from './http/api';

export interface MutationRequest {
  payload: any;
}

export interface MutationResult {
  isSuccess: Signal<boolean>;
  isError: Signal<boolean>;
  isPending: Signal<boolean>;
  mutate: CreateMutateFunction<ResponseDTO, Error, MutationRequest>;
}

export interface BaseUserMutationOptions {
  userId: string | undefined;
}

export interface UserOrderDeleteMutationOptions extends BaseUserMutationOptions {
  orderId: string | undefined;
}

export interface UserAddressDeleteMutationOptions extends BaseUserMutationOptions {
  addressId: string | undefined;
}

export interface UserAddressMutationOptions extends BaseUserMutationOptions {
  data: AddressFormData;
}
