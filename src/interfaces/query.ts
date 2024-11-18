import {Signal} from '@angular/core';
import {AddressDTO, OrderDTO, OrderSummaryListDTO} from './dto/order';
import {ProductDTO} from './dto/resources';

// ---------- BASE QUERY ----------

interface BaseQueryResult {
  status: Signal<"error" | "success" | "pending">;
  error: Signal<Error | null>;
}

export interface BaseQueryOptions {
  queryKey: string[];
}

export interface BaseUserQueryOptions extends BaseQueryOptions {
  userId: string | undefined;
}

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
