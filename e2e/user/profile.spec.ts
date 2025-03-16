import {expect, test} from '@playwright/test';
import {AUTH_TOKEN_COOKIE, userAddressList} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 58 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/58/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.goto('/user/profile');
    expect(await page.title()).toEqual('Your Profile');
  });

  test('ShowUserNav', async ({page}) => {
    await expect(page.getByRole('link', {name: 'Profile'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Orders'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Settings'})).toBeVisible();
  });

  test('ShowUserDetails', async ({page}) => {
    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@gmail.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();
  });

  test('ShowAddressListToggleButton', async ({page}) => {
    await expect(page.getByRole('button', {name: 'My address list'})).toBeVisible();
  });

  test('ShowAddressList', async ({page}) => {

    // Arrange

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});

    // Act

    await showAddressListButton.click();

    // Assert

    await expect(page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
    await expect(page.getByTitle('Delete Address')).toBeVisible();
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();
  });
});
