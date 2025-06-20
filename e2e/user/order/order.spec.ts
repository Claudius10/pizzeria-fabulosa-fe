import {expect, test} from '@playwright/test';
import {stores, userinfo, userOrder, userOrderDeleteOk, userOrderHomeProgrammedCashChangeComment, userOrderPickUp, userOrderStoreProgrammedCash, userOrderSummaryList} from '../../api-responses';

test.describe('Render: Skeleton', () => {
  test('ShowSkeleton', async ({page}) => {

    // Arrange

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.route('*/**/api/v1/order/summary?pageNumber=0&pageSize=5&userId=1', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    // Act

    // go to profile
    await page.goto('/');
    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();
    expect(await page.title()).toBe('Profile');

    // go to orders
    const ordersButton = page.getByRole('link', {name: 'Orders'});
    await ordersButton.click();
    expect(await page.title()).toBe('Order History');

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();

    // Assert

    await expect(page.getByTitle('Skeleton One').locator('div')).toBeVisible();
    await expect(page.getByTitle('Skeleton Two').locator('div')).toBeVisible();
    await expect(page.getByTitle('Skeleton Three').locator('div')).toBeVisible();
    await expect(page.getByTitle('Skeleton Four').locator('div')).toBeVisible();

    await expect(page.getByTitle('Skeleton Cancel').locator('div')).toBeVisible();
    await expect(page.getByTitle('Skeleton Note').locator('div')).toBeVisible();
    await expect(page.getByTitle('Skeleton Cart').locator('div')).toBeVisible();
  });
});

test.describe('Render: HomeDelivery, ASAP, Card', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.route('*/**/api/v1/order/summary?pageNumber=0&pageSize=5&userId=1', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    await page.route('*/**/api/v1/order/1', async route => {
      await route.fulfill({json: userOrder});
    });

    // go to profile
    await page.goto('/');
    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();
    expect(await page.title()).toBe('Profile');

    // go to orders
    const ordersButton = page.getByRole('link', {name: 'Orders'});
    await ordersButton.click();
    expect(await page.title()).toBe('Order History');

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toBe('Order Review');
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(page.getByTitle('Identification Number').getByText('1')).toBeVisible();
    await expect(page.getByTitle('Minimize')).toBeVisible();
    await expect(page.getByText('Date of order 11:49 - 16/03/2025')).toBeVisible();
  });

  test('ShowCustomerDetails', async ({page}) => {
    await expect(page.getByText('Customer details')).toBeVisible();
    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@example.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected time of delivery: As soon as possible')).toBeVisible();
    await expect(page.getByText('Address: En un lugar de la Mancha 1605')).toBeVisible();
  });

  test('ShowOrderDetails', async ({page}) => {
    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Card')).toBeVisible();
  });

  test('ShowViewOnlyCartItem', async ({page}) => {
    await expect(page.getByTitle('Price').getByRole('button').getByText('13.30€')).toBeVisible();
    await expect(page.getByTitle('Times Icon')).toBeVisible();
    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
  });

  test('ShowFooter', async ({page}) => {
    await expect(page.getByRole("button", {name: 'Cancel'})).toBeVisible();
    await expect(page.getByText('Important note: the order may only be cancelled within the first 10 minutes of creation.')).toBeVisible();
  });
});

