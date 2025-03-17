import {expect, test} from '@playwright/test';
import {
  AUTH_TOKEN_COOKIE,
  emptyUserOrderSummaryList,
  userOrderSummaryList,
  userOrderSummaryListManySizeFivePageOne,
  userOrderSummaryListManySizeFivePageThree,
  userOrderSummaryListManySizeFivePageTwo,
  userOrderSummaryListManySizeTenPageOne,
  userOrderSummaryListManySizeTenPageTwo,
  userOrderSummaryListManySizeTwenty
} from '../../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);
  });

  test('ShowEmptyOrderSummaryList', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: emptyUserOrderSummaryList});
    });

    // Act

    await page.goto('/user/orders');

    // Assert

    await expect(page.getByText("Place your first order and it will appear here!")).toBeVisible();
    await expect(page.getByTitle("Paginator")).toBeVisible();
  });

  test('ShowOrderSummaryList', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    // Act

    await page.goto('/user/orders');

    // Assert

    await expect(page.locator('p-card').getByText('1', {exact: true})).toBeVisible();

    await expect(page.getByTitle('View Order Icon')).toBeVisible();
    await expect(page.getByText('Date of order 13:44 - 16/03/').first()).toBeVisible();
    await expect(page.getByText('Total:').first()).toBeVisible();
    await expect(page.getByRole('button', {name: '13.30€'}).first()).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('5')).toBeVisible();
  });

  test('ShowOrderSummaryList_SizeFive_PageOne', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    // Act

    await page.goto('/user/orders');

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);

    await expect(page.locator('p-card').getByText('1', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('2', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('3', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('4', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('5', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '2', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '3', exact: true})).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '2', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '3', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('5')).toBeVisible();
  });

  test('ShowOrderSummaryList_SizeFive_PageTwo_FromPageOne', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=1&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageTwo});
    });

    await page.goto('/user/orders');

    const pageTwoButton = page.getByRole('button', {name: '2', exact: true});

    // Act

    await pageTwoButton.click();

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);

    await expect(page.locator('p-card').getByText('6', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('7', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('8', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('9', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('10', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '2', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '3', exact: true})).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '2', exact: true})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '3', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('5')).toBeVisible();
  });

  test('ShowOrderSummaryList_SizeFive_PageThree_FromPageTwo', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=1&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageTwo});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=2&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageThree});
    });

    await page.goto('/user/orders');

    const pageTwoButton = page.getByRole('button', {name: '2', exact: true});
    await pageTwoButton.click();

    const pageThreeButton = page.getByRole('button', {name: '3', exact: true});

    // Act

    await pageThreeButton.click();

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(1);

    await expect(page.locator('p-card').getByText('11', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '2', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '3', exact: true})).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '2', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '3', exact: true})).toHaveCSS('color', 'rgb(194, 65, 12)');

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('5')).toBeVisible();
  });

  test('ShowOrderSummaryList_SizeTen_PageOne', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=10', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeTenPageOne});
    });

    await page.goto('/user/orders');

    const pageSizeSelect = page.getByRole('button', {name: 'dropdown trigger'});
    const sizeTen = page.getByRole('option', {name: '10'});

    // Act

    await pageSizeSelect.click();
    await expect(page.getByRole('listbox', {name: 'Option List'})).toBeVisible();
    await expect(sizeTen).toBeVisible();
    await sizeTen.click();

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(10);

    await expect(page.locator('p-card').getByText('1', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('2', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('3', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('4', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('5', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('6', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('7', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('8', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('9', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('10', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '2', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '3', exact: true})).not.toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '2', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('10')).toBeVisible();
    await expect(page.getByRole('listbox', {name: 'Option List'})).not.toBeVisible();
  });

  test('ShowOrderSummaryList_SizeTen_PageTwo_fromPageOne', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=10', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeTenPageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=1&pageSize=10', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeTenPageTwo});
    });

    await page.goto('/user/orders');

    const pageTwoButton = page.getByRole('button', {name: '2', exact: true});
    const pageSizeSelect = page.getByRole('button', {name: 'dropdown trigger'});
    const sizeTen = page.getByRole('option', {name: '10'});
    await pageSizeSelect.click();
    await expect(page.getByRole('listbox', {name: 'Option List'})).toBeVisible();
    await expect(sizeTen).toBeVisible();
    await sizeTen.click();

    // Act

    await pageTwoButton.click();

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(1);

    await expect(page.locator('p-card').getByText('11', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '2', exact: true})).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '2', exact: true})).toHaveCSS('color', 'rgb(194, 65, 12)');

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('10')).toBeVisible();
    await expect(page.getByRole('listbox', {name: 'Option List'})).not.toBeVisible();
  });

  test('ShowOrderSummaryList_SizeTwenty', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=20', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeTwenty});
    });

    await page.goto('/user/orders');

    const pageSizeSelect = page.getByRole('button', {name: 'dropdown trigger'});
    const sizeTwenty = page.getByRole('option', {name: '20'});
    await pageSizeSelect.click();
    await expect(page.getByRole('listbox', {name: 'Option List'})).toBeVisible();
    await expect(sizeTwenty).toBeVisible();

    // Act

    await sizeTwenty.click();

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(11);

    await expect(page.locator('p-card').getByText('1', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('2', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('3', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('4', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('5', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('6', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('7', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('8', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('9', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('10', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('11', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '2', exact: true})).not.toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toHaveCSS('color', 'rgb(194, 65, 12)');

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('20')).toBeVisible();
    await expect(page.getByRole('listbox', {name: 'Option List'})).not.toBeVisible();
  });

  test('ShowOrderSummaryList_SizeFive_FromSizeTwenty', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=20', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeTwenty});
    });

    await page.goto('/user/orders');

    const pageSizeSelect = page.getByRole('button', {name: 'dropdown trigger'});

    const sizeTwenty = page.getByRole('option', {name: '20'});


    await pageSizeSelect.click();
    await expect(page.getByRole('listbox', {name: 'Option List'})).toBeVisible();
    await expect(sizeTwenty).toBeVisible();

    await sizeTwenty.click();
    await expect(page.getByRole('listbox', {name: 'Option List'})).not.toBeVisible();

    // Act

    const sizeFive = page.getByRole('option', {name: '5'});
    await pageSizeSelect.click();
    await expect(sizeFive).toBeVisible();
    await sizeFive.click();

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);

    await expect(page.locator('p-card').getByText('1', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('2', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('3', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('4', {exact: true})).toBeVisible();
    await expect(page.locator('p-card').getByText('5', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '2', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '3', exact: true})).toBeVisible();

    await expect(page.getByRole('button', {name: '1', exact: true})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '2', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: '3', exact: true})).not.toHaveCSS('color', 'rgb(194, 65, 12)');

    await expect(page.getByRole('combobox', {name: 'Rows per page'}).getByText('5')).toBeVisible();
    await expect(page.getByRole('listbox', {name: 'Option List'})).not.toBeVisible();
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({page}) => {
    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);
  });

  test('givenOrderSummaryItem_whenClickOnItem_thenGoToOrderRoute', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryList});
    });

    await page.goto('/user/orders');
    await expect(page.locator('p-card').getByText('1', {exact: true})).toBeVisible();
    const item = page.getByTitle('Order 1 Summary');
    await expect(item).toBeVisible();

    // Act

    await item.click();

    // Assert

    expect(page.url()).toBe('http://192.168.1.128:4200/user/orders/1');
  });
});

test.describe('Render: API KO', () => {
  test('ShowErrorComponent', async ({page}) => {
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);
    await page.goto('/user/orders');
    expect(await page.title()).toEqual('Your Orders');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
