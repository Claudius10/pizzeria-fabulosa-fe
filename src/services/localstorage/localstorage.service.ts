import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ICart} from './Cart';
import {isPlatformBrowser} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private platformId = inject(PLATFORM_ID);
  private isServer = !isPlatformBrowser(this.platformId);

  private CART = "Pizzeria.Fabulosa.CART";
  private THEME = "Pizzeria.Fabulosa.THEME";
  private DARK_MODE = "Pizzeria.Fabulosa.DARK_MODE";
  private LOCALE = "Pizzeria.Fabulosa.LOCALE";

  setTheme(theme: string) {
    if (!this.isServer) {
      localStorage.setItem(this.THEME, theme);
    }
  }

  // never used within server phase
  getTheme() {
    return localStorage.getItem(this.THEME);
  }

  setDarkMode(darkMode: boolean) {
    if (!this.isServer) {
      localStorage.setItem(this.DARK_MODE, darkMode.toString());
    }
  }

  // never used within server phase
  getDarkMode() {
    const darkMode = localStorage.getItem(this.DARK_MODE);

    if (darkMode !== null) {
      return darkMode === 'true';
    }

    return false;
  }

  setLocale(locale: string) {
    if (!this.isServer) {
      localStorage.setItem(this.LOCALE, locale);
    }
  }

  // never used within server phase
  getLocale() {
    const locale = localStorage.getItem(this.LOCALE);
    return locale === null ? "en" : locale;
  }

  setCart(cart: ICart) {
    if (!this.isServer) {
      localStorage.setItem(this.CART, JSON.stringify(cart));
    }
  }

  // never used within server phase
  getCart(): ICart {
    const cart = localStorage.getItem(this.CART);
    return cart !== null ? JSON.parse(cart) : empty();
  }

  // never used within server phase
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
