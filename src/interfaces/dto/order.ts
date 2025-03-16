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
  storePickUp: boolean;
}

export interface CartItemDTO {
  id: string;
  images: {
    dark: string;
    light: string;
  };
  type: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    es: string[],
    en: string[],
  };
  formats: {
    s: {
      en: string;
      es: string;
    } | null;
    m: {
      en: string;
      es: string;
    } | null;
    l: {
      en: string;
      es: string;
    } | null;
  };
  quantity: number;
  price: number;
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
