import {Signal} from '@angular/core';
import {OrderDTO} from './dto/order';

interface BaseQueryResult {
  isLoading: Signal<boolean>;
  isSuccess: boolean;
  isError: boolean;
  error: Signal<Error | null>;
}

export interface UserOrderQueryResult extends BaseQueryResult {
  data: Signal<OrderDTO | undefined>;
}
