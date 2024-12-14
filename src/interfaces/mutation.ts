import {Signal} from '@angular/core';
import {AddressFormData, AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from './http/order';
import {DeleteAccountForm, LoginForm, RegisterForm} from './http/account';
import {BaseUserMutationOptions} from './base';
import {CreateMutateFunction} from '@tanstack/angular-query-experimental';
import {ResponseDTO} from './http/api';

// ---------- BASE MUTATION ----------

export interface BaseMutationResult {
  isSuccess: Signal<boolean>;
  isError: Signal<boolean>;
  isPending: Signal<boolean>;
}

// ---------- ANON MUTATION ----------

export interface AnonOrderMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<ResponseDTO, Error, AnonOrderFormData>;
  // <Response, Error, Request>
}

// ---------- ACCOUNT MUTATION ----------

export interface LoginMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<Object, Error, LoginForm>;
}

export interface LogoutMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<Object, Error>;
}

export interface RegisterMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<ResponseDTO, Error, RegisterForm>;
}

export interface DeleteMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<ResponseDTO, Error, DeleteAccountForm>;
}

// ---------- ORDER MUTATION ----------

export interface UserOrderMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<ResponseDTO, Error, NewUserOrderFormData>;
}

export interface UserOrderUpdateMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<ResponseDTO, Error, UpdateUserOrderFormData>;
}

export interface UserOrderDeleteMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<ResponseDTO, Error, UserOrderDeleteMutationOptions>;
}

export interface UserOrderDeleteMutationOptions extends BaseUserMutationOptions {
  orderId: number;
}

// ---------- ADDRESS MUTATION ----------

export interface UserAddressMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<ResponseDTO, Error, UserAddressMutationOptions>;
}

export interface UserAddressMutationOptions extends BaseUserMutationOptions {
  data: AddressFormData;
}
