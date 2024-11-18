import {Signal} from '@angular/core';
import {CreateMutateFunction} from '@tanstack/angular-query-experimental';
import {AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from './forms/order';
import {AnonOrderDTO} from './dto/order';
import {LoginForm, RegisterForm} from './forms/account';

export interface BaseMutationResult {
  isSuccess: Signal<boolean>;
  isError: Signal<boolean>;
  isPending: Signal<boolean>;
}

export interface LoginMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<Object, Error, LoginForm>;
}

export interface RegisterMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<string, Error, RegisterForm>;
}

export interface UserOrderMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<string, Error, NewUserOrderFormData>;
}

export interface AnonOrderMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<AnonOrderDTO, Error, AnonOrderFormData>;
}

export interface UserOrderUpdateMutation extends BaseMutationResult {
  mutate: CreateMutateFunction<string, Error, UpdateUserOrderFormData>;
}
