import {expect, test} from '@playwright/test';
import {AUTH_TOKEN_COOKIE} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.goto('/user/profile');
    expect(await page.title()).toEqual('Your Profile');
  });

  test('ShowUserNav', async ({page}) => {
    await expect(page.getByRole('link', {name: 'Profile'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Orders'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Settings'})).toBeVisible();
  });
});

test.describe('Routes', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.goto('/user/profile');
    expect(await page.title()).toEqual('Your Profile');
  });

  test('givenClickOnOrders_goToOurders', async ({page}) => {

    // Arrange

    const ordersLink = page.getByRole('link', {name: 'Orders'});

    // Act

    await ordersLink.click();

    // Assert

    expect(page.url()).toBe('http://192.168.1.128:4200/user/orders');
  });

  test('givenClickOnSettings_goToSettings', async ({page}) => {

    // Arrange

    const settingsLink = page.getByRole('link', {name: 'Settings'});

    // Act

    await settingsLink.click();

    // Assert

    expect(page.url()).toBe('http://192.168.1.128:4200/user/settings');
  });

  test('givenClickOnProfile_whenOnSettings_goToProfile', async ({page}) => {

    // Arrange

    const settingsLink = page.getByRole('link', {name: 'Settings'});
    await settingsLink.click();
    const profileLink = page.getByRole('link', {name: 'Profile'});

    // Act

    await profileLink.click();

    // Assert

    expect(page.url()).toBe('http://192.168.1.128:4200/user/profile');
  });
});
