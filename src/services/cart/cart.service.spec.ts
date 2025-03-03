import {TestBed} from '@angular/core/testing';

import {CartItemDTO} from '../../interfaces/dto/order';
import {CartService} from './cart.service';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {COOKIE_CART} from '../../utils/constants';

describe('CartServiceTests', () => {
  let cartService: CartService;
  let cookieService: SsrCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cartService = TestBed.inject(CartService);
    cookieService = TestBed.inject(SsrCookieService);
  });

  it('givenItems_thenSetCart', () => {
    // Act

    cartService.set([getMockCartItem()], 1, 1);

    // Assert

    expect(cartService.items().length).toBe(1);
    expect(cartService.quantity()).toBe(1);
    expect(cartService.total).toBe(1);
    expect(cookieService.check(COOKIE_CART)).toBeTrue();
  });

  it('givenItems_whenTwoForHalfOfferApplies_thenWorkAsExpected', () => {
    // Act

    cartService.set([getMockCartItem(), getMockCartItem()], 2, 2);

    // Assert

    expect(cartService.items().length).toBe(2);
    expect(cartService.quantity()).toBe(2);
    expect(cartService.total).toBe(2);
    expect(cartService.secondHalfPriceOffer).toBe(1);
    expect(cartService.threeForTwoOffers).toBe(0);
    expect(cartService.totalAfterOffers).toBe(1.5);
    expect(cookieService.check(COOKIE_CART)).toBeTrue();
  });

  it('givenItems_whenThreeForTwoOfferApplies_thenWorkAsExpected', () => {
    // Act

    cartService.set([getMockCartItem(), getMockCartItem(), getMockCartItem()], 3, 3);

    // Assert

    expect(cartService.items().length).toBe(3);
    expect(cartService.quantity()).toBe(3);
    expect(cartService.total).toBe(3);
    expect(cartService.secondHalfPriceOffer).toBe(0);
    expect(cartService.threeForTwoOffers).toBe(1);
    expect(cartService.totalAfterOffers).toBe(2);
    expect(cookieService.check(COOKIE_CART)).toBeTrue();
  });

  it('givenItems_whenTwoForHalfAndThreeForTwoOfferApplies_thenWorkAsExpected', () => {
    // Act

    cartService.set([getMockCartItem(), getMockCartItem(), getMockCartItem(), getMockCartItem(), getMockCartItem()], 5, 5);

    // Assert

    expect(cartService.items().length).toBe(5);
    expect(cartService.quantity()).toBe(5);
    expect(cartService.total).toBe(5);
    expect(cartService.secondHalfPriceOffer).toBe(1);
    expect(cartService.threeForTwoOffers).toBe(1);
    expect(cartService.totalAfterOffers).toBe(3.5);
    expect(cookieService.check(COOKIE_CART)).toBeTrue();
  });
});

export const getMockCartItem = (): CartItemDTO => {
  return {
    type: "pizza",
    name: {
      en: "Pizza",
      es: "Pizza"
    },
    images: {
      dark: "",
      light: ""
    },
    description: {
      en: [""],
      es: [""]
    },
    quantity: 1,
    price: 1,
    formats: {
      m: {
        en: "",
        es: ""
      },
      s: {
        en: "",
        es: ""
      },
      l: {
        en: "",
        es: ""
      }
    },
    id: "1"
  };
};
