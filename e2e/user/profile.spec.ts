import {expect, test} from '@playwright/test';
import {AUTH_TOKEN_COOKIE} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.goto('/user/profile');
    expect(await page.title()).toEqual('Profile');
  });

  test('ShowUserDetails', async ({page}) => {
    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();
  });

  test('ShowAddressListToggleButton', async ({page}) => {
    await expect(page.getByRole('button', {name: 'My address list'})).toBeVisible();
  });
});
