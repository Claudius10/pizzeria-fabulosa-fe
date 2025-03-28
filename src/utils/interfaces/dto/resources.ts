import {AddressDTO} from "./order";

export type OfferDTO = {
  id: number;
  image: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  caveat: {
    en: string;
    es: string;
  };
}

export type StoreDTO = {
  id: number;
  name: string;
  address: AddressDTO;
  phoneNumber: number;
  schedule: {
    en: string;
    es: string;
  };
  image: string;
}

export type ProductDTO = {
  id: string;
  type: string;
  allergens: {
    en: string[];
    es: string[];
  }
  image: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string[];
    es: string[];
  };
  prices: {
    s: number;
    m: number;
    l: number;
  };
  formats: {
    s: {
      en: string;
      es: string;
    };
    m: {
      en: string;
      es: string;
    };
    l: {
      en: string;
      es: string;
    };
  };
}
