import {expect, test} from '@playwright/test';
import {
  anonUserOrderSuccess,
  AUTH_TOKEN_COOKIE,
  pizzas,
  stores,
  userAddressList,
  userOrderSuccess
} from '../api-responses';

test.describe('Render: Large Screen', () => {

  test('givenAnonUserAndAddressAndAsapAndCard_thenRender', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    // step 1

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-three');

    // step 3

    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // Assert

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Clau')).toBeVisible();
    await expect(page.getByText('Email address: clau@example.')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected time of delivery: As soon as possible')).toBeVisible();
    await expect(page.getByText('Address: Alustre')).toBeVisible();
    await expect(page.getByText('Address number: 15')).toBeVisible();
    await expect(page.getByText('Address details: Floor 5, DOOR 2E')).toBeVisible();

    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Card')).toBeVisible();
    await expect(page.getByText('You may enter any comments you have regarding the order')).toBeVisible();
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'ORDER'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).toBeVisible();
    await expect(page.getByTitle('Cart Items')).toBeVisible();
    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

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
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('Payment Method')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Payment method'}).getByText('4')).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('Summary')).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('link', {name: 'Summary'}).getByText('5')).toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('givenAnonUserAndStoreAndProgrammedHourAndCashNoChange_thenRender', async ({page}) => {

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const deliverySelect = page.getByLabel('Please select delivery type');
    await deliverySelect.selectOption('Store pick-up');
    const alustre = page.getByTitle('Alustre', {exact: true});
    await alustre.click();

    await next.click();

    // step 3

    await expect(page).toHaveURL('/order/new/step-three');
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await deliveryTimeChoice.selectOption('Programmed delivery');
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');
    await deliveryHourChoice.selectOption('23:55');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await paymentMethodChoice.selectOption('Cash');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // Assert

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Clau')).toBeVisible();
    await expect(page.getByText('Email address: clau@example.')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected pick-up time: 23:55')).toBeVisible();
    await expect(page.getByText('Selected pick-up store:')).toBeVisible();

    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Alustre Map Icon')).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByTitle('Alustre Phone Icon')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByTitle('Alustre Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM').first()).toBeVisible();

    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Cash')).toBeVisible();
    await expect(page.getByText('You may enter any comments you have regarding the order')).toBeVisible();
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'ORDER'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).toBeVisible();
    await expect(page.getByTitle('Cart Items')).toBeVisible();
    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);
  });

  test('givenUserAndUserAddressAndAsapAndCashWithChange_thenRender', async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.route('*/**/api/v1/user/58/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const next = page.getByRole('button', {name: 'NEXT'});

    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const deliverySelect = page.getByLabel('Please select delivery type');
    await expect(deliverySelect).toBeVisible();
    await expect(deliverySelect).toHaveValue('0');
    const userAddress = page.getByText('Address: En un lugar de la Mancha...');
    const userAddressDiv = page.getByTitle('Address 1');
    await expect(userAddress).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
    await userAddress.click();
    await expect(userAddressDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');

    await next.click();
    await expect(page).toHaveURL('/order/new/step-three');

    // step 3

    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await expect(deliveryTimeChoice).toHaveValue('0');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await paymentMethodChoice.selectOption('Cash');
    const changeChoice = page.getByLabel('Do you need change?');
    await changeChoice.selectOption('Yes');
    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await billInput.fill('20');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // Assert

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected time of delivery: AS SOON AS POSSIBLE')).toBeVisible();
    await expect(page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();

    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Cash')).toBeVisible();
    await expect(page.getByText('Bill to change: 20€')).toBeVisible();
    await expect(page.getByText('You may enter any comments you have regarding the order')).toBeVisible();
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'ORDER'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).toBeVisible();
    await expect(page.getByTitle('Cart Items')).toBeVisible();
    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);
  });
});

