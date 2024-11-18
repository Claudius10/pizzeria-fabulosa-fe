import {Signal} from '@angular/core';
import {OrderDTO, OrderSummaryListDTO} from './dto/order';

interface BaseQueryResult {
  isLoading: Signal<boolean>;
  isSuccess: boolean;
  isError: boolean;
  error: Signal<Error | null>;
}

export interface UserOrderQueryResult extends BaseQueryResult {
  data: Signal<OrderDTO | undefined>;
}

export interface OrderSummaryListQueryResult extends BaseQueryResult {
  data: Signal<OrderSummaryListDTO | undefined>;
}

interface BaseQueryOptions {
  queryKey: string[];
}

interface BaseUserQueryOptions extends BaseQueryOptions {
  userId: string | undefined;
}

export interface OrderSummaryListQueryOptions extends BaseUserQueryOptions {
  pageNumber: number;
  pageSize: number;
}

export interface UserOrderQueryOptions extends BaseUserQueryOptions {
  orderId: string;
}
