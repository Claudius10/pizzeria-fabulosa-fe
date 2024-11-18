import {Signal} from '@angular/core';
import {AddressDTO, OrderDTO, OrderSummaryListDTO} from './dto/order';
import {ProductDTO} from './dto/resources';
import {BaseQueryResult, BaseUserQueryOptions} from './base';

// ---------- USER QUERY ----------

export interface UserOrderQueryResult extends BaseQueryResult {
  data: Signal<OrderDTO | undefined>;
}

export interface OrderSummaryListQueryResult extends BaseQueryResult {
  data: Signal<OrderSummaryListDTO | undefined>;
}

export interface OrderSummaryListQueryOptions extends BaseUserQueryOptions {
  pageNumber: number;
  pageSize: number;
}

export interface UserOrderQueryOptions extends BaseUserQueryOptions {
  orderId: string;
}

// ---------- ADDRESS QUERY ----------

export interface UserAddressListQueryResult extends BaseQueryResult {
  data: Signal<AddressDTO[] | undefined>;
}

// ---------- PRODUCTS QUERY ----------

export interface ProductsQueryResult extends BaseQueryResult {
  data: Signal<ProductDTO[] | undefined>;
}
