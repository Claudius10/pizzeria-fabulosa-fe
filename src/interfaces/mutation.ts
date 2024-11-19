import {Signal} from '@angular/core';
import {CreateMutateFunction} from '@tanstack/angular-query-experimental';
import {AddressFormData, AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from './forms/order';
import {AnonOrderDTO} from './dto/order';
import {DeleteAccountForm, LoginForm, RegisterForm} from './forms/account';
import {BaseUserMutationOptions} from './base';

// ---------- BASE QUERY ----------

export interface BaseMutationResult {
  isSuccess: Signal<boolean>;
  isError: Signal<boolean>;
  isPending: Signal<boolean>;
}

// ---------- ANON QUERY ----------

export interface AnonOrderMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<AnonOrderDTO, Error, AnonOrderFormData>;
}

// ---------- ACCOUNT QUERY ----------


export interface LoginMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<Object, Error, LoginForm>;
}

export interface LogoutMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<Object, Error>;
}

export interface RegisterMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<string, Error, RegisterForm>;
}

export interface DeleteMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<Object, Error, DeleteAccountForm>;
}

// ---------- USER QUERY ----------

export interface UserOrderMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<string, Error, NewUserOrderFormData>;
}

export interface UserOrderUpdateMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<string, Error, UpdateUserOrderFormData>;
}

// ---------- ADDRESS QUERY ----------

export interface UserAddressMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<string, Error, UserAddressMutationOptions>;
}

export interface UserAddressMutationOptions extends BaseUserMutationOptions {
  data: AddressFormData;
}
