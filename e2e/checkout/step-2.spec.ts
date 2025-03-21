import {expect, test} from '@playwright/test';
import {pizzas, stores} from '../api-responses';

test.describe('Render: Large Screen', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await addProduct.click();
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
  });

  test('ShowSteps', async ({page}) => {
    await expect(page.getByTitle('Steps')).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'}).getByText('My info')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'My info'}).getByText('1')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('Delivery location')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('2')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery time'}).getByText('Delivery time')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery time'}).getByText('3')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery time'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Payment method'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('Payment Method')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('4')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('Summary')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('5')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('ShowDeliveryChoice', async ({page}) => {
    await expect(page.getByText('Please select delivery type')).toBeVisible();
    await expect(page.getByLabel('Please select delivery type')).toBeVisible();
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('0'); // 0 = Home Delivery; 1 = Store pick-up
  });

  test('ShowForm', async ({page}) => {
    await expect(page.getByRole('textbox', {name: 'Address Input'})).toBeVisible();
    await expect(page.getByTitle('Address Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Address Number Input'})).toBeVisible();
    await expect(page.getByTitle('Number Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Details Input'})).toBeVisible();
    await expect(page.getByTitle('Details icon')).toBeVisible();
  });

  test('ShowStores', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    const deliverySelect = page.getByLabel('Please select delivery type');

    // Act

    await deliverySelect.selectOption('Store pick-up');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('1'); // 0 = Home Delivery; 1 = Store pick-up

    // Assert

    await expect(page.getByTitle("Store").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Alustre Map Icon')).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByTitle('Alustre Phone Icon')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByTitle('Alustre Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM').first()).toBeVisible();

    await expect(page.getByText('Viciosa', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Viciosa Map Icon')).toBeVisible();
    await expect(page.getByText('Calle Viciosa 221')).toBeVisible();
    await expect(page.getByTitle('Viciosa Phone Icon')).toBeVisible();
    await expect(page.getByText('555666555')).toBeVisible();
    await expect(page.getByTitle('Viciosa Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM').first()).toBeVisible();
  });

  test('ShowStores: API KO', async ({page}) => {

    // Arrange

    const deliverySelect = page.getByLabel('Please select delivery type');

    // Act

    await deliverySelect.selectOption('Store pick-up');

    // Assert

    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });

  test('ShowCart', async ({page}) => {
    await expect(page.getByTitle('Checkout Cart')).toBeVisible();
    await expect(page.getByTitle('Cart Items')).toBeVisible();
    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);
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

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await addProduct.click();
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
  });

  test('ShowStep', async ({page}) => {
    await expect(page.getByTitle('Step', {exact: true})).toBeVisible();
    await expect(page.getByText('Step 2 Delivery location')).toBeVisible();
    await expect(page.getByText('Step 2 Delivery location').getByText('2')).toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('ShowDeliveryChoice', async ({page}) => {
    await expect(page.getByText('Please select delivery type')).toBeVisible();
    await expect(page.getByLabel('Please select delivery type')).toBeVisible();
  });

  test('ShowForm', async ({page}) => {
    await expect(page.getByRole('textbox', {name: 'Address Input'})).toBeVisible();
    await expect(page.getByTitle('Address Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Address Number Input'})).toBeVisible();
    await expect(page.getByTitle('Number Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Details Input'})).toBeVisible();
    await expect(page.getByTitle('Details icon')).toBeVisible();
  });

  test('ShowStores', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    const deliverySelect = page.getByLabel('Please select delivery type');

    // Act

    await deliverySelect.selectOption('Store pick-up');

    // Assert

    await expect(page.getByTitle("Store").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Alustre Map Icon')).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByTitle('Alustre Phone Icon')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByTitle('Alustre Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM').first()).toBeVisible();

    await expect(page.getByText('Viciosa', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Viciosa Map Icon')).toBeVisible();
    await expect(page.getByText('Calle Viciosa 221')).toBeVisible();
    await expect(page.getByTitle('Viciosa Phone Icon')).toBeVisible();
    await expect(page.getByText('555666555')).toBeVisible();
    await expect(page.getByTitle('Viciosa Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM').first()).toBeVisible();
  });

  test('ShowStores: API KO', async ({page}) => {

    // Arrange

    const deliverySelect = page.getByLabel('Please select delivery type');

    // Act

    await deliverySelect.selectOption('Store pick-up');

    // Assert

    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });

  test('DoNotShowCart', async ({page}) => {
    const badge = page.locator('#pn_id_2_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS('background-color', 'rgb(249, 115, 22)');
    await expect(badge.getByText('1')).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).not.toBeVisible();
    await expect(page.getByTitle('Cart Items')).not.toBeVisible();
  });

  test('Buttons', async ({page}) => {
    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'NEXT'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();
  });
});

test.describe('Validation: Address', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await addProduct.click();
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
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressInput.fill('');
    await form.click();


    // Assert

    await expect(page.getByText('Delivery address is requiered')).toBeVisible();
    await expect(addressInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressInput.fill('#');
    await form.click();

    // Assert

    await expect(page.getByText('Delivery address is requiered')).toBeVisible();
    await expect(addressInput).toHaveValue('#');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressInput.fill('Alustre');
    await form.click();

    // Assert

    await expect(page.getByText('Delivery address is requiered')).not.toBeVisible();
    await expect(addressInput).toHaveValue('Alustre');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressInput.fill('#');
    await expect(addressInput).toHaveValue('#');
    await form.click();
    await expect(page.getByText('Delivery address is requiered')).toBeVisible();
    await addressInput.fill('Alustre');

    // Assert

    await expect(page.getByText('Delivery address is requiered')).not.toBeVisible();
    await expect(addressInput).toHaveValue('Alustre');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressInput.fill('Alustre');
    await expect(addressInput).toHaveValue('Alustre');
    await form.click();
    await expect(page.getByText('Delivery address is requiered')).not.toBeVisible();
    await addressInput.fill('#');

    // Assert

    await expect(page.getByText('Delivery address is requiered')).toBeVisible();
    await expect(addressInput).toHaveValue('#');
  });
});

