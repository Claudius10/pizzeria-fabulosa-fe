import {Injectable} from '@angular/core';
import {ICart} from './Cart';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private CART = "Pizzeria.Fabulosa.CART";
  private THEME = "Pizzeria.Fabulosa.THEME";
  private DARK_MODE = "Pizzeria.Fabulosa.DARK_MODE";
  private LOCALE = "Pizzeria.Fabulosa.LOCALE";
  private LAST_APP_START = "Pizzeria.Fabulosa.LAST_APP_START";

  getAppLastStart() {
    return localStorage.getItem(this.LAST_APP_START);
  }

  setAppStartTime() {
    localStorage.setItem(this.LAST_APP_START, new Date().toString());
  }

  setTheme(theme: string) {
    localStorage.setItem(this.THEME, theme);
  }

  getTheme() {
    return localStorage.getItem(this.THEME);
  }

  setDarkMode(darkMode: boolean) {
    localStorage.setItem(this.DARK_MODE, darkMode.toString());
  }

  getDarkMode() {
    const darkMode = localStorage.getItem(this.DARK_MODE);

    if (darkMode !== null) {
      return darkMode === 'true';
    }

    return false;
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


