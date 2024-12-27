import {Injectable} from '@angular/core';
import {ICart} from './Cart';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private CART = "Pizzeria.Fabulosa.CART";
  private THEME = "Pizzeria.Fabulosa.THEME";
  private LOCALE = "Pizzeria.Fabulosa.LOCALE";

  setTheme(theme: string) {
    localStorage.setItem(this.THEME, theme);
  }

  getStorageTheme() {
    return localStorage.getItem(this.THEME);
  }

  getTheme() {
    const theme = localStorage.getItem(this.THEME);
    return theme === null ? "aura-dark-blue" : theme;
  }

  setLocale(locale: string) {
    localStorage.setItem(this.LOCALE, locale);
  }

  getLocale() {
    const locale = localStorage.getItem(this.LOCALE);
    return locale === null ? "en" : locale;
  }

  setCart(cart: ICart) {
    localStorage.setItem(this.CART, JSON.stringify(cart));
  }

  getCart(): ICart {
    const cart = localStorage.getItem(this.CART);
    return cart !== null ? JSON.parse(cart) : empty();
  }

  deleteCart() {
    localStorage.removeItem(this.CART);
  }

  isCartEmpty(): boolean {
    const cart = localStorage.getItem(this.CART);
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


