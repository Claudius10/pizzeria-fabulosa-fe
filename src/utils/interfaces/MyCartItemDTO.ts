import {CartItemDTO} from '../../api';

export interface MyCartItemDTO extends CartItemDTO {
  pseudoId: string;
  formatCode: string;
  images: {
    light: string;
    dark: string;
  };
}
