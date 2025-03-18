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

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();

    const beveragesLink = page.getByRole('button', {name: 'Beverages'});
    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await addProduct.click();
    await expect(badge.getByText('1')).toBeVisible();
    await beveragesLink.click();
    await page.waitForURL('http://192.168.1.128:4200/beverages');
    const addBeverage = page.getByTitle('Add Coca-Cola Zero to Cart').getByRole('button');
    await addBeverage.click();
    await expect(badge.getByText('2')).toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByTitle('Cuatro Quesos M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Cuatro Quesos M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Coca-Cola Zero M').getByRole('img')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M').getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Format', {exact: true}).getByText('1L')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Coca-Cola Zero M Price').getByRole('button').getByText('2.95€')).toBeVisible();
    await expect(page.getByTitle('Increase Coca-Cola Zero M Quantity')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Coca-Cola Zero M Quantity')).toBeVisible();

    await expect(page.getByText('Total')).toBeVisible();
    await expect(page.getByRole('button', {name: '16.25€'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithItems_WithSecondAtHalfOffer', async ({page}) => {

    // Arrange

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await addProduct.click();
    await addProduct.click();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Cuatro Quesos M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Quantity', {exact: true}).getByText('2')).toBeVisible();
    await expect(page.getByTitle('Decrease Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Cuatro Quesos M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

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

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart', {exact: true});

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

    await expect(page.getByTitle('Cuatro Quesos M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Quantity', {exact: true}).getByText('3')).toBeVisible();
    await expect(page.getByTitle('Decrease Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Cuatro Quesos M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

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

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await addProduct.click();
    await addProduct.click();
    await addProduct.click();
    await addProduct.click();
    await addProduct.click();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Cuatro Quesos M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Quantity', {exact: true}).getByText('5')).toBeVisible();
    await expect(page.getByTitle('Decrease Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Cuatro Quesos M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '66.50€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '46.55€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithVariedProducts', async ({page}) => {

    // Arrange

    const addProductOne = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    const addProductTwo = page.getByTitle('Add Natura to Cart').getByRole('button');
    const addProductThree = page.getByTitle('Add Coca-Cola Zero to Cart').getByRole('button');
    const productTwoLargeFormat = page.getByTitle('Natura Large').getByRole('button');
    await expect(addProductOne).toBeVisible();
    const beveragesLink = page.getByRole('button', {name: 'Beverages'});

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await addProductOne.click();
    await productTwoLargeFormat.click();
    await addProductTwo.click();
    await beveragesLink.click();
    await addProductThree.click();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(3);

    await expect(page.getByTitle('Cuatro Quesos M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Cuatro Quesos M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Natura L').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Natura')).toBeVisible();
    await expect(page.getByTitle('Natura L Format', {exact: true}).getByText('Large')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Natura L Price').getByRole('button').getByText('18.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Natura L Quantity')).toBeVisible();
    await expect(page.getByTitle('Natura L Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Natura L Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Natura L Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Natura L Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Coca-Cola Zero M').getByRole('img')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M').getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Format', {exact: true}).getByText('1L')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Coca-Cola Zero M Price').getByRole('button').getByText('2.95€')).toBeVisible();
    await expect(page.getByTitle('Increase Coca-Cola Zero M Quantity')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Coca-Cola Zero M Quantity')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '34.55€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '27.90€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('givenCartWithVariedProducts_whenAddingVariedItems_thenIncreaseQuantityOfExistingItemAndAddNewItems', async ({page}) => {

    // Arrange

    const addProductOne = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    const addProductTwo = page.getByTitle('Add Natura to Cart').getByRole('button');
    const addProductThree = page.getByTitle('Add Coca-Cola Zero to Cart').getByRole('button');
    const productTwoLargeFormat = page.getByTitle('Natura Large').getByRole('button');
    const productThreeSmallFormat = page.getByTitle('Coca-Cola Zero Small').getByRole('button');
    await expect(addProductOne).toBeVisible();
    const beveragesLink = page.getByRole('button', {name: 'Beverages'});
    const pizzasLink = page.getByRole('button', {name: 'Pizzas'});

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await addProductOne.click();
    await productTwoLargeFormat.click();
    await addProductTwo.click();
    await beveragesLink.click();
    await addProductThree.click();
    await productThreeSmallFormat.click();
    await addProductThree.click();
    await pizzasLink.click();
    await productTwoLargeFormat.click();
    await addProductTwo.click();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(4);

    await expect(page.getByTitle('Cuatro Quesos M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Cuatro Quesos M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Cuatro Quesos M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Cuatro Quesos M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Cuatro Quesos M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Natura L').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Natura')).toBeVisible();
    await expect(page.getByTitle('Natura L Format', {exact: true}).getByText('Large')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Natura L Price').getByRole('button').getByText('18.30€')).toBeVisible();
    await expect(page.getByTitle('Increase Natura L Quantity')).toBeVisible();
    await expect(page.getByTitle('Natura L Quantity', {exact: true}).getByText('2')).toBeVisible();
    await expect(page.getByTitle('Decrease Natura L Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Natura L Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Natura L Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Coca-Cola Zero M').getByRole('img')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M').getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Format', {exact: true}).getByText('1L')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Coca-Cola Zero M Price').getByRole('button').getByText('2.95€')).toBeVisible();
    await expect(page.getByTitle('Increase Coca-Cola Zero M Quantity')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Coca-Cola Zero M Quantity')).toBeVisible();

    await expect(page.getByTitle('Coca-Cola Zero S').getByRole('img')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero S').getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero S Format', {exact: true}).getByText('330ML')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Coca-Cola Zero S Price').getByRole('button').getByText('1.95€')).toBeVisible();
    await expect(page.getByTitle('Increase Coca-Cola Zero S Quantity')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero S Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Coca-Cola Zero S Quantity')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '54.80€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '41.50€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
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

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    const addProductTwo = page.getByTitle('Add Natura').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart', {exact: true});
    await addProduct.click();
    await addProductTwo.click();
    await cartButton.click();
  });

  test('givenItem_whenIncreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Cuatro Quesos M Quantity');
    const q = page.getByTitle('Cuatro Quesos M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();

    // Assert

    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
  });

  test('givenItemWithTwoQuantity_whenIncreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Cuatro Quesos M Quantity');
    const q = page.getByTitle('Cuatro Quesos M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await increaseQ.click();

    // Assert

    await expect(q.getByText('3')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('53.20€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });

  test('givenItemWithThreeQuantity_whenDecreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const badge = page.locator('#pn_id_2_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS('background-color', 'rgb(249, 115, 22)');

    const increaseQ = page.getByTitle('Increase Cuatro Quesos M Quantity');
    const decreaseQ = page.getByTitle('Decrease Cuatro Quesos M Quantity');
    const q = page.getByTitle('Cuatro Quesos M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(badge.getByText('3')).toBeVisible();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await increaseQ.click();
    await expect(badge.getByText('4')).toBeVisible();
    await expect(q.getByText('3')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('53.20€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
    await decreaseQ.click();

    // Assert

    await expect(badge.getByText('3')).toBeVisible();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
  });

  test('givenItemWithTwoQuantity_whenDecreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Cuatro Quesos M Quantity');
    const decreaseQ = page.getByTitle('Decrease Cuatro Quesos M Quantity');
    const q = page.getByTitle('Cuatro Quesos M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await decreaseQ.click();

    // Assert

    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
  });

  test('givenTwoDifferentItems_whenIncreasingQuantity_thenIncreaseQuantityOfEach', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Cuatro Quesos M Quantity');
    const increaseProductTwoQ = page.getByTitle('Increase Natura M Quantity');
    const q = page.getByTitle('Cuatro Quesos M Quantity', {exact: true});
    const productTwoQ = page.getByTitle('Natura M Quantity', {exact: true});

    await expect(q.getByText('1')).toBeVisible();
    await expect(productTwoQ.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await increaseProductTwoQ.click();

    // Assert

    await expect(q.getByText('2')).toBeVisible();
    await expect(productTwoQ.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('53.20€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('39.90€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
  });

  test('givenTwoDifferentItems_whenDecreasingQuantity_thenShowEmptyCart', async ({page}) => {

    // Arrange

    const decreaseQ = page.getByTitle('Decrease Cuatro Quesos M Quantity');
    const decreaseProductTwoQ = page.getByTitle('Decrease Natura M Quantity');
    const q = page.getByTitle('Cuatro Quesos M Quantity', {exact: true});
    const productTwoQ = page.getByTitle('Natura M Quantity', {exact: true});

    await expect(q.getByText('1')).toBeVisible();
    await expect(productTwoQ.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('26.60€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('19.95€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await decreaseQ.click();
    await decreaseProductTwoQ.click();

    // Assert

    await expect(page.getByText("Your cart is empty")).toBeVisible();
    await expect(page.getByText("Total")).toBeVisible();
    await expect(page.getByRole("button", {name: '0.00€'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).not.toBeVisible();
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

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();

    const cartButton = page.getByTitle('Cart', {exact: true});
    await addProduct.click();
    await cartButton.click();
  });

  test('givenClickOnCheckOut_thenGoToCheckoutAndShowViewOnlyCartItem', async ({page}) => {

    // Arrange

    await expect(page.getByTitle('Cuatro Quesos M Quantity', {exact: true}).getByText('1')).toBeVisible();
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
