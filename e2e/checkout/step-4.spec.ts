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

  test('ShowSteps', async ({page}) => {
    await expect(page.getByTitle('Steps')).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'My info'}).getByText('My info')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'My info'}).getByText('1')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('Delivery location')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery location'}).getByText('2')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery time'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Delivery time'}).getByText('Delivery time')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Delivery time'}).getByText('3')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Payment method'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('Payment Method')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('4')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('Summary')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('5')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('ShowPaymentMethodSelect', async ({page}) => {
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(page.getByLabel('Please select the payment')).toBeVisible();
    await expect(page.getByLabel('Please select the payment')).toHaveValue('0'); // 0 = Card, 1 = Cash
  });

  test('ShowBillChangeSelect', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');

    // Act

    await paymentMethodChoice.selectOption('Cash');
    await expect(page.getByLabel('Please select the payment')).toHaveValue('1'); // 0 = Card, 1 = Cash

    // Assert

    await expect(page.getByText('Do you need change?')).toBeVisible();
    await expect(page.getByTitle('Change Request Icon')).toBeVisible();
    await expect(page.getByLabel('Do you need change?')).toBeVisible();
  });

  test('ShowBillChangeInput', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    const changeChoice = page.getByLabel('Do you need change?');
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card, 1 = Cash

    // Act

    await paymentMethodChoice.selectOption('Cash');
    await expect(paymentMethodChoice).toHaveValue('1'); // 0 = Card, 1 = Cash
    await changeChoice.selectOption('Yes');

    // Assert

    await expect(changeChoice).toHaveValue('1'); // 0 = No; 1 = Yes
    await expect(page.getByText('Bill to change')).toBeVisible();
    await expect(page.getByTitle('Bill Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Bill to change'})).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Bill to change'})).toHaveValue('');
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

  test('givenCardSelect_whenCashAndBillChangeSelectedAndBillInputFilled_thenHideBillSelectAndBillChangeInputReset', async ({page}) => {

    // Arrange

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    await paymentMethodChoice.selectOption('Cash');
    await expect(paymentMethodChoice).toHaveValue('1'); // 0 = Card; 1 = Cash

    const changeChoice = page.getByLabel('Do you need change?');
    await expect(changeChoice).toHaveValue('0'); // 0 = No; 1 = Yes

    // Act

    await changeChoice.selectOption('Yes');
    await expect(changeChoice).toHaveValue('1'); // 0 = No; 1 = Yes

    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await expect(billInput).toBeVisible();
    await expect(billInput).toHaveValue('');

    await billInput.fill('20');
    await expect(billInput).toHaveValue('20');

    await paymentMethodChoice.selectOption('Card'); // 0 = Card; 1 = Cash
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    await expect(page.getByText('Do you need change?')).not.toBeVisible();
    await expect(page.getByTitle('Change Request Icon')).not.toBeVisible();
    await expect(page.getByLabel('Do you need change?')).not.toBeVisible();
    await expect(page.getByText('Bill to change')).not.toBeVisible();
    await expect(page.getByTitle('Bill Icon')).not.toBeVisible();
    await expect(billInput).not.toBeVisible();

    await paymentMethodChoice.selectOption('Cash');
    await expect(paymentMethodChoice).toHaveValue('1');
    await expect(changeChoice).toHaveValue('0');
    await changeChoice.selectOption('Yes');
    await expect(changeChoice).toHaveValue('1'); // 0 = No; 1 = Yes

    // Assert

    await expect(billInput).toHaveValue('');
  });

  test('Buttons', async ({page}) => {
    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'NEXT'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();
  });
});

