import {expect, test} from '@playwright/test';

test.describe('Rendering', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('ShowHeading', async ({page}) => {
    await expect(page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'}).first()).toBeVisible();
  });

  test('ShowForm', async ({page}) => {
    await expect(page.getByRole('textbox', {name: 'Full name'})).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Email', exact: true})).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Matching Email'})).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Contact Number'})).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Password', exact: true})).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Matching Password'})).toBeVisible();
  });

  test('ShowButtons', async ({page}) => {
    await expect(page.getByRole("button", {name: 'Cancel'}).first()).toBeVisible();
    await expect(page.getByRole("button", {name: 'Continue'}).first()).toBeVisible();
  });

  test('ShowFooter', async ({page}) => {
    await expect(page.getByText('Do you have an account?')).toBeVisible();
    await expect(page.getByText('Sign In')).toBeVisible();
  });
});

test.describe('Validation: Full name', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('');
    await header.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).toBeVisible();
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('A');
    await header.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).toBeVisible();
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('Aa');
    await header.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).not.toBeVisible();
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('A');
    await header.click();
    await expect(page.getByText('Name is required: minimum length is two ')).toBeVisible();
    await fullNameInput.fill('Clau');

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).not.toBeVisible();
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('Clau');
    await header.click();
    await expect(page.getByText('Name is required: minimum length is two ')).not.toBeVisible();
    await fullNameInput.fill('C');

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).toBeVisible();
  });
});

test.describe('API KO', () => {
  test('givenBeveragesRoute_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/beverages');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
