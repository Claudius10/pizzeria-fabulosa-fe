import {inject, Injectable, signal} from '@angular/core';
import {CartItemDTO} from '../../interfaces/dto/order';
import {Cart} from './localstorage/Cart';
import {CartLocalstorageService} from './localstorage/cart-localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartLocalStorageService = inject(CartLocalstorageService);

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
    this.items.set(items);
    this.quantity.set(quantity);
    this.total.set(total);
    this.calculateCostWithOffers(items, total);
    this.updateLocalStorage();
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
    this.updateLocalStorage();
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
    this.updateLocalStorage();
  }

  public increaseQuantity(id: string) {
    const itemIndex = this.items().findIndex(existingItem => existingItem.id === id);

    this.items()[itemIndex].quantity++;
    this.items.update(prevItems => [...prevItems]);

    this.updateQuantity(this.items());
    this.updateTotal(this.items());
    this.calculateCostWithOffers(this.items(), this.total());
    this.updateLocalStorage();
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
    this.updateLocalStorage();
  }

  public isEmpty() {
    return this.items().length !== 0;
  }

  private updateLocalStorage() {
    const cart = new Cart()
      .withItems(this.items())
      .withTotal(this.total())
      .withQuantity(this.quantity())
      .withTotalAfterOffers(this.totalAfterOffers())
      .withThreeForTwo(this.threeForTwoOffers())
      .withSecondHalfPrice(this.secondHalfPriceOffer());

    this.cartLocalStorageService.set(cart);
  }

  private getPizzaItems(items: CartItemDTO[]) {
    return items.filter((item) => item.productType === "pizza");
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
}
