// TODO
import {expect, test} from '@playwright/test';
import {AUTH_TOKEN_COOKIE} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.goto('/user/settings');
    expect(await page.title()).toEqual('Account Settings');
  });

  test('ShowDeleteAccount', async ({page}) => {
    await expect(page.getByText('Delete account')).toBeVisible();
  });
});
