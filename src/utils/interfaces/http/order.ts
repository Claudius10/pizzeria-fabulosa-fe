import {CartItemDTO} from '../dto/order';

export type AddressFormData = {
  id: number | null;
  street: string | null
  number: number | null;
  details: string | null;
}

export type OrderDetailsFormData = {
  id: number | null;
  deliveryTime: string;
  paymentMethod: string;
  billToChange: number | null;
  comment: string | null;
  storePickUp: boolean
}

type CartFormData = {
  id: number | null;
  totalQuantity: number;
  totalCost: number;
  totalCostOffers: number | null;
  cartItems: CartItemDTO[];
}

export type AnonCustomerFormData = {
  name: string;
  contactNumber: number;
  email: string;
}

export type AnonOrderFormData = {
  customer: AnonCustomerFormData;
  address: AddressFormData;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}

export interface UserOrderFormData {
  addressId: number;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}
