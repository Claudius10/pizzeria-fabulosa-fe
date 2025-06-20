export interface where {
  street: string;
  number: number;
  details: string | undefined;
}

export interface when {
  deliveryTime: string;
}

export interface how {
  paymentMethod: string;
  billToChange: number | undefined;
}

export interface Option {
  code: string;
  description: string;
}
