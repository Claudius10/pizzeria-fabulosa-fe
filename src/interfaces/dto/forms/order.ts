import {CartItemDTO} from '../order';

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
  cartItems: CartItemDTO[];
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
  userId: string;
  order: {
    addressId: number;
    orderDetails: OrderDetailsFormData;
    cart: CartFormData;
  }
}

export type UpdateUserOrderFormData = {
  userId: string;
  orderId: number,
  order: {
    addressId: number;
    createdOn: string;
    orderDetails: OrderDetailsFormData;
    cart: CartFormData;
  }
}