test.describe('Validation: Address Number', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await addProduct.click();
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
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressNumberInput.fill('');
    await form.click();


    // Assert

    await expect(page.getByText('Delivery number is requiered: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressNumberInput.fill('#');
    await form.click();

    // Assert

    await expect(page.getByText('Delivery number is requiered: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('#');
  });

  test('whenTooManyDigits_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressNumberInput.fill('12345');
    await form.click();

    // Assert

    await expect(page.getByText('Delivery number is requiered: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('12345');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressNumberInput.fill('15');
    await form.click();

    // Assert

    await expect(page.getByText('Delivery number is requiered: four digits maximum')).not.toBeVisible();
    await expect(addressNumberInput).toHaveValue('15');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressNumberInput.fill('#');
    await expect(addressNumberInput).toHaveValue('#');
    await form.click();
    await expect(page.getByText('Delivery number is requiered: four digits maximum')).toBeVisible();
    await addressNumberInput.fill('12');

    // Assert

    await expect(page.getByText('Delivery number is requiered: four digits maximum')).not.toBeVisible();
    await expect(addressNumberInput).toHaveValue('12');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressNumberInput.fill('12');
    await expect(addressNumberInput).toHaveValue('12');
    await form.click();
    await expect(page.getByText('Delivery number is requiered: four digits maximum')).not.toBeVisible();
    await addressNumberInput.fill('#');

    // Assert

    await expect(page.getByText('Delivery number is requiered: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('#');
  });
});

test.describe('Validation: Address Details', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await addProduct.click();
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
  });

  test('whenEmpty_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressDetails.fill('');
    await form.click();


    // Assert

    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await expect(addressDetails).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressDetails.fill('#');
    await form.click();

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).toBeVisible();
    await expect(addressDetails).toHaveValue('#');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressDetails.fill('Floor 5, Door 2E');
    await form.click();

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressDetails.fill('#');
    await expect(addressDetails).toHaveValue('#');
    await form.click();
    await expect(page.getByText('Delivery details input is invalid')).toBeVisible();
    await addressDetails.fill('Floor 5, Door 2E');

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await addressDetails.fill('Floor 5, Door 2E');
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
    await form.click();
    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await addressDetails.fill('#');

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).toBeVisible();
    await expect(addressDetails).toHaveValue('#');
  });
});

