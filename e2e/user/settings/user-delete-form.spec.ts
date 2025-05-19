import {expect, test} from '@playwright/test';
import {AUTH_TOKEN_COOKIE, dummyAccountDelete} from '../../api-responses';

test.describe('Validation: Password', () => {
  test.beforeEach(async ({page}) => {
    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.goto('/user/settings');
    expect(await page.title()).toEqual('Account Settings');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const container = page.getByTitle('Settings Section', {exact: true});

    // Act

    await password.fill('');
    await container.click();

    // Assert

    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(password).toHaveValue('');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const container = page.getByTitle('Settings Section', {exact: true});

    // Act

    await password.fill('Password1');
    await container.click();

    // Assert

    await expect(page.getByText('Password is required')).not.toBeVisible();
    await expect(password).toHaveValue('Password1');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const container = page.getByTitle('Settings Section', {exact: true});

    // Act

    await password.fill('');
    await expect(password).toHaveValue('');
    await container.click();
    await expect(page.getByText('Password is required')).toBeVisible();
    await password.fill('Password1');
    await expect(password).toHaveValue('Password1');

    // Assert

    await expect(page.getByText('Password is required')).not.toBeVisible();
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const container = page.getByTitle('Settings Section', {exact: true});

    // Act

    await password.fill('Password1');
    await expect(password).toHaveValue('Password1');
    await container.click();
    await expect(page.getByText('Password is required')).not.toBeVisible();
    await password.fill('');
    await expect(password).toHaveValue('');

    // Assert

    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('givenHiddenPassword_whenIconClick_thenShowPassword', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const passwordVisibility = page.getByTitle('Toggle Password Visibility');
    const container = page.getByTitle('Settings Section', {exact: true});

    // Act

    await password.fill('Password1');
    await container.click();
    await passwordVisibility.click(); // is an actual eye check the only way?

    // Assert

    await expect(password).toHaveValue('Password1');
  });
});

test.describe('Submit', () => {
  test.beforeEach(async ({page}) => {
    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.goto('/user/settings');
    expect(await page.title()).toEqual('Account Settings');
  });

  test('givenSubmitClickWithValidForm_whenApiIsDown_thenShowErrorMessage', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    await password.fill('Password1');
    await expect(password).toHaveValue('Password1');
    const deleteButton = page.getByRole('button', {name: 'DELETE'});
    await expect(deleteButton).toBeVisible();

    // Act

    await deleteButton.click();

    // Assert

    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Our servers are not available at the moment. Please try again later')).toBeVisible();
  });

  test('givenSubmitClick_whenFormIsInvalid_thenShowValidationErrors', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    await password.fill('');
    await expect(password).toHaveValue('');
    const deleteButton = page.getByRole('button', {name: 'DELETE'});
    await expect(deleteButton).toBeVisible();

    // Act

    await deleteButton.click();

    // Assert

    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('givenSubmitClick_whenFormIsValid_thenShowSuccessMessageAndRedirect', async ({page}) => {

    // Arrange

    // 1 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user?id=1&password=Password1', async route => {
      await route.fulfill({status: 200});
    });

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    await password.fill('Password1');
    await expect(password).toHaveValue('Password1');
    const deleteButton = page.getByRole('button', {name: 'DELETE'});
    await expect(deleteButton).toBeVisible();

    // Act

    await deleteButton.click();

    // Assert

    await expect(page.getByText('Information')).toBeVisible();
    await expect(page.getByText('Account deleted successfully')).toBeVisible();
    expect(page.url()).toBe('http://192.168.1.128:4200/');
  });

  test('givenSubmitClick_whenFormIsValid_thenShowWarningDummyAccountCannotBeDeleted', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user?id=1&password=Password1', async route => {
      await route.fulfill({json: dummyAccountDelete, status: 500});
    });

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    await password.fill('Password1');
    await expect(password).toHaveValue('Password1');
    const deleteButton = page.getByRole('button', {name: 'DELETE'});
    await expect(deleteButton).toBeVisible();

    // Act

    await deleteButton.click();

    // Assert

    await expect(page.getByText('Warning')).toBeVisible();
    await expect(page.getByText('Dummy account cannot be deleted')).toBeVisible();
  });
});