test.describe('Render: Small screen', () => {
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

  test('ShowStep', async ({page}) => {
    await expect(page.getByTitle('Step', {exact: true})).toBeVisible();
    await expect(page.getByText('Step 4 Payment method')).toBeVisible();
    await expect(page.getByText('Step 4 Payment method').getByText('4')).toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('DoNotShowCart', async ({page}) => {
    const badge = page.locator('#pn_id_2_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS('background-color', 'rgb(249, 115, 22)');
    await expect(badge.getByText('1')).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).not.toBeVisible();
    await expect(page.getByTitle('Cart Items')).not.toBeVisible();
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

  test('givenCardOption_thenGoToStepFiveAndSaveValues', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'PREVIOUS'});
    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(paymentMethodChoice).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    // Act

    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-five');
    await expect(page.getByTitle('Steps')).toBeVisible();
    await previous.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
    await expect(paymentMethodChoice).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash
  });

  test('givenCashOption_thenGoToStepFiveAndSaveValues', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'PREVIOUS'});
    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(paymentMethodChoice).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    // Act

    await paymentMethodChoice.selectOption('Cash');
    const changeChoice = page.getByLabel('Do you need change?');
    await expect(changeChoice).toBeVisible();
    await expect(changeChoice).toHaveValue('0'); // 0 = No; 1 = Yes

    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-five');
    await expect(page.getByTitle('Steps')).toBeVisible();
    await previous.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
    await expect(paymentMethodChoice).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('1'); // 0 = Card; 1 = Cash
    await expect(changeChoice).toHaveValue('0'); // 0 = No; 1 = Yes
  });

  test('givenCashOption_whenBillChangeValid_thenGoToStepFiveAndSaveValues', async ({page}) => {
    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'PREVIOUS'});
    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(paymentMethodChoice).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    // Act

    await paymentMethodChoice.selectOption('Cash');
    const changeChoice = page.getByLabel('Do you need change?');
    await expect(changeChoice).toBeVisible();
    await expect(changeChoice).toHaveValue('0'); // 0 = No; 1 = Yes
    await changeChoice.selectOption('Yes');
    await expect(changeChoice).toHaveValue('1'); // 0 = No; 1 = Yes

    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await expect(billInput).toHaveValue('');
    await billInput.fill('20');
    await expect(billInput).toHaveValue('20');

    await next.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/order/new/step-five');
    await expect(page.getByTitle('Steps')).toBeVisible();
    await previous.click();
    await page.waitForURL('http://192.168.1.128:4200/order/new/step-four');
    await expect(paymentMethodChoice).toHaveValue('1'); // 0 = Card; 1 = Cash
    await expect(changeChoice).toHaveValue('1'); // 0 = No; 1 = Yes
    await expect(billInput).toHaveValue('20');
  });

  test('givenCashOption_whenBillChangeInvalid_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    // Act

    await paymentMethodChoice.selectOption('Cash');
    await expect(paymentMethodChoice).toHaveValue('1'); // 0 = Card; 1 = Cash

    const changeChoice = page.getByLabel('Do you need change?');
    await expect(changeChoice).toHaveValue('0'); // 0 = No; 1 = Yes
    await changeChoice.selectOption('Yes');
    await expect(changeChoice).toHaveValue('1'); // 0 = No; 1 = Yes

    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await expect(billInput).toHaveValue('');
    await billInput.fill('10');
    await expect(billInput).toHaveValue('10');

    await next.click();

    // Assert

    await expect(page.getByText('Bill to change must be greater than the total or the total after offers')).toBeVisible();
    await billInput.fill('20');
    await expect(billInput).toHaveValue('20');
    await expect(page.getByText('Bill to change must be greater than the total or the total after offers')).not.toBeVisible();
  });

  test('givenCashOption_whenBillChangeIsEmpty_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(page.getByText('Please select the payment')).toBeVisible();
    await expect(page.getByTitle('Payment Method Icon')).toBeVisible();
    await expect(paymentMethodChoice).toBeVisible();
    await expect(paymentMethodChoice).toHaveValue('0'); // 0 = Card; 1 = Cash

    // Act

    await paymentMethodChoice.selectOption('Cash');
    await expect(paymentMethodChoice).toHaveValue('1'); // 0 = Card; 1 = Cash

    const changeChoice = page.getByLabel('Do you need change?');
    await expect(changeChoice).toHaveValue('0'); // 0 = No; 1 = Yes
    await changeChoice.selectOption('Yes');
    await expect(changeChoice).toHaveValue('1'); // 0 = No; 1 = Yes

    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await expect(billInput).toHaveValue('');

    await next.click();

    // Assert

    await expect(page.getByText('Bill to change must be greater than the total or the total after offers')).toBeVisible();
    await billInput.fill('20');
    await expect(billInput).toHaveValue('20');
    await expect(page.getByText('Bill to change must be greater than the total or the total after offers')).not.toBeVisible();
  });
});