test.describe('Buttons', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    await expect(addProduct).toBeVisible();
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await addProduct.click();
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
  });

  test('givenClickOnCancel_thenRedirect', async ({page}) => {

    // Arrange

    const cancel = page.getByRole('button', {name: 'CANCEL'});

    // Act

    await cancel.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/');

    const badge = page.locator('#pn_id_2_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS('background-color', 'rgb(249, 115, 22)');
    await expect(badge.getByText('1')).toBeVisible();
  });

  test('givenClickOnNext_whenFormIsInvalid_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});

    // Act

    await next.click();

    // Assert

    await expect(page.getByText('Delivery address is requiered')).toBeVisible();
    await expect(page.getByText('Delivery number is requiered: four digits maximum')).toBeVisible();
  });

  test('givenClickOnNext_whenNoSelectedStore_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    const alustreDiv = page.getByTitle('Alustre Store', {exact: true});
    const viciosaDiv = page.getByTitle('Viciosa Store', {exact: true});
    const deliverySelect = page.getByLabel('Please select delivery type');
    const next = page.getByRole('button', {name: 'NEXT'});

    // Act

    await deliverySelect.selectOption('Store pick-up');
    await next.click();

    // Assert

    await expect(alustreDiv).toHaveCSS('border-color', 'rgb(185, 28, 28)');
    await expect(viciosaDiv).toHaveCSS('border-color', 'rgb(185, 28, 28)');
    await expect(page.getByText('Please select a store to continue')).toBeVisible();
  });

  test('givenClickOnNext_whenFormIsValid_thenGoToStepThree', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    // Act

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await expect(page.getByTitle('Steps')).toBeVisible();
  });

  test('givenClickOnNext_whenFormIsValid_thenSaveFormValues', async ({page}) => {

    // Arrange

    const previous = page.getByRole('button', {name: 'Previous'});
    const next = page.getByRole('button', {name: 'NEXT'});
    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('0'); // 0 = Home Delivery; 1 = Store pick-up

    // Act

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await previous.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');
    await expect(addressInput).toHaveValue('Alustre');
    await expect(addressNumberInput).toHaveValue('15');
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('0'); // 0 = Home Delivery; 1 = Store pick-up
  });

  test('givenClickOnNext_whenStoreIsSelected_thenGoToStepThree', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    const next = page.getByRole('button', {name: 'NEXT'});
    const deliverySelect = page.getByLabel('Please select delivery type');
    const alustreDiv = page.getByTitle('Alustre Store', {exact: true});
    const viciosaDiv = page.getByTitle('Viciosa Store', {exact: true});
    const alustre = page.getByTitle('Alustre', {exact: true});

    // Act

    await deliverySelect.selectOption('Store pick-up');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('1'); // 0 = Home Delivery; 1 = Store pick-up
    await alustre.click();
    await expect(alustreDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(viciosaDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await expect(page.getByTitle('Steps')).toBeVisible();
  });

  test('givenClickOnNext_whenStoreIsSelected_thenSaveSelectedStore', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    const previous = page.getByRole('button', {name: 'Previous'});
    const next = page.getByRole('button', {name: 'NEXT'});
    const deliverySelect = page.getByLabel('Please select delivery type');
    const viciosa = page.getByTitle('Viciosa', {exact: true});
    const alustreDiv = page.getByTitle('Alustre Store', {exact: true});
    const viciosaDiv = page.getByTitle('Viciosa Store', {exact: true});

    // Act

    await deliverySelect.selectOption('Store pick-up');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('1'); // 0 = Home Delivery; 1 = Store pick-up
    await viciosa.click();
    await expect(alustreDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(viciosaDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await next.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');
    await previous.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');
    await expect(alustreDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(viciosaDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('1'); // 0 = Home Delivery; 1 = Store pick-up
  });

  test('givenClickOnPrevious_whenFormIsValid_thenSaveFormValues', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    // Act

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await previous.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');
    await next.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-two');

    // Assert

    await expect(addressInput).toHaveValue('Alustre');
    await expect(addressNumberInput).toHaveValue('15');
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('0'); // 0 = Home Delivery; 1 = Store pick-up
  });

  test('givenClickOnPrevious_whenFormIsInvalid_thenDoNotSaveFormValues', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    // Act

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('1511111');
    await addressDetails.fill('Floor 5, Door 2E');
    await previous.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');
    await next.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-two');

    // Assert

    await expect(addressInput).not.toHaveValue('Alustre');
    await expect(addressNumberInput).not.toHaveValue('15');
    await expect(addressDetails).not.toHaveValue('Floor 5, Door 2E');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('0'); // 0 = Home Delivery; 1 = Store pick-up
  });

  test('givenClickOnPrevious_whenStoreIsSelected_thenSaveStore', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const deliverySelect = page.getByLabel('Please select delivery type');
    const alustre = page.getByTitle('Alustre', {exact: true});
    const alustreDiv = page.getByTitle('Alustre Store', {exact: true});
    const viciosaDiv = page.getByTitle('Viciosa Store', {exact: true});

    // Act

    await deliverySelect.selectOption('Store pick-up');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('1'); // 0 = Home Delivery; 1 = Store pick-up
    await alustre.click();
    await expect(alustreDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(viciosaDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await previous.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');
    await next.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-two');

    // Assert

    await expect(alustreDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(viciosaDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('1'); // 0 = Home Delivery; 1 = Store pick-up
  });

  test('givenClickOnPrevious_whenStoreIsNotSelected_thenNoStoreSaved', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'Previous'});
    const deliverySelect = page.getByLabel('Please select delivery type');
    const alustreDiv = page.getByTitle('Alustre Store', {exact: true});
    const viciosaDiv = page.getByTitle('Viciosa Store', {exact: true});

    // Act

    await deliverySelect.selectOption('Store pick-up');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('0'); // 0 = Home Delivery; 1 = Store pick-up
    await expect(alustreDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(viciosaDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await previous.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');
    await next.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-two');

    // Assert

    await expect(alustreDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(viciosaDiv).not.toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');
    await expect(page.getByLabel('Please select delivery type')).toHaveValue('1'); // 0 = Home Delivery; 1 = Store pick-up
  });
});
