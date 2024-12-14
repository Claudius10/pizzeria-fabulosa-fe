import {Signal} from '@angular/core';
import {BaseQueryResult, BaseUserQueryOptions} from './base';
import {ResponseDTO} from './http/api';

// ---------- USER QUERY ----------

export interface UserOrderQueryResult extends BaseQueryResult {
  data: Signal<ResponseDTO | undefined>;
}

export interface OrderSummaryListQueryResult extends BaseQueryResult {
  data: Signal<ResponseDTO | undefined>;
}

export interface UserOrderQueryOptions extends BaseUserQueryOptions {
  orderId: string;
}

// ---------- ADDRESS QUERY ----------

export interface UserAddressListQueryResult extends BaseQueryResult {
  data: Signal<ResponseDTO | undefined>;
}

// ---------- RESOURCES QUERY ----------

export interface ProductsQueryResult extends BaseQueryResult {
  data: Signal<ResponseDTO | undefined>;
}

export interface OffersQueryResult extends BaseQueryResult {
  data: Signal<ResponseDTO | undefined>;
}

export interface StoresQueryResult extends BaseQueryResult {
  data: Signal<ResponseDTO | undefined>;
}
