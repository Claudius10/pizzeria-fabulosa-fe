import {inject, Injectable, signal} from '@angular/core';
import {CartItemDTO} from '../../interfaces/dto/order';
import {Cart, ICart} from '../../utils/Cart';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {COOKIE_CART} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cookieService = inject(SsrCookieService);

  private items = signal<CartItemDTO[]>([]);
  private total = signal<number>(0);
  private totalAfterOffers = signal<number>(0);
  private quantity = signal<number>(0);
  private threeForTwoOffers = signal<number>(0);
  private secondHalfPriceOffer = signal<number>(0);

  public cartItems = this.items.asReadonly();
  public cartTotal = this.total.asReadonly();
  public cartTotalAfterOffers = this.totalAfterOffers.asReadonly();
  public cartQuantity = this.quantity.asReadonly();
  public cartThreeForTwoOffers = this.threeForTwoOffers.asReadonly();
  public cartSecondHalfPriceOffer = this.secondHalfPriceOffer.asReadonly();

  public set(items: CartItemDTO[], quantity: number, total: number) {
    this.clear();
    this.quantity.set(quantity);
    this.total.set(total);
    this.items.set(items);
    this.calculateCostWithOffers(items, total);
    this.updateCartCookie();
  }

  public add(item: CartItemDTO) {
    const itemIndex = this.items().findIndex((existingItem) => existingItem.id === item.id);

    if (itemIndex !== -1) {
      this.items()[itemIndex].quantity++;
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total());
    } else {
      this.items.update((prevItems) => [...prevItems, item]);
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total());
    }
    this.updateCartCookie();
  }

  public decreaseQuantity(id: string) {
    const itemIndex = this.items().findIndex(existingItem => existingItem.id === id);
    const theItem = this.items()[itemIndex];

    if (theItem.quantity === 1) {
      const cartItemsMinusTheItem = this.items().filter((item) => item.id !== theItem.id);
      this.items.set(cartItemsMinusTheItem);
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total());
    } else {
      this.items()[itemIndex].quantity--;
      this.items.update(prevItems => [...prevItems]);
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total());
    }
    this.updateCartCookie();
  }

  public increaseQuantity(id: string) {
    const itemIndex = this.items().findIndex(existingItem => existingItem.id === id);

    this.items()[itemIndex].quantity++;
    this.items.update(prevItems => [...prevItems]);

    this.updateQuantity(this.items());
    this.updateTotal(this.items());
    this.calculateCostWithOffers(this.items(), this.total());
    this.updateCartCookie();
  }

  private updateQuantity(items: CartItemDTO[]) {
    const itemQuantity = items.reduce((previousValue, {quantity}) => previousValue + quantity, 0);
    this.quantity.set(itemQuantity);
  }

  private updateTotal(items: CartItemDTO[]) {
    const itemCosts = items.map((item) => item.price * item.quantity);
    const total = itemCosts.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    this.total.set(total);
  }

  private calculateCostWithOffers(items: CartItemDTO[], total: number) {
    if (items.length === 0 || total === 0) {
      this.secondHalfPriceOffer.set(0);
      this.threeForTwoOffers.set(0);
      return;
    }

    const pizzaItems = this.getPizzaItems(items);
    const pizzaQuantity = this.getPizzaQuantity(pizzaItems);
    const pizzaPrices = this.getPizzaPrices(pizzaItems);
    const lowestPricedPizza = this.getLowestPricedPizza(pizzaPrices);

    const timesToApplyThreeForTwoOffer = Math.floor(pizzaQuantity / 3);
    const applySecondPizzaHalfPriceOffer = (pizzaQuantity - timesToApplyThreeForTwoOffer) % 2 === 0;
    const helper = pizzaQuantity - (3 * timesToApplyThreeForTwoOffer);

    if (timesToApplyThreeForTwoOffer !== 0) {
      this.totalAfterOffers.set(total - (lowestPricedPizza * timesToApplyThreeForTwoOffer));
    }

    if (applySecondPizzaHalfPriceOffer && helper > 0) {
      this.totalAfterOffers.set(total - (lowestPricedPizza * timesToApplyThreeForTwoOffer) - (lowestPricedPizza / 2));
      this.secondHalfPriceOffer.set(1);
    } else {
      this.secondHalfPriceOffer.set(0);
    }

    if (pizzaQuantity === 1 || pizzaQuantity === 0) {
      this.totalAfterOffers.set(0);
    }

    this.threeForTwoOffers.set(timesToApplyThreeForTwoOffer);
  }

  public clear() {
    this.items.set([]);
    this.total.set(0);
    this.totalAfterOffers.set(0);
    this.quantity.set(0);
    this.calculateCostWithOffers([], 0);
    this.updateCartCookie();
  }

  public isEmpty() {
    return this.items().length !== 0;
  }

  private updateCartCookie() {
    const cart = new Cart()
      .withItems(this.items())
      .withTotal(this.total())
      .withQuantity(this.quantity())
      .withTotalAfterOffers(this.totalAfterOffers())
      .withThreeForTwo(this.threeForTwoOffers())
      .withSecondHalfPrice(this.secondHalfPriceOffer());

    if (cart.items.length > 0) {
      this.setCartCookie(cart);
    } else {
      this.cookieService.delete(COOKIE_CART);
    }
  }

  private getPizzaItems(items: CartItemDTO[]) {
    return items.filter((item) => item.type === "pizza");
  }

  private getPizzaQuantity(pizzaItems: CartItemDTO[]) {
    return pizzaItems.reduce((previousValue, {quantity}) => previousValue + quantity, 0);
  }

  private getPizzaPrices(pizzaItems: CartItemDTO[]) {
    return pizzaItems.map(item => item.price);
  }

  private getLowestPricedPizza(pizzaPrices: number[]) {
    return Math.min(...pizzaPrices);
  }

  private setCartCookie(cart: ICart) {
    this.cookieService.set(COOKIE_CART, JSON.stringify(cart), 30);
  }

  getCartCookie(): ICart {
    return JSON.parse(this.cookieService.get(COOKIE_CART));
  }
}
