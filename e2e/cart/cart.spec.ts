import {expect, test} from '@playwright/test';
import {beverages, pizzas} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage&pageNumber=0&pageSize=8', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');
  });

  test('ShowCartWithItems', async ({page}) => {

    // Arrange

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');

    const beveragesLink = page.getByRole('button', {name: 'Beverages'});
    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();

    await beveragesLink.click();
    await page.waitForURL('http://192.168.1.128:4200/beverages');

    const beverageDetails = page.getByTitle('Mahou Gluten Free Details').getByRole('button');
    await beverageDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Mahou Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByTitle('Gluten Free M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Gluten Free', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Price').getByRole('button').getByText('14.75€')).toBeVisible();
    await expect(page.getByTitle('Increase Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Gluten Free M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Mahou Gluten Free S').getByRole('img')).toBeVisible();
    await expect(page.getByTitle('Mahou Gluten Free S').getByText('Mahou Gluten Free', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Mahou Gluten Free S Format', {exact: true}).getByText('330ML')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Mahou Gluten Free S Price').getByRole('button').getByText('1.95€')).toBeVisible();
    await expect(page.getByTitle('Increase Mahou Gluten Free S Quantity')).toBeVisible();
    await expect(page.getByTitle('Mahou Gluten Free S Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Mahou Gluten Free S Quantity')).toBeVisible();

    await expect(page.getByText('Total')).toBeVisible();
    await expect(page.getByRole('button', {name: '16.70€'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithItems_WithSecondAtHalfOffer', async ({page}) => {

    // Arrange

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Gluten Free M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Gluten Free')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Price').getByRole('button').getByText('14.75€')).toBeVisible();
    await expect(page.getByTitle('Increase Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Quantity', {exact: true}).getByText('2')).toBeVisible();
    await expect(page.getByTitle('Decrease Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Gluten Free M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '29.50€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '22.13€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithItems_WithThreeForTwoOffer', async ({page}) => {

    // Arrange

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');
    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Gluten Free M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Gluten Free')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Price').getByRole('button').getByText('14.75€')).toBeVisible();
    await expect(page.getByTitle('Increase Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Quantity', {exact: true}).getByText('3')).toBeVisible();
    await expect(page.getByTitle('Decrease Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Gluten Free M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '44.25€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '29.50€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithItems_WithBothOffers', async ({page}) => {

    // Arrange

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Gluten Free M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Gluten Free')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Price').getByRole('button').getByText('14.75€')).toBeVisible();
    await expect(page.getByTitle('Increase Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Quantity', {exact: true}).getByText('5')).toBeVisible();
    await expect(page.getByTitle('Decrease Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Gluten Free M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '73.75€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '51.63€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('ShowCartWithVariedProducts', async ({page}) => {

    // Arrange

    const productOneDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const productTwoDetails = page.getByTitle('Caníbal Details').getByRole('button');
    const productThreeDetails = page.getByTitle('Coca-Cola Zero Details').getByRole('button');

    const addProduct = page.getByLabel('Add to Cart').getByRole('button');
    const productLargeFormat = page.getByRole('button', {name: 'Large'});

    const beveragesLink = page.getByRole('button', {name: 'Beverages'});

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await productOneDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productTwoDetails.click();
    await productLargeFormat.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Caníbal'})).not.toBeVisible();

    await beveragesLink.click();
    await productThreeDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Coca-Cola Zero'})).not.toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(3);

    await expect(page.getByTitle('Gluten Free M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Gluten Free')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Price').getByRole('button').getByText('14.75€')).toBeVisible();
    await expect(page.getByTitle('Increase Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Gluten Free M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Caníbal L').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Caníbal')).toBeVisible();
    await expect(page.getByTitle('Caníbal L Format', {exact: true}).getByText('Large')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Caníbal L Price').getByRole('button').getByText('20.25€')).toBeVisible();
    await expect(page.getByTitle('Increase Caníbal L Quantity')).toBeVisible();
    await expect(page.getByTitle('Caníbal L Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Caníbal L Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Caníbal L Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Caníbal L Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Coca-Cola Zero M').getByRole('img')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M').getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Format', {exact: true}).getByText('1L')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Coca-Cola Zero M Price').getByRole('button').getByText('2.95€')).toBeVisible();
    await expect(page.getByTitle('Increase Coca-Cola Zero M Quantity')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Coca-Cola Zero M Quantity')).toBeVisible();

    await expect(page.getByText('Total', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '37.95€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '30.58€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });

  test('givenCartWithVariedProducts_whenAddingVariedItems_thenIncreaseQuantityOfExistingItemAndAddNewItems', async ({page}) => {

    // Arrange

    const beveragesLink = page.getByRole('button', {name: 'Beverages'});
    const pizzasLink = page.getByRole('button', {name: 'Pizzas'});

    const productOneDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const productTwoDetails = page.getByTitle('Caníbal Details').getByRole('button');
    const productThreeDetails = page.getByTitle('Coca-Cola Zero Details').getByRole('button');
    const productLargeFormat = page.getByRole('button', {name: 'Large'});
    const beverageLargeFormat = page.getByRole('button', {name: '330ML'});
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');

    const cartButton = page.getByTitle('Cart', {exact: true});

    // Act

    await productOneDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productTwoDetails.click();
    await productLargeFormat.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Caníbal'})).not.toBeVisible();

    await beveragesLink.click();
    await productThreeDetails.click();
    await beverageLargeFormat.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Coca-Cola Zero'})).not.toBeVisible();
    await productThreeDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Coca-Cola Zero'})).not.toBeVisible();

    await pizzasLink.click();
    await productTwoDetails.click();
    await productLargeFormat.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Caníbal'})).not.toBeVisible();
    await cartButton.click();

    // Assert

    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(4);

    await expect(page.getByTitle('Gluten Free M').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Gluten Free')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Format', {exact: true}).getByText('Medium')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Price').getByRole('button').getByText('14.75€')).toBeVisible();
    await expect(page.getByTitle('Increase Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Gluten Free M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Decrease Gluten Free M Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Gluten Free M Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Gluten Free M Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

    await expect(page.getByTitle('Caníbal L').getByRole('img')).toBeVisible();
    await expect(page.getByRole('complementary').getByText('Caníbal')).toBeVisible();
    await expect(page.getByTitle('Caníbal L Format', {exact: true}).getByText('Large')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Caníbal L Price').getByRole('button').getByText('20.25€')).toBeVisible();
    await expect(page.getByTitle('Increase Caníbal L Quantity')).toBeVisible();
    await expect(page.getByTitle('Caníbal L Quantity', {exact: true}).getByText('2')).toBeVisible();
    await expect(page.getByTitle('Decrease Caníbal L Quantity')).toBeVisible();
    await expect(page.getByTitle('Toggle Caníbal L Ingredients')).toBeVisible();
    await expect(page.getByRole('complementary').getByTitle('Caníbal L Ingredients', {exact: true}).getByText('Ingredients')).toBeVisible();

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
    await expect(page.getByRole('button', {name: '60.15€'})).toBeVisible();
    await expect(page.getByText('Total with offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '45.40€'})).toBeVisible();
    await expect(page.getByText('Applied offers')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).toBeVisible();
  });
});

test.describe('Quantity Changes', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage&pageNumber=0&pageSize=8', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const productOneDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const productTwoDetails = page.getByTitle('Caníbal Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');
    const cartButton = page.getByTitle('Cart', {exact: true});

    await productOneDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await productTwoDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Caníbal'})).not.toBeVisible();
    await cartButton.click();
  });

  test('givenItem_whenIncreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Gluten Free M Quantity');
    const q = page.getByTitle('Gluten Free M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('22.13€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();

    // Assert

    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });

  test('givenItemWithTwoQuantity_whenIncreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Gluten Free M Quantity');
    const q = page.getByTitle('Gluten Free M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('22.13€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await increaseQ.click();

    // Assert

    await expect(q.getByText('3')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('59.00€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });

  test('givenItemWithThreeQuantity_whenDecreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Gluten Free M Quantity');
    const decreaseQ = page.getByTitle('Decrease Gluten Free M Quantity');

    const q = page.getByTitle('Gluten Free M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('22.13€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(page.getByText('3', {exact: true})).toBeVisible();
    await expect(page.getByText('3', {exact: true})).toHaveCSS('background-color', 'rgb(249, 115, 22)');
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();

    await increaseQ.click();
    await expect(page.getByText('4', {exact: true})).toBeVisible();
    await expect(page.getByText('4', {exact: true})).toHaveCSS('background-color', 'rgb(249, 115, 22)');
    await expect(q.getByText('3')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('59.00€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();

    await decreaseQ.click();

    // Assert

    await expect(page.getByText('3', {exact: true})).toBeVisible();
    await expect(page.getByText('3', {exact: true})).toHaveCSS('background-color', 'rgb(249, 115, 22)');
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });

  test('givenItemWithTwoQuantity_whenDecreasingQuantity_thenUpdatePriceAndShowOffer', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Gluten Free M Quantity');
    const decreaseQ = page.getByTitle('Decrease Gluten Free M Quantity');

    const q = page.getByTitle('Gluten Free M Quantity', {exact: true});
    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('22.13€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await expect(q.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
    await decreaseQ.click();

    // Assert

    await expect(q.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('22.13€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).not.toBeVisible();
  });

  test('givenTwoDifferentItems_whenIncreasingQuantity_thenIncreaseQuantityOfEach', async ({page}) => {

    // Arrange

    const increaseQ = page.getByTitle('Increase Gluten Free M Quantity');
    const increaseProductTwoQ = page.getByTitle('Increase Caníbal M Quantity');
    const q = page.getByTitle('Gluten Free M Quantity', {exact: true});
    const productTwoQ = page.getByTitle('Caníbal M Quantity', {exact: true});

    await expect(q.getByText('1')).toBeVisible();
    await expect(productTwoQ.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('22.13€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await increaseQ.click();
    await increaseProductTwoQ.click();

    // Assert

    await expect(q.getByText('2')).toBeVisible();
    await expect(productTwoQ.getByText('2')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('59.00€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('44.25€')).toBeVisible();
    await expect(page.getByRole('button', {name: '3 X 2 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });

  test('givenTwoDifferentItems_whenDecreasingQuantity_thenShowEmptyCart', async ({page}) => {

    // Arrange

    const decreaseQ = page.getByTitle('Decrease Gluten Free M Quantity');
    const decreaseProductTwoQ = page.getByTitle('Decrease Caníbal M Quantity');
    const q = page.getByTitle('Gluten Free M Quantity', {exact: true});
    const productTwoQ = page.getByTitle('Caníbal M Quantity', {exact: true});

    await expect(q.getByText('1')).toBeVisible();
    await expect(productTwoQ.getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('29.50€')).toBeVisible();
    await expect(page.getByTitle('Total After Offers Amount').getByRole('button').getByText('22.13€')).toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).toBeVisible();

    // Act

    await decreaseQ.click();
    await decreaseProductTwoQ.click();

    // Assert

    await expect(page.getByText("Your cart is empty")).toBeVisible();
    await expect(page.getByText("Total")).toBeVisible();
    await expect(page.getByRole("button", {name: '0.00€'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PROCEED TO CHECKOUT'})).not.toBeVisible();
    await expect(page.getByRole('button', {name: '2 nd is 50% off'})).not.toBeVisible();
  });
});

test.describe('Button', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage&pageNumber=0&pageSize=8', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const productOneDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');
    const cartButton = page.getByTitle('Cart', {exact: true});

    await productOneDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();
  });

  test('givenClickOnCheckOut_thenGoToCheckoutAndShowViewOnlyCartItem', async ({page}) => {

    // Arrange

    await expect(page.getByTitle('Gluten Free M Quantity', {exact: true}).getByText('1')).toBeVisible();
    await expect(page.getByTitle('Total Amount').getByRole('button').getByText('14.75€')).toBeVisible();
    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await expect(checkout).toBeVisible();

    // Act

    await checkout.click();

    // Assert

    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');
    await expect(page.getByTitle('Price').getByRole('button').getByText('14.75€')).toBeVisible();
    await expect(page.getByTitle('Times Icon')).toBeVisible();
    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(checkout).not.toBeVisible();
  });
});
