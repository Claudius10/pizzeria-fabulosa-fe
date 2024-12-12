export interface who {
  name: string;
  contactNumber: number;
  email: string;
}

export interface where {
  id: number | null;
  street: string | null;
  number: number | null;
  details: string | null;
}

export interface when {
  deliveryTime: string;
}

export interface how {
  paymentMethod: string;
  billToChange: number | null;
}

export interface summary {
  comment: string | null;
}

export interface Option {
  code: string;
  description: string;
}