test.describe('Render: StorePickUp, ASAP, Card', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.route('*/**/api/v1/order/summary?pageNumber=0&pageSize=5&userId=1', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    await page.route('*/**/api/v1/order/1', async route => {
      await route.fulfill({json: userOrderPickUp});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    // go to profile
    await page.goto('/');
    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();
    expect(await page.title()).toBe('Profile');

    // go to orders
    const ordersButton = page.getByRole('link', {name: 'Orders'});
    await ordersButton.click();
    expect(await page.title()).toBe('Order History');

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(page.getByTitle('Identification Number').getByText('1')).toBeVisible();
    await expect(page.getByTitle('Minimize')).toBeVisible();
    await expect(page.getByText('Date of order 11:56 - 16/03/2025')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected pick-up time: As soon as possible')).toBeVisible();
    await expect(page.getByText('Selected pick-up store:')).toBeVisible();
    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Map Icon')).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByTitle('Phone Icon')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByTitle('Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM')).toBeVisible();
  });

  test('ShowViewOnlyCartItem', async ({page}) => {
    await expect(page.getByTitle('Times Icon').first()).toBeVisible();
    await expect(page.getByTitle('Times Icon').nth(1)).toBeVisible();
  });
});

test.describe('Render: StorePickUp, ProgrammedHour, Cash, NoChange', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.route('*/**/api/v1/order/summary?pageNumber=0&pageSize=5&userId=1', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    await page.route('*/**/api/v1/order/1', async route => {
      await route.fulfill({json: userOrderStoreProgrammedCash});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    // go to profile
    await page.goto('/');
    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();
    expect(await page.title()).toBe('Profile');

    // go to orders
    const ordersButton = page.getByRole('link', {name: 'Orders'});
    await ordersButton.click();
    expect(await page.title()).toBe('Order History');

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(page.getByTitle('Identification Number').getByText('1')).toBeVisible();
    await expect(page.getByTitle('Minimize')).toBeVisible();
    await expect(page.getByText('Date of order 11:59 - 16/03/2025')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected pick-up time: 12:05')).toBeVisible();
    await expect(page.getByText('Selected pick-up store:')).toBeVisible();
    await expect(page.getByText('Viciosa', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Map Icon')).toBeVisible();
    await expect(page.getByText('Calle Viciosa 221')).toBeVisible();
    await expect(page.getByTitle('Phone Icon')).toBeVisible();
    await expect(page.getByText('555666555')).toBeVisible();
    await expect(page.getByTitle('Schedule Icon')).toBeVisible();
    await expect(page.getByText('Monday to Sunday - 12PM to 12AM')).toBeVisible();
  });

  test('ShowOrderDetails', async ({page}) => {
    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Cash')).toBeVisible();
  });
});

test.describe('Render: HomeDelivery, ProgrammedHour, Cash, Change, Comment', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.route('*/**/api/v1/order/summary?pageNumber=0&pageSize=5&userId=1', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    await page.route('*/**/api/v1/order/1', async route => {
      await route.fulfill({json: userOrderHomeProgrammedCashChangeComment});
    });

    // go to profile
    await page.goto('/');
    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();
    expect(await page.title()).toBe('Profile');

    // go to orders
    const ordersButton = page.getByRole('link', {name: 'Orders'});
    await ordersButton.click();
    expect(await page.title()).toBe('Order History');

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();
  });

  test('ShowOrderPanel', async ({page}) => {
    await expect(page.getByTitle('Identification Number').getByText('1')).toBeVisible();
    await expect(page.getByTitle('Minimize')).toBeVisible();
    await expect(page.getByText('Date of order 12:02 - 16/03/2025')).toBeVisible();
  });

  test('ShowDeliveryDetails', async ({page}) => {
    await expect(page.getByText('Delivery details')).toBeVisible();
    await expect(page.getByText('Selected time of delivery: 12:30')).toBeVisible();
    await expect(page.getByText('Address: En un lugar de la Mancha 1605')).toBeVisible();
  });

  test('ShowOrderDetails', async ({page}) => {
    await expect(page.getByText('Order details')).toBeVisible();
    await expect(page.getByText('Selected payment method: Cash')).toBeVisible();
    await expect(page.getByText('Bill to change: 20€')).toBeVisible();
    await expect(page.getByText('Your change: 2€')).toBeVisible();
    await expect(page.getByText('Comment:')).toBeVisible();
    await expect(page.getByText('pizza well cut and hot')).toBeVisible();
  });
});

test.describe('Cancel', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.route('*/**/api/v1/order/summary?pageNumber=0&pageSize=5&userId=1', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    await page.route('*/**/api/v1/order/1', async route => {
      await route.fulfill({json: userOrderHomeProgrammedCashChangeComment});
    });

    // go to profile
    await page.goto('/');
    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();
    expect(await page.title()).toBe('Profile');

    // go to orders
    const ordersButton = page.getByRole('link', {name: 'Orders'});
    await ordersButton.click();
    expect(await page.title()).toBe('Order History');
  });

  test('givenOrderDelete_whenAllowed_thenDeleteOrder', async ({page}) => {

    // Arrange

    await page.route('*/**/api/order/1', async route => {
      if (route.request().method() === 'GET') {
        await route.fulfill({json: userOrder});
      }

      if (route.request().method() === 'DELETE') {
        await route.fulfill({json: userOrderDeleteOk});
      }
    });

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();

    await expect(page).toHaveURL('/user/orders/1');

    const cancelButton = page.getByRole("button", {name: 'Cancel'});
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
    await expect(page.getByRole('alert').getByText('Order cancelled. Redirecting in 2 seconds...')).toBeVisible();
    await page.waitForURL('http://127.0.0.1:4200/user/orders');
    await expect(page.getByText('Profile')).toBeVisible();
    expect(page.url()).toBe('http://127.0.0.1:4200/user/orders');
  });

  test('givenOrderDelete_whenNotAllowed_thenShowWarning', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/order/1', async route => {
      if (route.request().method() === 'GET') {
        await route.fulfill({json: userOrder});
      }

      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          json: {
            "apiError": {
              "id": 2791732487339788000,
              "cause": "InvalidOrderDeleteTime",
              "message": "InvalidOrderDeleteTime",
              "origin": "UserOrdersController",
              "path": null,
              "logged": false,
              "fatal": false,
              "createdOn": "2025-05-19T23:41:03.626133706"
            }
          },
          status: 400
        });
      }
    });

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();

    const cancelButton = page.getByRole("button", {name: 'Cancel'});
    await expect(cancelButton).toBeVisible();

    // Act

    await cancelButton.click();
    await page.getByRole('button', {name: 'Yes'}).click();

    // Assert

    await expect(page.getByRole('alert').getByText('Warning')).toBeVisible();
    await expect(page.getByText('The order cannot be canceled 10 minutes after creation')).toBeVisible();
    await expect(page.getByRole('alertdialog', {name: 'Confirmation'})).not.toBeVisible();
  });

  test('givenOrderDelete_whenApiIsDown_thenShowErrorMessage', async ({page}) => {

    // Arrange

    // fulfill initial order GET
    await page.route('*/**/api/v1/order/1', async route => {
      if (route.request().method() === 'DELETE') {
        // do not fulfill delete
        await route.abort();
      } else {
        await route.fulfill({json: userOrder});
      }
    });

    // click the order summary item
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();
    await item.click();

    const cancelButton = page.getByRole("button", {name: 'Cancel'});
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

    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Our servers are not available at the moment. Please try again later')).toBeVisible();
    await expect(yesButton).not.toBeVisible();
  });
});


test.describe('Minimize/Back To Order list', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.route('*/**/api/v1/order/summary?pageNumber=0&pageSize=5&userId=1', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    await page.route('*/**/api/v1/order/1', async route => {
      await route.fulfill({json: userOrderHomeProgrammedCashChangeComment});
    });

    // go to profile
    await page.goto('/');
    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();
    expect(await page.title()).toBe('Profile');

    // go to orders
    const ordersButton = page.getByRole('link', {name: 'Orders'});
    await ordersButton.click();
    expect(await page.title()).toBe('Order History');
  });

  test('givenOrderIdOne_whenClickOnMinimize_thenRedirectToOrderListRoute', async ({page}) => {

    // Arrange

    const orderPanel = page.getByTitle('Order 1', {exact: true});
    await expect(orderPanel).toBeVisible();
    await orderPanel.click();
    await page.waitForURL('http://127.0.0.1:4200/user/orders/1');

    // Act

    await orderPanel.click();

    // Assert

    await page.waitForURL('http://127.0.0.1:4200/user/orders');
    await expect(page.getByText('Profile')).toBeVisible();
    expect(page.url()).toBe('http://127.0.0.1:4200/user/orders');
  });
});
