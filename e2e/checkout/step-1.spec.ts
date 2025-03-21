import {expect, test} from '@playwright/test';
import {pizzas} from '../api-responses';

test.describe('Render: Large Screen', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    await page.waitForURL('http://192.168.1.128:4200/pizzas');

    const addProduct = page.getByTitle('Add Cuatro Quesos').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await addProduct.click();
    await cartButton.click();
    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    expect(page.url()).toBe('http://192.168.1.128:4200/order/new/step-one');
  });

  test('ShowSteps', async ({page}) => {
    await expect(page.getByTitle('Steps')).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'}).getByText('My info')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'My info'}).getByText('1')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('Delivery location')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('2')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
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

  test('ShowForm', async ({page}) => {
    await expect(page.getByTitle('Full Name Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Full name'})).toBeVisible();

    await expect(page.getByTitle('Email Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Email', exact: true})).toBeVisible();

    await expect(page.getByTitle('Phone Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Contact Number'})).toBeVisible();
  });

  test('ShowCart', async ({page}) => {
    await expect(page.getByTitle('Checkout Cart')).toBeVisible();
    await expect(page.getByTitle('Cart Items')).toBeVisible();
    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);
  });

  test('Buttons', async ({page}) => {
    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'NEXT'})).toBeVisible();
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
  });

  test('ShowStep', async ({page}) => {
    await expect(page.getByTitle('Step', {exact: true})).toBeVisible();
    await expect(page.getByText('Step 1 My info')).toBeVisible();
    await expect(page.getByText('Step 1 My info').getByText('1')).toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('ShowForm', async ({page}) => {
    await expect(page.getByTitle('Full Name Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Full name'})).toBeVisible();

    await expect(page.getByTitle('Email Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Email', exact: true})).toBeVisible();

    await expect(page.getByTitle('Phone Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Contact Number'})).toBeVisible();
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
  });
});

test.describe('Validation: Full Name', () => {
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
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await fullNameInput.fill('');
    await form.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).toBeVisible();
    await expect(fullNameInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await fullNameInput.fill('A');
    await form.click();


    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).toBeVisible();
    await expect(fullNameInput).toHaveValue('A');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await fullNameInput.fill('Aa');
    await form.click();


    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).not.toBeVisible();
    await expect(fullNameInput).toHaveValue('Aa');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await fullNameInput.fill('A');
    await expect(fullNameInput).toHaveValue('A');
    await form.click();

    await expect(page.getByText('Name is required: minimum length is two')).toBeVisible();
    await fullNameInput.fill('Clau');

    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).not.toBeVisible();
    await expect(fullNameInput).toHaveValue('Clau');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await fullNameInput.fill('Clau');
    await expect(fullNameInput).toHaveValue('Clau');
    await form.click();

    await expect(page.getByText('Name is required: minimum length is two')).not.toBeVisible();
    await fullNameInput.fill('C');

    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).toBeVisible();
    await expect(fullNameInput).toHaveValue('C');
  });
});

test.describe('Validation: Email', () => {
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
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await emailInput.fill('');
    await form.click();

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await emailInput.fill('email@');
    await form.click();

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('email@');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await emailInput.fill('email@gmail.com');
    await form.click();


    // Assert

    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(emailInput).toHaveValue('email@gmail.com');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await emailInput.fill('email');
    await expect(emailInput).toHaveValue('email');
    await form.click();
    await expect(page.getByText('Email is requiered')).toBeVisible();
    await emailInput.fill('clau@gmail.com');

    // Assert

    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(emailInput).toHaveValue('clau@gmail.com');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await emailInput.fill('clau@gmail.com');
    await expect(emailInput).toHaveValue('clau@gmail.com');
    await form.click();
    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await emailInput.fill('email');

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('email');
  });
});

test.describe('Validation: Contact Number', () => {
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
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await contactNumber.fill('');
    await form.click();

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await expect(contactNumber).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await contactNumber.fill('12345678');
    await form.click();

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await expect(contactNumber).toHaveValue('12345678');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await contactNumber.fill('123456789');
    await form.click();

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).not.toBeVisible();
    await expect(contactNumber).toHaveValue('123456789');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await contactNumber.fill('12345678');
    await expect(contactNumber).toHaveValue('12345678');
    await form.click();
    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await contactNumber.fill('123456789');

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).not.toBeVisible();
    await expect(contactNumber).toHaveValue('123456789');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const form = page.getByTitle('Form', {exact: true});

    // Act

    await contactNumber.fill('123456789');
    await expect(contactNumber).toHaveValue('123456789');
    await form.click();
    await expect(page.getByText('Contact number must contain exactly nine digits')).not.toBeVisible();
    await contactNumber.fill('12345678');

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await expect(contactNumber).toHaveValue('12345678');
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

  test('givenCheckout_whenCancelledWithFormFieldFilled_thenCheckoutFormIsReset', async ({page}) => {

    // Arrange

    const cancel = page.getByRole('button', {name: 'CANCEL'});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    await contactNumber.fill('123456789');
    await expect(contactNumber).toHaveValue('123456789');
    await cancel.click();
    const cartButton = page.getByRole('button', {name: 'Open Cart'});
    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});

    // Act

    await cartButton.click();
    await checkout.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-one');
    await expect(contactNumber).not.toHaveValue('123456789');
  });

  test('givenClickOnNext_whenFormIsInvalid_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});

    // Act

    await next.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).toBeVisible();
    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
  });

  test('givenClickOnNext_whenFormIsValid_thenGoToStepTwo', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    // Act

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-two');
    await expect(page.getByTitle('Steps')).toBeVisible();
  });
});
