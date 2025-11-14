import {Signal} from '@angular/core';

export interface QueryResult<T> {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<any>;
  data: Signal<T>;
}

export interface QueryResultWithRefetch<T> {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<any>;
  data: Signal<T>;
  refetch: () => void;
}
