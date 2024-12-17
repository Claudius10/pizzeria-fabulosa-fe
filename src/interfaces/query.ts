import {Signal} from '@angular/core';
import {ResponseDTO} from './http/api';

export interface QueryResult {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<Error | null>;
  data: Signal<ResponseDTO | undefined>;
}

export interface BaseQueryOptions {
  queryKey: string[];
}

export interface BaseUserQueryOptions extends BaseQueryOptions {
  userId: string | null;
}

export interface UserOrderQueryOptions extends BaseUserQueryOptions {
  orderId: string;
}
