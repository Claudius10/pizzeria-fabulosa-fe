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
  id: number;
  productType: string;
  image: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  price: {
    s: number;
    m: number;
    l: number;
  };
  format: {
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