test.describe('Render: Small Screen', () => {
  test.use({viewport: {width: 360, height: 760}});

  test('givenAnonUserAndAddressAndAsapAndCard_thenRender', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-three');

    // step 3

    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // Assert

    await expect(page.getByTitle('Step', {exact: true})).toBeVisible();
    await expect(page.getByText('Step 5 Summary')).toBeVisible();
    await expect(page.getByText('Step 5 Summary').getByText('5')).toHaveCSS('color', 'rgb(249, 115, 22)');

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Clau')).toBeVisible();
    await expect(page.getByText('Email address: clau@example.')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected time of delivery: As soon as possible')).toBeVisible();
    await expect(page.getByText('Address: Alustre')).toBeVisible();
    await expect(page.getByText('Address number: 15')).toBeVisible();
    await expect(page.getByText('Address details: Floor 5, DOOR 2E')).toBeVisible();

    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Card')).toBeVisible();
    await expect(page.getByText('You may enter any comments you have regarding the order')).toBeVisible();
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'ORDER'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).not.toBeVisible();
    await expect(page.getByTitle('Cart Items')).not.toBeVisible();
  });

  test('givenAnonUserAndStoreAndProgrammedHourAndCashNoChange_thenRender', async ({page}) => {

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const deliverySelect = page.getByLabel('Please select delivery type');
    await deliverySelect.selectOption('Store pick-up');
    const alustre = page.getByTitle('Alustre', {exact: true});
    await alustre.click();

    await next.click();

    // step 3

    await expect(page).toHaveURL('/order/new/step-three');
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await deliveryTimeChoice.selectOption('Programmed delivery');
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');
    await deliveryHourChoice.selectOption('23:55');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await paymentMethodChoice.selectOption('Cash');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // Assert

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Clau')).toBeVisible();
    await expect(page.getByText('Email address: clau@example.')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected pick-up time: 23:55')).toBeVisible();
    await expect(page.getByText('Selected pick-up store:')).toBeVisible();

    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Alustre Map Icon')).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByTitle('Alustre Phone Icon')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByTitle('Alustre Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM').first()).toBeVisible();

    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Cash')).toBeVisible();
    await expect(page.getByText('You may enter any comments you have regarding the order')).toBeVisible();
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'ORDER'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).not.toBeVisible();
    await expect(page.getByTitle('Cart Items')).not.toBeVisible();
  });

  test('givenUserAndUserAddressAndAsapAndCashWithChange_thenRender', async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.route('*/**/api/v1/user/58/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const next = page.getByRole('button', {name: 'NEXT'});

    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const deliverySelect = page.getByLabel('Please select delivery type');
    await expect(deliverySelect).toBeVisible();
    await expect(deliverySelect).toHaveValue('0');
    const userAddress = page.getByText('Address: En un lugar de la Mancha...');
    const userAddressDiv = page.getByTitle('Address 1');
    await expect(userAddress).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
    await userAddress.click();
    await expect(userAddressDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');

    await next.click();
    await expect(page).toHaveURL('/order/new/step-three');

    // step 3

    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await expect(deliveryTimeChoice).toHaveValue('0');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await paymentMethodChoice.selectOption('Cash');
    const changeChoice = page.getByLabel('Do you need change?');
    await changeChoice.selectOption('Yes');
    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await billInput.fill('20');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // Assert

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected time of delivery: AS SOON AS POSSIBLE')).toBeVisible();
    await expect(page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();

    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Cash')).toBeVisible();
    await expect(page.getByText('Bill to change: 20€')).toBeVisible();
    await expect(page.getByText('You may enter any comments you have regarding the order')).toBeVisible();
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'ORDER'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'PREVIOUS'})).toBeVisible();

    await expect(page.getByTitle('Checkout Cart')).not.toBeVisible();
    await expect(page.getByTitle('Cart Items')).not.toBeVisible();
  });
});

test.describe('Buttons', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.route('*/**/api/v1/user/58/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const next = page.getByRole('button', {name: 'NEXT'});

    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const deliverySelect = page.getByLabel('Please select delivery type');
    await expect(deliverySelect).toBeVisible();
    await expect(deliverySelect).toHaveValue('0');
    const userAddress = page.getByText('Address: En un lugar de la Mancha...');
    const userAddressDiv = page.getByTitle('Address 1');
    await expect(userAddress).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
    await userAddress.click();
    await expect(userAddressDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');

    await next.click();
    await expect(page).toHaveURL('/order/new/step-three');

    // step 3

    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await expect(deliveryTimeChoice).toHaveValue('0');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await paymentMethodChoice.selectOption('Cash');
    const changeChoice = page.getByLabel('Do you need change?');
    await changeChoice.selectOption('Yes');
    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await billInput.fill('20');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');
  });

  test('givenClickOnPrevious_whenCommentValid_thenSaveComment', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'PREVIOUS'});
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    // Act

    await commentBox.fill('Well cut');
    await expect(commentBox).toHaveValue('Well cut');
    await previous.click();
    await expect(page).toHaveURL('/order/new/step-four');
    await next.click();

    // Assert

    await expect(page).toHaveURL('/order/new/step-five');
    await expect(commentBox).toHaveValue('Well cut');
  });

  test('givenClickOnPrevious_whenCommentInvalid_thenDoNotSaveComment', async ({page}) => {

    // Arrange

    const next = page.getByRole('button', {name: 'NEXT'});
    const previous = page.getByRole('button', {name: 'PREVIOUS'});
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    // Act

    await expect(commentBox).toHaveValue('');
    await previous.click();
    await expect(page).toHaveURL('/order/new/step-four');
    await next.click();

    // Assert

    await expect(page).toHaveURL('/order/new/step-five');
    await expect(commentBox).toHaveValue('');
  });

  test('givenClickOnOrder_whenCommentInvalid_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const order = page.getByRole('button', {name: 'ORDER'});
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    // Act

    await commentBox.fill('%$·%$·%');
    await expect(commentBox).toHaveValue('%$·%$·%');
    await order.click();

    // Assert

    await expect(page.getByText('The comment contains forbidden symbols or has more than 150 characters')).toBeVisible();
  });
});

