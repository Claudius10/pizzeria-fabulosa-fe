import {expect, test} from '@playwright/test';
import {
  AUTH_TOKEN_COOKIE,
  emptyUserOrderSummaryList,
  userOrderSummaryList,
  userOrderSummaryListManySizeFivePageOne,
  userOrderSummaryListManySizeFivePageThree,
  userOrderSummaryListManySizeFivePageTwo
} from '../../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);
  });

  test('ShowSkeletons', async ({page}) => {

    // Act

    await page.goto('/user/orders');

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);
    await expect(page.getByRole('button', {name: 'Page 1'})).not.toBeVisible();
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

    await expect(page.getByTitle('Order 1', {exact: true})).toBeVisible();
    await expect(page.getByTitle('View Order Icon')).toBeVisible();
    await expect(page.getByText('Date of order 13:44 - 16/03/').first()).toBeVisible();
    await expect(page.getByText('Total:').first()).toBeVisible();
    await expect(page.getByRole('button', {name: '13.30€'}).first()).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();
    await expect(page.getByRole('button', {name: 'Page 1'})).toBeVisible();
  });

  test('ShowOrderSummaryList_PageOne', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    // Act

    await page.goto('/user/orders');

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);

    await expect(page.getByTitle('Order 1', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 2', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 3', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 4', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 5', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: 'Page 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Page 2'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Page 3'})).toBeVisible();

    await expect(page.getByRole('button', {name: 'Page 1'})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 2'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 3'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
  });

  test('ShowOrderSummaryList_PageTwo_FromPageOne', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=1&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageTwo});
    });

    await page.goto('/user/orders');

    const pageTwoButton = page.getByRole('button', {name: 'Page 2'});

    // Act

    await pageTwoButton.click();
    expect(page.url()).toEqual('http://192.168.1.128:4200/user/orders?page=2');

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);

    await expect(page.getByTitle('Order 6', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 7', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 8', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 9', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Order 10', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: 'Page 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Page 2'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Page 3'})).toBeVisible();

    await expect(page.getByRole('button', {name: 'Page 1'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 2'})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 3'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
  });

  test('ShowOrderSummaryList_PageThree_FromPageTwo', async ({page}) => {

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

    const pageTwoButton = page.getByRole('button', {name: 'Page 2'});
    await pageTwoButton.click();
    expect(page.url()).toEqual('http://192.168.1.128:4200/user/orders?page=2');

    const pageThreeButton = page.getByRole('button', {name: 'Page 3'});

    // Act

    await pageThreeButton.click();
    expect(page.url()).toEqual('http://192.168.1.128:4200/user/orders?page=3');

    // Assert

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Order 11', {exact: true})).toBeVisible();

    await expect(page.getByTitle("Paginator")).toBeVisible();

    await expect(page.getByRole('button', {name: 'Page 1'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Page 2'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Page 3'})).toBeVisible();

    await expect(page.getByRole('button', {name: 'Page 1'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 2'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 3'})).toHaveCSS('color', 'rgb(194, 65, 12)');
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

test.describe('URL Paths', () => {
  test.beforeEach(async ({page}) => {
    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=0&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageOne});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=1&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageTwo});
    });

    await page.route('*/**/api/v1/user/58/order/summary?pageNumber=2&pageSize=5', async route => {
      await route.fulfill({json: userOrderSummaryListManySizeFivePageThree});
    });
  });

  test('givenNavigationToUrlsDirectly_thenCorrectlySetThePageNumber', async ({page}) => {

    // page 1

    await page.goto('/user/orders?page=1');

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);
    await expect(page.getByRole('button', {name: 'Page 1'})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 2'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 3'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');

    // page 2

    await page.goto('/user/orders?page=2');

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(5);
    await expect(page.getByRole('button', {name: 'Page 1'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 2'})).toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 3'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');

    // page 3

    await page.goto('/user/orders?page=3');

    await expect(page.getByTitle("Orders Summary List").getByRole('listitem')).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'Page 1'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 2'})).not.toHaveCSS('color', 'rgb(194, 65, 12)');
    await expect(page.getByRole('button', {name: 'Page 3'})).toHaveCSS('color', 'rgb(194, 65, 12)');
  });
});

test.describe('Render: API KO', () => {
  test('ShowErrorComponent', async ({page}) => {
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);
    await page.goto('/user/orders');
    expect(await page.title()).toEqual('Order History');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
