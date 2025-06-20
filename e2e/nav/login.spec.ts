import {expect, test} from '@playwright/test';
import {offers, stores} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toBe('Pizzeria Fabulosa');
  });

  test('ShowLoginDialog', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    const closeLoginDialogIcon = page.getByTitle('Close Login Box');

    const signInButton = page.getByRole('link', {name: 'SIGN IN'});
    const createAccountButton = page.getByRole('button', {name: 'CREATE AN ACCOUNT'});

    // Act

    await loginButton.click();

    // Assert

    await expect(closeLoginDialogIcon).toBeVisible();
    await expect(signInButton).toBeVisible();
    await expect(createAccountButton).toBeVisible();
  });

  test('HideLoginDialog', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    const closeLoginDialogIcon = page.getByTitle('Close Login Box');

    const signInButton = page.getByRole('link', {name: 'SIGN IN'});
    const createAccountButton = page.getByRole('button', {name: 'CREATE AN ACCOUNT'});

    await loginButton.click();

    await expect(closeLoginDialogIcon).toBeVisible();
    await expect(signInButton).toBeVisible();
    await expect(createAccountButton).toBeVisible();

    // Act

    await closeLoginDialogIcon.click();

    // Assert

    await expect(closeLoginDialogIcon).not.toBeVisible();
    await expect(signInButton).not.toBeVisible();
    await expect(createAccountButton).not.toBeVisible();
  });

  test('givenClickOnCreateNewAccount_thenRedirectToRegistrationRoute', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();

    const createAccountButton = page.getByRole("button", {name: 'Create an account'});

    await loginButton.click();
    await expect(createAccountButton).toBeVisible();

    // Act

    await createAccountButton.click();

    // Assert

    await expect(page.getByText('Create your account')).toBeVisible();
    await expect(createAccountButton).not.toBeVisible();
  });
});
