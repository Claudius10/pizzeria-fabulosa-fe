import {Injectable, signal} from '@angular/core';
import {CartItemDTO} from '../../utils/interfaces/dto/order';
import {Cart, ICart} from '../../utils/Cart';
import {CART} from '../../utils/constants';
import {getDarkIcon, getLightIcon} from '../../utils/functions';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<CartItemDTO[]>([]);
  total = 0;
  totalAfterOffers = 0;
  quantity = signal(0); // so in nav bar the bump animation can function correctly (to mark comp for detection change when value changes)
  threeForTwoOffers = 0;
  secondHalfPriceOffer = 0;

  set(items: CartItemDTO[], quantity: number, total: number) {
    this.clear();
    this.setIcons(items);
    this.quantity.set(quantity);
    this.total = total;
    this.items.set(items);
    this.calculateCostWithOffers(items, total);
    this.updateCart();
  }

  add(item: CartItemDTO) {
    const itemIndex = this.items().findIndex((existingItem) => existingItem.id === item.id);

    if (itemIndex !== -1) {
      this.items()[itemIndex].quantity++;
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total);
    } else {
      this.items.update((prevItems) => [...prevItems, item]);
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total);
    }

    this.updateCart();
  }

  decreaseQuantity(id: string) {
    const itemIndex = this.items().findIndex(existingItem => existingItem.id === id);
    const theItem = this.items()[itemIndex];

    if (theItem.quantity === 1) {
      const cartItemsMinusTheItem = this.items().filter((item) => item.id !== theItem.id);
      this.items.set(cartItemsMinusTheItem);
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total);
    } else {
      this.items()[itemIndex].quantity--;
      this.items.update(prevItems => [...prevItems]);
      this.updateQuantity(this.items());
      this.updateTotal(this.items());
      this.calculateCostWithOffers(this.items(), this.total);
    }

    this.updateCart();
  }

  increaseQuantity(id: string) {
    const itemIndex = this.items().findIndex(existingItem => existingItem.id === id);

    this.items()[itemIndex].quantity++;
    this.items.update(prevItems => [...prevItems]);

    this.updateQuantity(this.items());
    this.updateTotal(this.items());
    this.calculateCostWithOffers(this.items(), this.total);
    this.updateCart();
  }

  private updateQuantity(items: CartItemDTO[]) {
    this.quantity.set(items.reduce((previousValue, {quantity}) => previousValue + quantity, 0));
  }

  private updateTotal(items: CartItemDTO[]) {
    const itemCosts = items.map((item) => item.price * item.quantity);
    this.total = itemCosts.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  private calculateCostWithOffers(items: CartItemDTO[], total: number) {
    if (items.length === 0 || total === 0) {
      this.secondHalfPriceOffer = 0;
      this.threeForTwoOffers = 0;
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
      this.totalAfterOffers = total - (lowestPricedPizza * timesToApplyThreeForTwoOffer);
    }

    if (applySecondPizzaHalfPriceOffer && helper > 0) {
      this.totalAfterOffers = total - (lowestPricedPizza * timesToApplyThreeForTwoOffer) - (lowestPricedPizza / 2);
      this.secondHalfPriceOffer = 1;
    } else {
      this.secondHalfPriceOffer = 0;
    }

    if (pizzaQuantity === 1 || pizzaQuantity === 0) {
      this.totalAfterOffers = 0;
    }

    this.threeForTwoOffers = timesToApplyThreeForTwoOffer;
  }

  clear() {
    this.items.set([]);
    this.total = 0;
    this.totalAfterOffers = 0;
    this.quantity.set(0);
    this.calculateCostWithOffers([], 0);
    this.updateCart();
  }

  isEmpty() {
    return this.items().length === 0;
  }

  private updateCart() {
    const cart = new Cart()
      .withItems(this.items())
      .withTotal(this.total)
      .withQuantity(this.quantity())
      .withTotalAfterOffers(this.totalAfterOffers)
      .withThreeForTwo(this.threeForTwoOffers)
      .withSecondHalfPrice(this.secondHalfPriceOffer);

    this.setCart(cart);
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

  private setCart(cart: ICart) {
    localStorage.setItem(CART, JSON.stringify(cart));
  }

  getCart(): ICart | null {
    return localStorage.getItem(CART) === null ? null : JSON.parse(localStorage.getItem(CART)!);
  }

  // when loading order in user orders or in order-success
  // icons must be set because they don't exist in the db
  private setIcons(items: CartItemDTO[]) {
    for (const item of items) {
      item.images = {
        dark: getDarkIcon(item.type),
        light: getLightIcon(item.type)
      };
    }
  }
}
