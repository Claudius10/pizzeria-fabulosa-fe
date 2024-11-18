import {Signal} from '@angular/core';
import {CreateMutateFunction} from '@tanstack/angular-query-experimental';
import {AnonOrderFormData, NewUserOrderFormData, UpdateUserOrderFormData} from './forms/order';
import {AnonOrderDTO} from './dto/order';

export interface BaseMutationResult {
  isSuccess: Signal<boolean>;
  isError: Signal<boolean>;
  isPending: Signal<boolean>;
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
