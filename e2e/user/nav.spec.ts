import {expect, test} from '@playwright/test';
import {userinfo} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.goto('/');

    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();

    expect(await page.title()).toBe('Profile');
  });

  test('ShowUserNav', async ({page}) => {
    await expect(page.getByRole('link', {name: 'Profile'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Orders'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Settings'})).toBeVisible();
  });
});

test.describe('Routes', () => {
  test.beforeEach(async ({page}) => {

    await page.route('*/**/userinfo', async route => {
      await route.fulfill({json: userinfo});
    });

    await page.goto('/');

    const userHomeButton = page.getByRole('button', {name: 'User Home Page'});
    await expect(userHomeButton).toBeVisible();
    await userHomeButton.click();

    expect(await page.title()).toBe('Profile');
  });

  test('givenClickOnOrders_goToOurders', async ({page}) => {

    // Arrange

    const ordersLink = page.getByRole('link', {name: 'Orders'});

    // Act

    await ordersLink.click();

    // Assert

    await expect(page).toHaveURL('/user/orders');
  });

  test('givenClickOnSettings_goToSettings', async ({page}) => {

    // Arrange

    const settingsLink = page.getByRole('link', {name: 'Settings'});

    // Act

    await settingsLink.click();

    // Assert

    await expect(page).toHaveURL('/user/settings');
  });

  test('givenClickOnProfile_whenOnSettings_goToProfile', async ({page}) => {

    // Arrange

    const settingsLink = page.getByRole('link', {name: 'Settings'});
    await settingsLink.click();
    const profileLink = page.getByRole('link', {name: 'Profile'});

    // Act

    await profileLink.click();

    // Assert

    await expect(page).toHaveURL('/user/profile');
  });
});
