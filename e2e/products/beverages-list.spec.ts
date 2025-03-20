import {expect, test} from '@playwright/test';
import {beverages} from '../api-responses';

test.describe('API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=beverage', async route => {
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

  test('ShowCocaCola', async ({page}) => {
    await expect(page.getByAltText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByText('Coca-Cola Zero')).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero Small').getByRole('button', {name: '330ML'})).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero Medium').getByRole('button', {name: '1L'})).toBeVisible();
    await expect(page.getByTitle('Coca-Cola Zero Price').getByRole('button', {name: '2.95€'})).toBeVisible();
    await expect(page.getByTitle('Add Fanta Naranja to Cart').getByRole('button')).toBeVisible();
  });
});

test.describe('API KO', () => {
  test('givenBeveragesRoute_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/beverages');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
