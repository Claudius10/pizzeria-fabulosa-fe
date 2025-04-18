import {Signal} from '@angular/core';
import {ResponseDTO} from './http/api';
import {QueryObserverResult, RefetchOptions} from '@tanstack/angular-query-experimental';

export interface QueryResult {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<Error | null>;
  data: Signal<ResponseDTO | undefined>;
}

export interface QueryOnDemand extends QueryResult {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ResponseDTO, Error>>;
}
