import {CartItemDTO} from '../../api/business';

export interface MyCartItemDTO extends CartItemDTO {
  pseudoId: string;
  formatCode: string;
  images: {
    light: string;
    dark: string;
  };
}
