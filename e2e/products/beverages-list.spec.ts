import {expect, test} from '@playwright/test';
import {beverages} from '../api-responses';

test.describe('API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=beverage', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/beverages');
  });

  test('givenBeveragesRoute_theShowSearchBox', async ({page}) => {
    await expect(page.getByPlaceholder("Search")).toBeVisible();
    await expect(page.getByTitle("Search Icon")).toBeVisible();
  });

  test('givenBeveragesRoute_thenShowFiltersBox', async ({page}) => {
    await expect(page.getByTitle("Toggle Filters")).toBeVisible();
    await expect(page.getByText("Filters")).toBeVisible();
    await expect(page.getByTitle("Filters Active/Inactive")).toBeVisible();
  });

  test('showBeverageList', async ({page}) => {
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(1);
  });

  test('givenBeverageList_thenShowCocaCola', async ({page}) => {
    await expect(page.getByAltText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByRole('button', {name: '330ML'})).toBeVisible();
    await expect(page.getByRole('button', {name: '1L'})).toBeVisible();
    await expect(page.getByRole('button', {name: '2.95€'})).toBeVisible();
    await expect(page.getByTitle('Add Product').getByRole('button')).toBeVisible();
  });
});

test.describe('API KO', () => {
  test('givenBeveragesRoute_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/beverages');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
