import {OrderItemDTO} from '../order';

export type AddressFormData = {
  id: number | null;
  street: string
  streetNr: number;
  gate: string | null;
  staircase: string | null;
  door: string | null;
  floor: string | null;
}

export type OrderDetailsFormData = {
  id: number | null;
  deliveryTime: string;
  paymentMethod: string;
  changeRequestChoice: string | null;
  billToChange: number | null;
  comment: string | null;
}

type CartFormData = {
  id: number | null;
  totalQuantity: number;
  totalCost: number;
  totalCostOffers: number | null;
  orderItems: OrderItemDTO[];
}

export type AnonOrderFormData = {
  anonCustomerName: string;
  anonCustomerContactNumber: number;
  anonCustomerEmail: string;
  address: AddressFormData;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}

export type UserOrderFormData = {
  addressId: number;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}

export type UpdatingUserOrderFormData = {
  orderId: number;
  userId: number;
  addressId: number;
  createdOn: string;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}
