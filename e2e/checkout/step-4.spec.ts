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

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');

    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
  });

  test('ShowPaymentMethodSelect', async ({page}) => {
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(page.getByLabel('Please select the payment')).toBeVisible();
  });

  test('ShowBillChangeSelect', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');

    // Act

    await paymentMethodChoice.selectOption('Cash');

    // Assert

    await expect(page.getByText('Do you need change?')).toBeVisible();
    await expect(page.getByTitle('Change Request Icon')).toBeVisible();
    await expect(page.getByLabel('Do you need change?')).toBeVisible();
  });

  test('ShowBillChangeInput', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    const changeChoice = page.getByLabel('Do you need change?');

    // Act

    await paymentMethodChoice.selectOption('Cash');
    await changeChoice.selectOption('Yes');

    // Assert

    await expect(page.getByText('Bill to change')).toBeVisible();
    await expect(page.getByTitle('Bill Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Bill to change'})).toBeVisible();
  });

  test('givenCardSelect_whenCashSelected_thenHideBillChangeSelect', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(paymentMethodChoice).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    // Act

    await paymentMethodChoice.selectOption('Cash');
    await expect(paymentMethodChoice).toHaveValue('1'); // 0 = Card; 1 = Cash
    await expect(page.getByText('Do you need change?')).toBeVisible();
    await expect(page.getByTitle('Change Request Icon')).toBeVisible();
    await expect(page.getByLabel('Do you need change?')).toBeVisible();
    await paymentMethodChoice.selectOption('0'); // 0 = Card; 1 = Cash

    // Assert

    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash
    await expect(page.getByText('Do you need change?')).not.toBeVisible();
    await expect(page.getByTitle('Change Request Icon')).not.toBeVisible();
    await expect(page.getByLabel('Do you need change?')).not.toBeVisible();
  });

  test('givenCardSelect_whenCashSelectedAndBillChangeSelected_thenHideBillChangeSelectAndBillChangeInput', async ({page}) => {

    // Arrange


    // Act


    // Assert

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

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-three');

    await next.click();

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
  });

  test('ShowPaymentMethodSelect', async ({page}) => {
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(page.getByLabel('Please select the payment')).toBeVisible();
  });

  test('ShowBillChangeSelect', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');

    // Act

    await paymentMethodChoice.selectOption('Cash');

    // Assert

    await expect(page.getByText('Do you need change?')).toBeVisible();
    await expect(page.getByTitle('Change Request Icon')).toBeVisible();
    await expect(page.getByLabel('Do you need change?')).toBeVisible();
  });

  test('ShowBillChangeInput', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    const changeChoice = page.getByLabel('Do you need change?');

    // Act

    await paymentMethodChoice.selectOption('Cash');
    await changeChoice.selectOption('Yes');

    // Assert

    await expect(page.getByText('Bill to change')).toBeVisible();
    await expect(page.getByTitle('Bill Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Bill to change'})).toBeVisible();

  });

  test('Buttons', async ({page}) => {
    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'NEXT'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();
  });
});
