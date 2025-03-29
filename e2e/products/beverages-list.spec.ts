import {expect, test} from '@playwright/test';
import {beverages} from '../api-responses';

test.describe('API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=beverage&pageNumber=0&pageSize=8', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/beverages');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toBe('Beverages');
  });

  test('ShowSearchBox', async ({page}) => {
    await expect(page.getByPlaceholder("Search")).toBeVisible();
    await expect(page.getByTitle("Search Icon")).toBeVisible();
  });

  test('ShowFiltersBox', async ({page}) => {
    await expect(page.getByTitle("Toggle Filters")).toBeVisible();
    await expect(page.getByText("Filters")).toBeVisible();
    await expect(page.getByTitle("Remove All Filters")).toBeVisible();
  });

  test('showBeverageList', async ({page}) => {
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(8);
  });

  test('ShowItem', async ({page}) => {
    await expect(page.getByRole('img', {name: 'Mahou Gluten Free Image'})).toBeVisible();
    await expect(page.getByText('Mahou Gluten Free')).toBeVisible();
    await expect(page.getByTitle('Mahou Gluten Free Details').getByRole('button')).toBeVisible();
  });

  test('ShowItemDetails', async ({page}) => {

    // Arrange

    const details = page.getByTitle('Mahou Gluten Free Details').getByRole('button');
    const closeButton = page.getByLabel('Mahou Gluten Free').locator('div').filter({hasText: 'Mahou Gluten Free'}).getByRole('button');

    // Act

    await details.click();

    // Assert

    await expect(page.getByRole('dialog', {name: 'Mahou Gluten Free'})).toBeVisible();
    await expect(page.getByLabel('Mahou Gluten Free').getByText('Mahou Gluten Free')).toBeVisible();
    await expect(closeButton).toBeVisible();
    await expect(page.getByLabel('Mahou Gluten Free').getByRole('img', {name: 'Mahou Gluten Free Image'})).toBeVisible();
    await expect(page.getByTitle('Allergens Warning Icon')).toBeVisible();
    await expect(page.getByText('This product contains the following allergens')).toBeVisible();
    await expect(page.getByText('Alcohol', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '330ML'})).toBeVisible();
    await expect(page.getByRole('button', {name: '1.95€'})).toBeVisible();
    await expect(page.getByLabel('Add to Cart').getByRole('button')).toBeVisible();

    await closeButton.click();
    await expect(page.getByRole('dialog', {name: 'Mahou Gluten Free'})).not.toBeVisible();
  });
});

test.describe('API KO', () => {
  test('givenBeveragesRoute_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/beverages');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
