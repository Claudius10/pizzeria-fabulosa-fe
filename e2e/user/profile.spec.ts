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

  test('ShowUserDetails', async ({page}) => {
    await expect(page.getByText('Full name: Miguel de Cervantes')).toBeVisible();
    await expect(page.getByText('Email address: donQuijote@example.com')).toBeVisible();
    await expect(page.getByText('Contact number: 123456789')).toBeVisible();
  });
});