test.describe('Order Success', () => {
  test('givenUserAndAddressAndAsapAndCard_thenRedirectAndRender', async ({page}) => {

    // Arrange

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.route('*/**/api/v1/user/58/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.route('*/**/api/v1/user/58/order', async route => {
      await route.fulfill({json: userOrderSuccess});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const next = page.getByRole('button', {name: 'NEXT'});

    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const deliverySelect = page.getByLabel('Please select delivery type');
    await expect(deliverySelect).toBeVisible();
    await expect(deliverySelect).toHaveValue('0');
    const userAddress = page.getByText('Address: En un lugar de la Mancha...');
    const userAddressDiv = page.getByTitle('Address 1');
    await expect(userAddress).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
    await userAddress.click();
    await expect(userAddressDiv).toHaveCSS('border-color', 'color(srgb 0.976471 0.45098 0.0862745)');

    await next.click();
    await expect(page).toHaveURL('/order/new/step-three');

    // step 3

    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await expect(deliveryTimeChoice).toHaveValue('0');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await expect(paymentMethodChoice).toHaveValue('0');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // step 5

    const order = page.getByRole('button', {name: 'ORDER'});
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    // Act

    await order.click();

    // Assert
    await expect(page).toHaveURL('/order/success');
    await expect(page.getByText('Order 1 successfully created')).toBeVisible();
    await expect(page.getByText('Date of order 18:22 - 19/03/2025')).toBeVisible();

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected time of delivery: AS SOON AS POSSIBLE')).toBeVisible();
    await expect(page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();

    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Card')).toBeVisible();

    await expect(page.getByTitle('Order Success Cart')).toBeVisible();
    await expect(page.getByTitle('Cart Items')).toBeVisible();
    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Times Icon')).toBeVisible();
    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
  });

  test('givenAnonUserAndStoreAndProgrammedHourAndCash_thenRedirectAndRender', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/anon/order', async route => {
      await route.fulfill({json: anonUserOrderSuccess});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const productDetails = page.getByTitle('Gluten Free Details').getByRole('button');
    const addProduct = page.getByTitle('Add to Cart').getByRole('button');
    const cartButton = page.getByRole('button', {name: 'Open Cart'});

    await productDetails.click();
    await addProduct.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
    await cartButton.click();

    const checkout = page.getByRole('button', {name: 'PROCEED TO CHECKOUT'});
    await checkout.click();
    await expect(page).toHaveURL('/order/new/step-one');

    // step 1

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const next = page.getByRole('button', {name: 'NEXT'});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-two');

    // step 2

    const deliverySelect = page.getByLabel('Please select delivery type');
    await deliverySelect.selectOption('Store pick-up');
    const alustre = page.getByTitle('Alustre', {exact: true});
    await alustre.click();

    await next.click();

    // step 3

    await expect(page).toHaveURL('/order/new/step-three');
    const deliveryTimeChoice = page.getByLabel('Please select delivery time');
    await deliveryTimeChoice.selectOption('Programmed delivery');
    const deliveryHourChoice = page.getByLabel('Please select delivery hour');
    await deliveryHourChoice.selectOption('23:55');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-four');

    // step 4

    const paymentMethodChoice = page.getByLabel('Please select the payment');
    await paymentMethodChoice.selectOption('Cash');
    const changeChoice = page.getByLabel('Do you need change?');
    await changeChoice.selectOption('Yes');
    const billInput = page.getByRole('textbox', {name: 'Bill to change'});
    await billInput.fill('20');
    await next.click();
    await expect(page).toHaveURL('/order/new/step-five');

    // step 5

    const order = page.getByRole('button', {name: 'ORDER'});
    const commentBox = page.getByLabel('You may enter any comments you have regarding the order');
    await expect(commentBox).toBeVisible();
    await expect(commentBox).toHaveValue('');

    // Act

    await commentBox.fill('Well cut');
    await expect(commentBox).toHaveValue('Well cut');
    await order.click();

    // Assert
    await expect(page).toHaveURL('/order/success');
    await expect(page.getByText('Order 2 successfully created')).toBeVisible();
    await expect(page.getByText('Date of order 19:16 - 19/03/2025')).toBeVisible();

    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Clau')).toBeVisible();
    await expect(page.getByText('Email address: clau@example.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();

    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected pick-up time: 23:55')).toBeVisible();
    await expect(page.getByText('Selected pick-up store:')).toBeVisible();
    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Alustre Map Icon')).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByTitle('Alustre Phone Icon')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByTitle('Alustre Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM').first()).toBeVisible();


    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Cash')).toBeVisible();
    await expect(page.getByText('Bill to change: 20€')).toBeVisible();
    await expect(page.getByText('Your change: 6.7€')).toBeVisible();
    await expect(page.getByText('Comment:')).toBeVisible();
    await expect(page.getByText('Well cut')).toBeVisible();

    await expect(page.getByText('Create your account and enjoy the order history, modify your orders before they arrive, and place orders more conveniently.')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Registration Page'})).toBeVisible();

    await expect(page.getByTitle('Order Success Cart')).toBeVisible();
    await expect(page.getByTitle('Cart Items')).toBeVisible();
    await expect(page.getByTitle("Cart Items").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Times Icon')).toBeVisible();
    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
  });
});
