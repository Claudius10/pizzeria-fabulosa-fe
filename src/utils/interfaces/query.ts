import {Signal} from '@angular/core';
import {QueryObserverResult, RefetchOptions} from '@tanstack/angular-query-experimental';
import {ResponseDTO} from '../../api';

export interface QueryResult {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<any>;
  data: Signal<any>;
}

export interface QueryOnDemand extends QueryResult {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ResponseDTO, Error>>;
}
