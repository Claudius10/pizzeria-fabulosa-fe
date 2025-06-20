import {expect, test} from '@playwright/test';
import {userinfo} from '../../api-responses';

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

    const settingsButton = page.getByRole('link', {name: 'Settings'});
    await settingsButton.click();

    expect(await page.title()).toEqual('Account Settings');
  });

  test('ShowDeleteAccount', async ({page}) => {
    await expect(page.getByText('Delete account')).toBeVisible();
    const passwordInput = page.getByTitle('Password', {exact: true});
    const passwordVisibilityIcon = page.getByTitle('Toggle Password Visibility');
    const deleteButton = page.getByRole('button', {name: 'DELETE'});
    await expect(passwordInput).toBeVisible();
    await expect(passwordVisibilityIcon).toBeVisible();
    await expect(deleteButton).toBeVisible();
  });
});
