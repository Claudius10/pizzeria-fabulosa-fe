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

export interface BaseQueryOptionsId extends BaseQueryOptions {
  id: string; // address id, user id, order id, etc.
}

export interface BaseQueryOptionsIdAndUser extends BaseQueryOptionsId {
  userId: string;
}
