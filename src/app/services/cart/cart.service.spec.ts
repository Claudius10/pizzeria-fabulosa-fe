import {TestBed} from '@angular/core/testing';

import {CartService} from './cart.service';
import {MyCartItemDTO} from '../../../utils/interfaces/myCartItemDTO';

describe('CartServiceTests', () => {
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cartService = TestBed.inject(CartService);
  });

  it('givenItems_thenSetCart', () => {
    // Act

    cartService.set([getMockCartItem(1, 1)], 1, 1);

    // Assert

    expect(cartService.getItems()().length).toBe(1);
    expect(cartService.getQuantity()()).toBe(1);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(1);
    expect(cartService.getTotalAfterOffers()()).toBe(0);
  });

  it('givenItems_whenTwoForHalfOfferApplies_thenWorkAsExpected', () => {
    // Act

    cartService.set([getMockCartItem(1, 1), getMockCartItem(1, 1)], 2, 2);

    // Assert

    expect(cartService.getItems()().length).toBe(2);
    expect(cartService.getQuantity()()).toBe(2);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(1);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(2);
    expect(cartService.getTotalAfterOffers()()).toBe(1.5);
  });

  it('givenItems_whenThreeForTwoOfferApplies_thenWorkAsExpected', () => {
    // Act

    cartService.set([getMockCartItem(1, 1), getMockCartItem(1, 1), getMockCartItem(1, 1)], 3, 3);

    // Assert

    expect(cartService.getItems()().length).toBe(3);
    expect(cartService.getQuantity()()).toBe(3);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(1);
    expect(cartService.getTotal()()).toBe(3);
    expect(cartService.getTotalAfterOffers()()).toBe(2);
  });

  it('givenItems_whenTwoForHalfAndThreeForTwoOfferApplies_thenWorkAsExpected', () => {
    // Act

    cartService.set([getMockCartItem(1, 1), getMockCartItem(1, 1), getMockCartItem(1, 1), getMockCartItem(1, 1), getMockCartItem(1, 1)], 5, 5);

    // Assert

    expect(cartService.getItems()().length).toBe(5);
    expect(cartService.getQuantity()()).toBe(5);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(1);
    expect(cartService.getThreeForTwoOffers()()).toBe(1);
    expect(cartService.getTotal()()).toBe(5);
    expect(cartService.getTotalAfterOffers()()).toBe(3.5);
  });

  it('givenEmptyCart_thenAddItem', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 1);

    // Act

    cartService.add(mockCartItem);

    // Assert

    expect(cartService.getItems()().length).toBe(1);
    expect(cartService.getQuantity()()).toBe(1);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(1);
    expect(cartService.getTotalAfterOffers()()).toBe(0);
  });

  it('givenItem_whenAddingTheSameItem_thenIncreaseQuantityOfItem', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 1);
    cartService.add(mockCartItem);

    // Act

    cartService.add(mockCartItem);

    // Assert

    expect(cartService.getItems()().length).toBe(1);
    expect(cartService.getQuantity()()).toBe(2);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(1);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(2);
    expect(cartService.getTotalAfterOffers()()).toBe(1.5);
  });

  it('givenCartWithOneItem_thenIncreaseQuantity', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 1);
    cartService.add(mockCartItem);

    // Act

    cartService.increaseQuantity("1");

    // Assert

    expect(cartService.getItems()().length).toBe(1);
    expect(cartService.getQuantity()()).toBe(2);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(1);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(2);
    expect(cartService.getTotalAfterOffers()()).toBe(1.5);
  });

  it('givenCartWithTwoItems_thenIncreaseQuantityOfItemOne', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 1);
    let mockCartItemTwo = getMockCartItem(2, 1);
    cartService.add(mockCartItem);
    cartService.add(mockCartItemTwo);

    // Act

    cartService.increaseQuantity("2");

    // Assert

    expect(cartService.getItems()().length).toBe(2);
    expect(cartService.getQuantity()()).toBe(3);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(1);
    expect(cartService.getTotal()()).toBe(3);
    expect(cartService.getTotalAfterOffers()()).toBe(2);
  });

  it('givenCartWithOneItem_thenEmptyCartAfterDecreasingQuantity', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 1);
    cartService.add(mockCartItem);

    // Act

    cartService.decreaseQuantity("1");

    // Assert

    expect(cartService.getItems()().length).toBe(0);
    expect(cartService.getQuantity()()).toBe(0);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(0);
    expect(cartService.getTotalAfterOffers()()).toBe(0);
  });

  it('givenCartWithItemWithTwoQuantity_thenDecreaseQuantity', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 2);
    cartService.add(mockCartItem);

    // Act

    cartService.decreaseQuantity("1");

    // Assert

    expect(cartService.getItems()().length).toBe(1);
    expect(cartService.getQuantity()()).toBe(1);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(1);
    expect(cartService.getTotalAfterOffers()()).toBe(0);
  });

  it('givenCartWithTwoItemsWithTwoQuantity_thenDecreaseQuantityOfItemOne', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 2);
    let mockCartItemTwo = getMockCartItem(2, 2);
    cartService.add(mockCartItem);
    cartService.add(mockCartItemTwo);

    // Act

    cartService.decreaseQuantity("2");

    // Assert

    expect(cartService.getItems()().length).toBe(2);
    expect(cartService.getQuantity()()).toBe(3);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(1);
    expect(cartService.getTotal()()).toBe(3);
    expect(cartService.getTotalAfterOffers()()).toBe(2);
  });

  it('givenCart_thenEmptyCart', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 2);
    let mockCartItemTwo = getMockCartItem(2, 2);
    cartService.add(mockCartItem);
    cartService.add(mockCartItemTwo);

    // Act

    cartService.clear();

    // Assert

    expect(cartService.getItems()().length).toBe(0);
    expect(cartService.getQuantity()()).toBe(0);
    expect(cartService.getSecondHalfPriceOffer()()).toBe(0);
    expect(cartService.getThreeForTwoOffers()()).toBe(0);
    expect(cartService.getTotal()()).toBe(0);
    expect(cartService.getTotalAfterOffers()()).toBe(0);
  });

  it('givenCart_thenReturnTrueThatCartIsNotEmpty', () => {

    // Arrange

    let mockCartItem = getMockCartItem(1, 2);
    cartService.add(mockCartItem);

    // Act

    const isEmpty = cartService.isEmpty();

    // Assert

    expect(isEmpty).toBeFalse();
  });

});


export const getMockCartItem = (id: number, quantity: number): MyCartItemDTO => {
  return {
    pseudoId: id.toString(),
    type: "pizza",
    formatCode: "M",
    name: {
      en: "Pizza",
      es: "Pizza"
    },
    images: {
      dark: "assets",
      light: "assets"
    },
    description: {
      en: [""],
      es: [""]
    },
    quantity: quantity,
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
    id: id
  };
};
