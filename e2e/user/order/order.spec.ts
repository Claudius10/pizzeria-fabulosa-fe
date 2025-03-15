import {expect, test} from '@playwright/test';
import {AUTH_TOKEN_COOKIE, userOrder} from '../../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 58 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/58/order/1', async route => {
      await route.fulfill({json: userOrder});
    });

    // await page.route('*/**/api/v1/resource/store', async route => {
    //   await route.fulfill({json: store});
    // });

    await page.goto('/user/orders/1');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toEqual('Your Order');
  });

  test('showCartItemName', async ({page}) => {
    await expect(await page.getByText('Cuatro Quesos')).toBeVisible({timeout: 10_000});
  });
});
