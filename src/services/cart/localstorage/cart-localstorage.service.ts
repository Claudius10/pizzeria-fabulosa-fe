import {Injectable} from '@angular/core';
import {ICart} from './Cart';


@Injectable({
  providedIn: 'root'
})
export class CartLocalstorageService {

  private CART = "Cart";

  set(cart: ICart) {
    localStorage.setItem(this.CART, JSON.stringify(cart));
  }

  get(): ICart {
    const cart = localStorage.getItem(this.CART,);
    return cart !== null ? JSON.parse(cart) : empty();
  }

  delete() {
    localStorage.removeItem(this.CART,);
  }

  isEmpty(): boolean {
    const cart = localStorage.getItem(this.CART,);
    return cart === null;
  }
}

const empty = (): ICart => {
  return {
    items: [],
    quantity: 0,
    secondHalfPrice: 0,
    threeForTwo: 0,
    total: 0,
    totalAfterOffers: 0
  };
};


