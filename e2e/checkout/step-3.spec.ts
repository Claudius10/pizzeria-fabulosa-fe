import {expect, test} from '@playwright/test';
import {pizzas} from '../api-responses';

test.describe('Render: Large Screen', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
  });

  test('ShowSteps', async ({page}) => {
    await expect(page.getByTitle('Steps')).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'}).getByText('My info')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'My info'}).getByText('1')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('Delivery location')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('2')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery time'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Delivery time'}).getByText('Delivery time')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery time'}).getByText('3')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Payment method'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('Payment Method')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('4')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('Summary')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('5')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('ShowDeliveryTimeChoice', async ({page}) => {
    await expect(page.getByText('Please select delivery time')).toBeVisible();
    await expect(page.getByTitle('Delivery Time Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery time')).toBeVisible();
    await expect(page.getByLabel('Please select delivery time')).toHaveValue('0'); // 0 = ASAP; 1 = Programmed Delivery
  });

  test('ShowProgrammedHourChoice', async ({page}) => {

    // Arrange

    const deliveryTimeChoice = page.getByLabel('Please select delivery time');

    // Act

    await deliveryTimeChoice.selectOption('Programmed delivery');
    await expect(page.getByLabel('Please select delivery time')).toHaveValue('1'); // 0 = ASAP; 1 = Programmed Delivery

    // Assert

    await expect(page.getByText('Please select delivery hour')).toBeVisible();
    await expect(page.getByTitle('Delivery Hour Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery hour')).toBeVisible();
  });

  test('Buttons', async ({page}) => {
    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'NEXT'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();
  });
});

test.describe('Render: Small Screen', () => {
  test.use({viewport: {width: 360, height: 760}});

  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
  });

  test('ShowStep', async ({page}) => {
    await expect(page.getByTitle('Step', {exact: true})).toBeVisible();
    await expect(page.getByText('Step 3 Delivery time')).toBeVisible();
    await expect(page.getByText('Step 3 Delivery time').getByText('3')).toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('ShowDeliveryTimeChoice', async ({page}) => {
    await expect(page.getByText('Please select delivery time')).toBeVisible();
    await expect(page.getByTitle('Delivery Time Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery time')).toBeVisible();
  });

  test('ShowProgrammedHourChoice', async ({page}) => {

    // Arrange

    const deliveryTimeChoice = page.getByLabel('Please select delivery time');

    // Act

    await deliveryTimeChoice.selectOption('Programmed delivery');

    // Assert

    await expect(page.getByText('Please select delivery hour')).toBeVisible();
    await expect(page.getByTitle('Delivery Hour Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery hour')).toBeVisible();
  });

  test('DoNotShowCart', async ({page}) => {
    await expect(page.getByTitle('Checkout Cart')).not.toBeVisible();
    await expect(page.getByTitle('Cart Items')).not.toBeVisible();
  });

  test('Buttons', async ({page}) => {
    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'NEXT'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();
  });
});

test.describe('Buttons', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByLabel('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
  });

  test('givenClickOnNext_thenGoToStepFour', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});

    // Act

    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
    await expect(page.getByTitle('Steps')).toBeVisible();
  });

  test('givenClickOnNext_thenSaveSelectedOption', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await expect(deliveryTimeChoice).toHaveValue('0'); // 0 = ASAP; 1 = Programmed delivery
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');

    // Act

    await next.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
    await previous.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await expect(page.getByText('Please select delivery time')).toBeVisible();
    await expect(page.getByTitle('Delivery Time Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery time')).toBeVisible();
    await expect(deliveryTimeChoice).toHaveValue('0'); // 0 = ASAP; 1 = Programmed delivery

    await expect(page.getByText('Please select delivery hour')).not.toBeVisible();
    await expect(deliveryHourChoice).not.toBeVisible();
  });

  test('givenClickOnPrevious_thenSaveSelectedOption', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await expect(deliveryTimeChoice).toHaveValue('0'); // 0 = ASAP; 1 = Programmed delivery
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');

    // Act

    await previous.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');
    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await expect(page.getByText('Please select delivery time')).toBeVisible();
    await expect(page.getByTitle('Delivery Time Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery time')).toBeVisible();
    await expect(deliveryTimeChoice).toHaveValue('0'); // 0 = ASAP; 1 = Programmed delivery

    await expect(page.getByText('Please select delivery hour')).not.toBeVisible();
    await expect(deliveryHourChoice).not.toBeVisible();
  });

  test('givenClickOnNext_whenValidDeliveryHour_thenGoToStepFour', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');

    // Act

    await deliveryTimeChoice.selectOption('Programmed delivery');
    await expect(deliveryTimeChoice).toHaveValue('1'); // 0 = ASAP; 1 = Programmed delivery

    await expect(page.getByText('Please select delivery time')).toBeVisible();
    await expect(page.getByTitle('Delivery Time Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery time')).toBeVisible();

    await expect(page.getByText('Please select delivery hour')).toBeVisible();
    await expect(page.getByTitle('Delivery Hour Icon')).toBeVisible();
    await expect(page.getByLabel('Please select delivery hour')).toBeVisible();

    await deliveryHourChoice.selectOption('23:55');
    await expect(deliveryHourChoice).toHaveValue('23:55');

    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
    await expect(page.getByTitle('Steps')).toBeVisible();
  });

  test('givenClickOnNext_whenInvalidDeliveryHour_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');

    // Act

    await deliveryTimeChoice.selectOption('Programmed delivery');
    await expect(deliveryTimeChoice).toHaveValue('1'); // 0 = ASAP; 1 = Programmed delivery
    await next.click();

    // Assert

    await expect(page.getByText('The hour is requiered')).toBeVisible();
  });

  test('givenClickOnNext_whenValidDeliveryHour_thenSaveSelectedOption', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');

    // Act

    await deliveryTimeChoice.selectOption('Programmed delivery');
    await expect(deliveryTimeChoice).toHaveValue('1'); // 0 = ASAP; 1 = Programmed delivery

    await deliveryHourChoice.selectOption('23:55');
    await expect(deliveryHourChoice).toHaveValue('23:55');

    await next.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');

    await previous.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await expect(deliveryTimeChoice).toHaveValue('1'); // 0 = ASAP; 1 = Programmed delivery
    await expect(deliveryHourChoice).toHaveValue('23:55');
  });

  test('givenClickOnPrevious_whenValidDeliveryHour_thenSaveSelectedOption', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');

    // Act

    await deliveryTimeChoice.selectOption('Programmed delivery');
    await deliveryHourChoice.selectOption('23:55');
    await expect(deliveryTimeChoice).toHaveValue('1'); // 0 = ASAP; 1 = Programmed delivery
    await expect(deliveryHourChoice).toHaveValue('23:55');

    await previous.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');
    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await expect(deliveryTimeChoice).toHaveValue('1'); // 0 = ASAP; 1 = Programmed delivery
    await expect(deliveryHourChoice).toHaveValue('23:55');
  });
});
