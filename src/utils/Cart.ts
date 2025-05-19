import {MyCartItemDTO} from './interfaces/MyCartItemDTO';

export interface ICart {
  items: MyCartItemDTO[];
  total: number;
  totalAfterOffers: number;
  quantity: number;
  threeForTwo: number;
  secondHalfPrice: number;
}

export class Cart implements Partial<ICart> {
  items?: MyCartItemDTO[];
  total?: number;
  quantity?: number;
  totalAfterOffers?: number;
  threeForTwo?: number;
  secondHalfPrice?: number;

  constructor() {
    this.items = [];
    this.total = 0;
    this.quantity = 0;
    this.totalAfterOffers = 0;
    this.threeForTwo = 0;
    this.secondHalfPrice = 0;
  }

  withItems(value: MyCartItemDTO[]): this & Pick<ICart, 'items'> {
    return Object.assign(this, {items: value});
  }

  withTotal(value: number): this & Pick<ICart, 'total'> {
    return Object.assign(this, {total: value});
  }

  withQuantity(value: number): this & Pick<ICart, 'quantity'> {
    return Object.assign(this, {quantity: value});
  }

  withTotalAfterOffers(value: number): this & Pick<ICart, 'totalAfterOffers'> {
    return Object.assign(this, {totalAfterOffers: value});
  }

  withThreeForTwo(value: number): this & Pick<ICart, 'threeForTwo'> {
    return Object.assign(this, {threeForTwo: value});
  }

  withSecondHalfPrice(value: number): this & Pick<ICart, 'secondHalfPrice'> {
    return Object.assign(this, {secondHalfPrice: value});
  }
}
