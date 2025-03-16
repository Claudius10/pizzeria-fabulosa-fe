import {expect, test} from '@playwright/test';
import {
  AUTH_TOKEN_COOKIE,
  stores,
  userOrder,
  userOrderDeleteOk,
  userOrderHomeProgrammedCashChangeComment,
  userOrderPickUp,
  userOrderStoreProgrammedCash
} from '../../api-responses';

test.describe('Render: HomeDelivery, ASAP, Card', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 58 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/58/order/1', async route => {
      await route.fulfill({json: userOrder});
    });

    await page.goto('/user/orders/1');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toEqual('Your Order');
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(await page.getByTitle('Identification Number').getByText('1')).toBeVisible();
    await expect(await page.getByTitle('Minimize')).toBeVisible();
    await expect(await page.getByText('Date of order 11:49 - 16/03/2025')).toBeVisible();
  });

  test('ShowCustomerDetails', async ({page}) => {
    await expect(await page.getByText('Customer details')).toBeVisible();
    await expect(await page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(await page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(await page.getByText('Contact number: 123456789')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(await page.getByText('Delivery details')).toBeVisible();
    await expect(await page.getByText('Selected time of delivery: As soon as posible')).toBeVisible();
    await expect(await page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(await page.getByText('Address number: 1605')).toBeVisible();
  });

  test('ShowOrderDetails', async ({page}) => {
    await expect(await page.getByText('Order details')).toBeVisible();
    await expect(await page.getByText('Selected payment method: Card')).toBeVisible();
  });

  test('ShowFooter', async ({page}) => {
    await expect(await page.getByRole("button", {name: 'Cancel'})).toBeVisible();
    await expect(await page.getByText('Important note: the order may only be cancelled within the first 10 minutes of creation.')).toBeVisible();
  });
});

test.describe('Render: StorePickUp, ASAP, Card', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 58 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/58/order/2', async route => {
      await route.fulfill({json: userOrderPickUp});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/user/orders/2');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toEqual('Your Order');
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(await page.getByTitle('Identification Number').getByText('2')).toBeVisible();
    await expect(await page.getByTitle('Minimize')).toBeVisible();
    await expect(await page.getByText('Date of order 11:56 - 16/03/2025')).toBeVisible();
  });

  test('ShowCustomerDetails', async ({page}) => {
    await expect(await page.getByText('Customer details')).toBeVisible();
    await expect(await page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(await page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(await page.getByText('Contact number: 123456789')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(await page.getByText('Delivery details')).toBeVisible();
    await expect(await page.getByText('Selected pick-up time: As soon as posible')).toBeVisible();
    await expect(await page.getByText('Selected pick-up store:')).toBeVisible();
    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Map Icon')).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByTitle('Phone Icon')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByTitle('Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM')).toBeVisible();
  });

  test('ShowOrderDetails', async ({page}) => {
    await expect(await page.getByText('Order details')).toBeVisible();
    await expect(await page.getByText('Selected payment method: Card')).toBeVisible();
  });

  test('ShowFooter', async ({page}) => {
    await expect(await page.getByRole("button", {name: 'Cancel'})).toBeVisible();
    await expect(await page.getByText('Important note: the order may only be cancelled within the first 10 minutes of creation.')).toBeVisible();
  });
});

test.describe('Render: StorePickUp, ProgrammedHour, Cash, NoChange', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 58 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/58/order/3', async route => {
      await route.fulfill({json: userOrderStoreProgrammedCash});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/user/orders/3');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toEqual('Your Order');
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(await page.getByTitle('Identification Number').getByText('3')).toBeVisible();
    await expect(await page.getByTitle('Minimize')).toBeVisible();
    await expect(await page.getByText('Date of order 11:59 - 16/03/2025')).toBeVisible();
  });

  test('ShowCustomerDetails', async ({page}) => {
    await expect(await page.getByText('Customer details')).toBeVisible();
    await expect(await page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(await page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(await page.getByText('Contact number: 123456789')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(await page.getByText('Delivery details')).toBeVisible();
    await expect(await page.getByText('Selected pick-up time: 12:05')).toBeVisible();
    await expect(await page.getByText('Selected pick-up store:')).toBeVisible();
    await expect(page.getByText('Viciosa', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Map Icon')).toBeVisible();
    await expect(page.getByText('Calle Viciosa 221')).toBeVisible();
    await expect(page.getByTitle('Phone Icon')).toBeVisible();
    await expect(page.getByText('555666555')).toBeVisible();
    await expect(page.getByTitle('Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM')).toBeVisible();
  });

  test('ShowOrderDetails', async ({page}) => {
    await expect(await page.getByText('Order details')).toBeVisible();
    await expect(await page.getByText('Selected payment method: Cash')).toBeVisible();
  });

  test('ShowFooter', async ({page}) => {
    await expect(await page.getByRole("button", {name: 'Cancel'})).toBeVisible();
    await expect(await page.getByText('Important note: the order may only be cancelled within the first 10 minutes of creation.')).toBeVisible();
  });
});

test.describe('Render: HomeDelivery, ProgrammedHour, Cash, Change, Comment', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 58 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/58/order/4', async route => {
      await route.fulfill({json: userOrderHomeProgrammedCashChangeComment});
    });

    await page.goto('/user/orders/4');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toEqual('Your Order');
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(await page.getByTitle('Identification Number').getByText('4')).toBeVisible();
    await expect(await page.getByTitle('Minimize')).toBeVisible();
    await expect(await page.getByText('Date of order 12:02 - 16/03/2025')).toBeVisible();
  });

  test('ShowCustomerDetails', async ({page}) => {
    await expect(await page.getByText('Customer details')).toBeVisible();
    await expect(await page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(await page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(await page.getByText('Contact number: 123456789')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(await page.getByText('Delivery details')).toBeVisible();
    await expect(await page.getByText('Selected time of delivery: 12:30')).toBeVisible();
    await expect(await page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(await page.getByText('Address number: 1605')).toBeVisible();
  });

  test('ShowOrderDetails', async ({page}) => {
    await expect(await page.getByText('Order details')).toBeVisible();
    await expect(await page.getByText('Selected payment method: Cash')).toBeVisible();
    await expect(await page.getByText('Bill to change: 20€')).toBeVisible();
    await expect(await page.getByText('Your change: 2€')).toBeVisible();
    await expect(await page.getByText('Comment:')).toBeVisible();
    await expect(await page.getByText('pizza well cut and hot')).toBeVisible();
  });

  test('ShowFooter', async ({page}) => {
    await expect(await page.getByRole("button", {name: 'Cancel'})).toBeVisible();
    await expect(await page.getByText('Important note: the order may only be cancelled within the first 10 minutes of creation.')).toBeVisible();
  });
});

test.describe('Cancel', () => {
  test.beforeEach(async ({page}) => {
    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);
  });

  test('givenOrderDelete_whenAllowed_thenDeleteOrder', async ({page}) => {

    // Arrange

    // fulfill initial order GET
    await page.route('*/**/api/v1/user/58/order/1', async route => {
      await route.fulfill({
        json: {
          "timeStamp": "2025-03-16T10:49:39.545213687",
          "status": {"code": 200, "description": "OK", "error": false},
          "payload": {
            "id": 1,
            "createdOn": Date.now(), // NOTE
            "updatedOn": null,
            "formattedCreatedOn": Date.now().toString(),
            "formattedUpdatedOn": null,
            "address": {"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null},
            "orderDetails": {
              "id": 1,
              "deliveryTime": "form.select.time.asap",
              "paymentMethod": "form.select.payment.method.card",
              "billToChange": null,
              "changeToGive": null,
              "comment": null,
              "storePickUp": false,
            },
            "cart": {
              "id": 1,
              "totalQuantity": 1,
              "totalCost": 13.3,
              "totalCostOffers": 0.0,
              "cartItems": [{
                "id": 41,
                "type": "pizza",
                "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
                "description": {
                  "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
                  "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
                },
                "formats": {"s": null, "m": {"en": "Medium", "es": "Mediana"}, "l": null},
                "price": 13.3,
                "quantity": 1
              }]
            }
          },
          "error": null
        }
      });
    });

    await page.goto('/user/orders/1');

    // fulfill order DELETE
    await page.route('*/**/api/v1/user/58/order/1', async route => {
      await route.fulfill({json: userOrderDeleteOk});
    });

    const cancelButton = await page.getByRole("button", {name: 'Cancel'});
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();

    const noButton = page.getByRole("button", {name: 'No'});
    const yesButton = page.getByRole("button", {name: 'Yes'});
    const closeButton = page.getByLabel('Confirmation').getByRole('button').filter({hasNotText: 'Yes'}).filter({hasNotText: 'No'});

    await expect(page.getByText('Confirmation')).toBeVisible();
    await expect(page.getByText('Do you wish to cancel the order?')).toBeVisible();
    await expect(yesButton).toBeVisible();
    await expect(noButton).toBeVisible();
    await expect(closeButton).toBeVisible();

    // Act

    await yesButton.click();

    // Assert

    await expect(page.getByRole('alert').getByText('Information')).toBeVisible();
    await expect(page.getByRole('alert').getByText('Order successfully cancelled. Redirecting in 2 seconds...')).toBeVisible();
    await page.waitForURL('http://192.168.1.128:4200/user/orders');
    await expect(page.getByText('Profile')).toBeVisible();
    expect(page.url()).toBe('http://192.168.1.128:4200/user/orders');
  });

  test('givenOrderDelete_whenNotAllowed_thenShowWarning', async ({page}) => {

    // Arrange

    const after = new Date(Date.now() - 4260000);

    await page.route('*/**/api/v1/user/58/order/1', async route => {
      await route.fulfill({
        json: {
          "timeStamp": "2025-03-16T10:49:39.545213687",
          "status": {"code": 200, "description": "OK", "error": false},
          "payload": {
            "id": 1,
            "createdOn": after, // NOTE
            "updatedOn": null,
            "formattedCreatedOn": after.toString(),
            "formattedUpdatedOn": null,
            "address": {"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null},
            "orderDetails": {
              "id": 1,
              "deliveryTime": "form.select.time.asap",
              "paymentMethod": "form.select.payment.method.card",
              "billToChange": null,
              "changeToGive": null,
              "comment": null,
              "storePickUp": false,
            },
            "cart": {
              "id": 1,
              "totalQuantity": 1,
              "totalCost": 13.3,
              "totalCostOffers": 0.0,
              "cartItems": [{
                "id": 41,
                "type": "pizza",
                "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
                "description": {
                  "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
                  "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
                },
                "formats": {"s": null, "m": {"en": "Medium", "es": "Mediana"}, "l": null},
                "price": 13.3,
                "quantity": 1
              }]
            }
          },
          "error": null
        }
      });
    });

    await page.goto('/user/orders/1');

    const cancelButton = await page.getByRole("button", {name: 'Cancel'});
    await expect(cancelButton).toBeVisible();

    // Act

    await cancelButton.click();

    // Assert

    await expect(page.getByRole('alert').getByText('Warning')).toBeVisible();
    await expect(page.getByText('The order can no longer be cancelled')).toBeVisible();
  });
});


test.describe('Minimize/Back To Order list', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 58 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/58/order/1', async route => {
      await route.fulfill({json: userOrder});
    });

    await page.goto('/user/orders/1');
    expect(await page.title()).toEqual('Your Order');
    await expect(page.getByTitle('Identification Number').getByText('1')).toBeVisible();
  });

  test('givenOrderIdOne_whenClickOnMinimize_thenRedirectToOrderListRoute', async ({page}) => {

    // Arrange

    const orderPanel = page.getByTitle('Order 1');
    await expect(orderPanel).toBeVisible();

    // Act

    await orderPanel.click();

    // Assert

    await page.waitForURL('http://192.168.1.128:4200/user/orders');
    await expect(page.getByText('Profile')).toBeVisible();
    expect(page.url()).toBe('http://192.168.1.128:4200/user/orders');
  });
});
