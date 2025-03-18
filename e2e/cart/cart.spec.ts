import {expect, test} from '@playwright/test';
import {beverages, pizzas} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');
  });

  test('ShowCartWithItems', async ({page}) => {

    // Arrange

    const badge = page.locator('#pn_id_2_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS('background-color', 'rgb(249, 115, 22)');

    const addProduct = page.getByLabel('Add product to Cart').getByRole('button');
    await expect(addProduct).toBeVisible();

    const beveragesLink = page.getByRole('button', {name: 'Beverages'});
    const cartButton = page.getByTitle('Cart');

    // Act

    await addProduct.click();
    await expect(badge.getByText('1')).toBeVisible();
    await beveragesLink.click();
    await page.waitForURL('http://192.168.1.128:4200/beverages');
    await addProduct.click();
    await expect(badge.getByText('2')).toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByTitle('Cuatro Quesos').getByRole('img')).toBeVisible();
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByText('Medium')).toBeVisible();
    await expect(page.getByRole('button', {name: '13.30€'})).toBeVisible();
    await expect(page.getByTitle('Increase Quantity').first()).toBeVisible();
    await expect(page.getByText('1', {exact: true}).first().first()).toBeVisible();
    await expect(page.getByTitle('Decrease Quantity').first()).toBeVisible();
    await expect(page.getByTitle('Toggle Ingredients').first()).toBeVisible();
    await expect(page.getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Coca-Cola Zero', {exact: true}).getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('1L')).toBeVisible();
    await expect(page.getByRole('complementary').getByRole('button', {name: '2.95€'})).toBeVisible();

    await expect(page.getByText('Total')).toBeVisible();
    await expect(page.getByRole('button', {name: '16.25€'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithItems_WithSecondAtHalfOffer', async ({page}) => {

    // Arrange

    const addProduct = page.getByLabel('Add product to Cart').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart');

    // Act

    await addProduct.click();
    await addProduct.click();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Cuatro Quesos').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Format', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Price', {exact: true}).getByRole('button')).toBeVisible();
    await expect(page.getByTitle('Increase Quantity')).toBeVisible();
    await expect(page.getByTitle('Quantity', {exact: true}).getByText('2')).toBeVisible();
    await expect(page.getByTitle('Decrease Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Ingredients')).toBeVisible();
    await expect(page.getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '26.60€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '19.95€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithItems_WithThreeForTwoOffer', async ({page}) => {

    // Arrange

    const badge = page.locator('#pn_id_2_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS('background-color', 'rgb(249, 115, 22)');

    const addProduct = page.getByLabel('Add product to Cart').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart');

    // Act

    await addProduct.click();
    await expect(badge.getByText('1')).toBeVisible();
    await addProduct.click();
    await expect(badge.getByText('2')).toBeVisible();
    await addProduct.click();
    await expect(badge.getByText('3')).toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Cuatro Quesos').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Format', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Price', {exact: true}).getByRole('button')).toBeVisible();
    await expect(page.getByTitle('Increase Quantity')).toBeVisible();
    await expect(page.getByTitle('Quantity', {exact: true}).getByText('3')).toBeVisible();
    await expect(page.getByTitle('Decrease Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Ingredients')).toBeVisible();
    await expect(page.getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '39.90€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '26.60€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithItems_WithBothOffers', async ({page}) => {

    // Arrange

    const addProduct = page.getByLabel('Add product to Cart').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart');

    // Act

    await addProduct.click();
    await addProduct.click();
    await addProduct.click();
    await addProduct.click();
    await addProduct.click();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Cuatro Quesos').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Format', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Price', {exact: true}).getByRole('button')).toBeVisible();
    await expect(page.getByTitle('Increase Quantity')).toBeVisible();
    await expect(page.getByTitle('Quantity', {exact: true}).getByText('5')).toBeVisible();
    await expect(page.getByTitle('Decrease Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Ingredients')).toBeVisible();
    await expect(page.getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '66.50€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '46.55€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });
});

test.describe('Quantity Changes', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByLabel('Add product to Cart').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart');
    await addProduct.click();
    await cartButton.click();
  });

  test('givenItem_whenIncreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Quantity');
    const q = page.getByTitle('Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('13.30€')).toBeVisible();

    // Act

    await increaseQ.click();

    // Assert

    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByRole('button', {name: '26.60€'})).toBeVisible();
    await expect(page.getByRole('button', {name: '19.95€'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
  });

  test('givenItemWithTwoQuantity_whenIncreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Quantity');
    const q = page.getByTitle('Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('13.30€')).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await increaseQ.click();

    // Assert

    await expect(q.getByText('3')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });

  test('givenItemWithThreeQuantity_whenDecreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const badge = page.locator('#pn_id_2_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS('background-color', 'rgb(249, 115, 22)');

    const increaseQ = page.getByTitle('Increase Quantity');
    const decreaseQ = page.getByTitle('Decrease Quantity');
    const q = page.getByTitle('Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('13.30€')).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(badge.getByText('2')).toBeVisible();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await increaseQ.click();
    await expect(badge.getByText('3')).toBeVisible();
    await expect(q.getByText('3')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await decreaseQ.click();

    // Assert

    await expect(badge.getByText('2')).toBeVisible();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByRole('button', {name: '26.60€'})).toBeVisible();
    await expect(page.getByRole('button', {name: '19.95€'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).not.toBeVisible();
  });

  test('givenItemWithTwoQuantity_whenDecreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Quantity');
    const decreaseQ = page.getByTitle('Decrease Quantity');
    const q = page.getByTitle('Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('13.30€')).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await decreaseQ.click();

    // Assert

    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });
});

test.describe('Button', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByLabel('Add product to Cart').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart');
    await addProduct.click();
    await cartButton.click();
  });

  test('givenClickOnCheckOut_thenGoToCheckoutAndShowViewOnlyCartItem', async ({page}) => {

    // Arrange

    await expect(page.getByTitle('Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('13.30€')).toBeVisible();
    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await expect(checkout).toBeVisible();

    // Act

    await checkout.click();

    // Assert

    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');
    await expect(page.getByTitle('Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Times Icon')).toBeVisible();
    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(checkout).not.toBeVisible();
  });
});
