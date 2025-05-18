import {Signal} from '@angular/core';
import {CreateMutateFunction} from '@tanstack/angular-query-experimental';
import {ResponseDTO} from '../../api';

export interface MutationRequest {
  payload: any;
}

export interface MutationResult {
  isSuccess: Signal<boolean>;
  isError: Signal<boolean>;
  isPending: Signal<boolean>;
  mutate: CreateMutateFunction<ResponseDTO, Error, any>;
}
