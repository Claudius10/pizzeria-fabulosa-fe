import {Signal} from '@angular/core';

export interface QueryResult<T> {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<any>;
  data: Signal<T>;
}
