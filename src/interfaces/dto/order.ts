export type AddressDTO = {
  id: number;
  street: string;
  number: number;
  details: string | null;
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
  image: string;
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

export type CustomerDTO = {
  name: string;
  contactNumber: number;
  email: string;
}

export interface CreatedOrderDTO {
  id: number;
  formattedCreatedOn: string;
  customer: CustomerDTO;
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
  totalElements: number;
  hasNext: boolean;
}
