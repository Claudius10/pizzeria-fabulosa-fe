export type AddressDTO = {
  id: number;
  street: string;
  streetNr: number;
  gate: string;
  staircase: string;
  door: string;
  floor: string;
}

export type OrderDetailsDTO = {
  id: number;
  deliveryTime: string;
  paymentMethod: string;
  billToChange: number | null;
  changeToGive: number | null;
  comment: string | null;
}

export type CartItemDTO = {
  id: number;
  productType: string;
  name: string;
  format: string | null;
  price: number;
  quantity: number;
}

export type CartDTO = {
  id: number;
  totalQuantity: number;
  totalCost: number;
  totalCostOffers: number;
  cartItems: CartItemDTO[];
}

export type OrderDTO = {
  id: number;
  createdOn: string;
  updatedOn: string;
  formattedCreatedOn: string;
  formattedUpdatedOn: string;
  address: AddressDTO;
  orderDetails: OrderDetailsDTO;
  cart: CartDTO;
}

export type AnonOrderDTO = {
  id: number;
  formattedCreatedOn: string,
  anonCustomerName: string;
  anonCustomerContactNumber: number;
  anonCustomerEmail: string;
  address: AddressDTO;
  orderDetails: OrderDetailsDTO;
  cart: CartDTO;
}

export type CartSummaryDTO = {
  totalQuantity: number;
  totalCost: number;
  totalCostOffers: number;
}

export type OrderDetailsSummaryDTO = {
  paymentMethod: string;
}

export type OrderSummaryDTO = {
  id: string;
  formattedCreatedOn: string;
  formattedUpdatedOn: string;
  orderDetails: OrderDetailsSummaryDTO;
  cart: CartSummaryDTO;
}

export type OrderSummaryListDTO = {
  orderList: OrderSummaryDTO[];
  totalPages: number;
  pageSize: number;
}
